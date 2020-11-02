export const timeout = (result = undefined, duration = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, duration);
  });
};

let frozon = false;
export const _body = {
  freeze: () => {
    if (frozon) return;
    document.body.addEventListener("touchstart", preventDefault);
    document.body.addEventListener("touchend", preventDefault);
    frozon = true;
  },
  unfreeze: () => {
    if (!frozon) return;
    document.body.removeEventListener("touchstart", preventDefault);
    document.body.removeEventListener("touchend", preventDefault);
    frozon = false;
  }
};

export const page_in_transition = () => {
  // eslint-disable-next-line prettier/prettier
  let pageSelector = ".page-enter,.page-enter-active,.page-enter-to,.page-leave,.page-leave-active,.page-leave-to";
  return document.querySelectorAll(pageSelector).length > 0;
};

export const session = {
  get(name) {
    let value = sessionStorage.getItem(name);
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value);
    return value;
  },
  set(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value);
    return sessionStorage.setItem(name, value);
  },
  remove(name) {
    return sessionStorage.removeItem(name);
  }
};

export const createElement = (marker, tag) => {
  let el = document.createElement(tag || "div");
  el.setAttribute(marker, "");
  document.body.appendChild(el);
};

export const removeElement = marker => {
  // eslint-disable-next-line prettier/prettier
  let el = document.querySelector(marker) || document.querySelector(`[${marker}]`);
  if (el) document.body.removeChild(el);
};

export function preventDefault(e) {
  e.preventDefault();
}

export function hasClass(el, cls) {
  if (!el) return;
  return el.classList.contains(cls);
}

export function addClass(el, cls) {
  if (!el) return;
  var classes = cls.split(" ");
  classes.forEach(cls => {
    el.classList.add(cls);
  });
}

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(" ");
  classes.forEach(cls => {
    el.classList.remove(cls);
  });
}
