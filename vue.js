const effectSetWeakMap = new WeakMap();
let activeEffect;

function watchEffect(callback) {
  // 클로져를 이용해서 callback 에 대한 정보를 가지고 있는 effect를 생성.
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
