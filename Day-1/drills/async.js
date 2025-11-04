const assert = (c,m='assert failed') => { if(!c) throw new Error(m); };

// 1) sleep
function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }

// 2) retry
async function retry(fn, { attempts=3, delay=200, factor=2 } = {}) {
  let lastErr, d = delay;
  for (let i=0; i<attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i === attempts-1) break;
      await sleep(d);
      d *= factor;
    }
  }
  throw lastErr;
}

// 3) pLimit
function pLimit(limit=2) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active >= limit || queue.length === 0) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    Promise.resolve()
      .then(fn)
      .then(v => { resolve(v); })
      .catch(reject)
      .finally(() => { active--; next(); });
  };
  return (fn) => new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    next();
  });
}

// 4) myPromiseAll
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    if (arr.length === 0) return resolve([]);
    const out = new Array(arr.length);
    let done = 0;
    arr.forEach((p, i) => {
      Promise.resolve(p).then(
        v => {
          out[i] = v;
          if (++done === arr.length) resolve(out);
        },
        err => reject(err)
      );
    });
  });
}

// 5) myPromiseAllSettled
function myPromiseAllSettled(iterable) {
  const arr = Array.from(iterable);
  return Promise.all(
    arr.map(p => Promise.resolve(p)
      .then(v => ({ status: 'fulfilled', value: v }))
      .catch(e => ({ status: 'rejected', reason: e })))
  );
}

// 6) Event loop trace
async function eventLoopTrace() {
  const order = [];
  console.log('--- Event loop trace start ---');
  order.push('sync');

  queueMicrotask(() => order.push('queueMicrotask'));
  Promise.resolve().then(() => order.push('promise.then'));
  setTimeout(() => order.push('setTimeout0'), 0);
  if (typeof setImmediate === 'function') setImmediate(() => order.push('setImmediate'));

  // Give a tick for timers/microtasks to flush
  await sleep(10);

  console.log('Order:', order.join(' -> '));
  return order;
}

// ===== Tests =====
(async () => {
  // sleep
  const t0 = Date.now(); await sleep(50);
  assert(Date.now() - t0 >= 45, 'sleep ~50ms');

  // retry: 2 fails then pass
  let c=0;
  const val = await retry(() => {
    c++; if (c<3) throw new Error('fail');
    return 'ok';
  }, { attempts: 5, delay: 10, factor: 1.5 });
  assert(val === 'ok' && c===3, 'retry works');

  // pLimit
  const limit = pLimit(2);
  let concurrent = 0, peak = 0;
  function job(id, ms){ return limit(async () => {
    concurrent++; peak = Math.max(peak, concurrent);
    await sleep(ms);
    concurrent--;
    return id;
  });}
  const got = await myPromiseAll([ job('A',60), job('B',40), job('C',30), job('D',10) ]);
  assert(JSON.stringify(got) === JSON.stringify(['A','B','C','D']), 'pLimit order of completion stored');
  assert(peak <= 2, 'concurrency limited');

  // all / allSettled
  const allOk = await myPromiseAll([Promise.resolve(1), 2, sleep(5).then(()=>3)]);
  assert(JSON.stringify(allOk) === JSON.stringify([1,2,3]), 'myPromiseAll success');
  let threw = false;
  try { await myPromiseAll([Promise.resolve(1), Promise.reject('X')]); } catch(e){ threw = (e==='X'); }
  assert(threw, 'myPromiseAll reject fast');

  const settled = await myPromiseAllSettled([Promise.resolve(1), Promise.reject('E')]);
  assert(settled[0].status==='fulfilled' && settled[1].status==='rejected', 'allSettled shape');

  // event loop
  const order = await eventLoopTrace();
  console.log('Block-3 tests passed ✅');
})();

module.exports = {
  sleep, retry, pLimit, myPromiseAll, myPromiseAllSettled, eventLoopTrace
};
