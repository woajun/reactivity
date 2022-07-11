const globalWeakMap = new WeakMap();
let activeEffect;

function computed(update) {
  const obj = {
    get value() {
      activeEffect = update;
      const result = update();
      activeEffect = null;
      return result;
    },
  };
  return obj;
}

function ref(value) {
  const obj = {
    get value() {
      track(obj, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(obj, "value");
    },
  };

  return obj;
}

function track(target, key) {
  if (activeEffect) {
    const subscribers = getSubscribersForProperty(target, key);
    const effectSet = subscribers.get(key);
    effectSet.add(activeEffect);
  }
}

function trigger(target, key) {
  const subscribers = getSubscribersForProperty(target, key);
  const effectSet = subscribers.get(key);
  effectSet.forEach((effect) => effect());
}

function getSubscribersForProperty(target, key) {
  const result = globalWeakMap.get(target);
  if (result) {
    return result;
  } else {
    const subscribers = new Map();
    const effectSet = new Set();
    subscribers.set(key, effectSet);
    globalWeakMap.set(target, subscribers);
    return subscribers;
  }
}
