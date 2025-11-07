function twoSumSorted(nums, t) {
    let i = 0, j = nums.length - 1;
    while (i < j) {
      const s = nums[i] + nums[j];
      if (s === t) return [i + 1, j + 1];
      if (s < t) i++; else j--;
    }
    return [-1, -1];
  }

  function lengthOfLongestSubstring(s) {
    const last = new Map();
    let l = 0, best = 0;
    for (let r = 0; r < s.length; r++) {
      const ch = s[r];
      if (last.has(ch) && last.get(ch) >= l) l = last.get(ch) + 1;
      last.set(ch, r);
      best = Math.max(best, r - l + 1);
    }
    return best;
  }

  
  function groupAnagrams(strs) {
    const buckets = new Map();
    for (const s of strs) {
      const key = s.split('').sort().join('');
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(s);
    }
    return Array.from(buckets.values());
  }

  function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];
    intervals.sort((a,b) => a[0] - b[0]);
    const out = [intervals[0].slice()];
    for (let i=1;i<intervals.length;i++){
      const [s,e] = intervals[i];
      const last = out[out.length-1];
      if (s <= last[1]) last[1] = Math.max(last[1], e);
      else out.push([s,e]);
    }
    return out;
  }
  