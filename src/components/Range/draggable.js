let isDragging = false;
export default function(element, options) {
  const moveFn = function(event) {
    if (options.drag) {
      options.drag(event.changedTouches[0] || event.touches[0]);
    }
  };

  const endFn = function(event) {
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(event.changedTouches[0] || event.touches[0]);
    }
  };

  element.addEventListener("touchstart", function(event) {
    if (isDragging) return;

    event.preventDefault();
    document.onselectstart = function() {
      return false;
    };

    document.ondragstart = function() {
      return false;
    };

    isDragging = true;

    if (options.start) {
      options.start(event.changedTouches[0] || event.touches[0]);
    }
  });

  element.addEventListener("touchmove", moveFn);
  element.addEventListener("touchend", endFn);
  element.addEventListener("touchcancel", endFn);
}
