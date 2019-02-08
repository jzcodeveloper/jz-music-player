export const smoothScroll = (element, target, duration) =>{
  target = Math.round(target);
  duration = Math.round(duration);

  const startTime = Date.now();
  const endTime = startTime + duration;

  const startLeft = element.scrollLeft;
  const distance = target - startLeft;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = function(start, end, point) {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  };

  return new Promise(function(resolve, reject) {
    // This is to keep track of where the element's scrollLeft is
    // supposed to be, based on what we're doing
    let previousLeft = element.scrollLeft;

    // This is like a think function from a game loop
    const scrollFrame = function() {
      if (element.scrollLeft !== previousLeft) {
        reject("interrupted");
        return;
      }

      // set the scrollLeft for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startLeft + distance * point);
      element.scrollLeft = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        element.scrollLeft === previousLeft &&
        element.scrollLeft !== frameTop
      ) {
        resolve();
        return;
      }
      previousLeft = element.scrollLeft;

      // schedule next frame for execution
      setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
};
