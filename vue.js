const effectSetWeakMap = new WeakMap();
let activeEffect;

function computed(callback) {
  let innerValue;

  const effect = () => {
    activeEffect = effect;
    innerValue = callback();
    console.log("computed계산됨");
    activeEffect = null;
  };

  effect();

  return {
    get value() {
      return innerValue;
    },
  };
}

function watchEffect(callback) {
  const effect = () => {
    activeEffect = effect;
    callback();
    activeEffect = null;
  };
  effect();
}

function ref(value) {
  const obj = {
    get value() {
      track(obj);
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(obj);
    },
  };

  return obj;
}

function track(target) {
  if (activeEffect) {
    const effectSet = getEffectSet(target);
    effectSet.add(activeEffect);
  }
}

function trigger(target) {
  const effectSet = getEffectSet(target);
  effectSet.forEach((effect) => effect());
}

function getEffectSet(target) {
  const result = effectSetWeakMap.get(target);
  if (result) {
    return result;
  } else {
    const effectSet = new Set();
    effectSetWeakMap.set(target, effectSet);
    return effectSet;
  }
}
