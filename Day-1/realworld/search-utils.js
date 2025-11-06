function debounce(fn, delay) {
    let timer = null, lastArgs, lastThis;
    function invoke() {
      const r = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
      return r;
    }
    return {
      call(...args) {
        lastArgs = args; lastThis = this;
        clearTimeout(timer);
        timer = setTimeout(invoke, delay);
      },
      cancel() { clearTimeout(timer); timer = null; lastArgs = lastThis = null; },
      flush() {
        if (timer) { clearTimeout(timer); timer = null; return invoke(); }
      }
    };
  }
  
  function throttle(fn, delay, { leading = true, trailing = true } = {}) {
    let lastCall = 0, timer = null, lastArgs, lastThis;
    const invoke = () => {
      lastCall = Date.now();
      const r = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
      return r;
    };
    return function throttled(...args) {
      const now = Date.now();
      if (!lastCall && !leading) lastCall = now; // delay first fire if leading=false
      const remaining = delay - (now - lastCall);
      lastArgs = args; lastThis = this;
  
      if (remaining <= 0 || remaining > delay) {
        if (timer) { clearTimeout(timer); timer = null; }
        return invoke();
      }
      if (trailing && !timer) {
        timer = setTimeout(() => { timer = null; if (trailing && lastArgs) invoke(); }, remaining);
      }
    };
  }

  function createCancellableFetch(fetchImpl = globalThis.fetch, { cacheTtlMs = 5000 } = {}) {
    const inFlight = new Map();  // key -> { controller, promise }
    const cache = new Map();     // key -> { ts, data }
  
    const keyOf = (url, opts = {}) => {
      const m = (opts.method || 'GET').toUpperCase();
      const b = typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body || '');
      return `${m}:${url}:${b}`;
    };
  
    return async function cancellableFetch(url, opts = {}) {
      const key = keyOf(url, opts);
  
      // Serve from cache if fresh
      const now = Date.now();
      const cached = cache.get(key);
      if (cached && (now - cached.ts) <= cacheTtlMs) {
        return cached.data;
      }
  
      // Cancel previous request for this key
      const prev = inFlight.get(key);
      if (prev) prev.controller.abort();
  
      const controller = new AbortController();
      const signal = controller.signal;
      const merged = { ...opts, signal };
  
      const p = fetchImpl(url, merged)
        .then(async res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json().catch(() => res.text()); // try JSON then text fallback
          cache.set(key, { ts: Date.now(), data });
          return data;
        })
        .finally(() => {
          // cleanup in-flight
          const cur = inFlight.get(key);
          if (cur && cur.controller === controller) inFlight.delete(key);
        });
  
      inFlight.set(key, { controller, promise: p });
      return p;
    };
  }
  