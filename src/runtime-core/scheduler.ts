const queue: any[] = [];

const p = Promise.resolve();
let isFlushing = false;

export const nextTick = (fn) => {
  return fn ? p.then(fn) : p;
};

export const queueJobs = (job) => {
  if (!queue.includes(job)) {
    queue.push(job);
  }

  queueFlush();
};

function queueFlush() {
  if (isFlushing) return;

  isFlushing = true;

  nextTick(flushJobs);
}

function flushJobs() {
  isFlushing = false;

  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}
