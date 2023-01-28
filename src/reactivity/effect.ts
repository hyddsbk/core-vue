import { extend } from "../shared";

// reactiveEffect 依赖
let activeEffect;

// 执行 stop 后停止收集依赖flag
let shouldTrack;
class ReactiveEffect {
  private _fn: any;
  deps = []; // 收集到的依赖
  onStop?: () => void;
  active = true; // 执行stop()后为false
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }

    shouldTrack = true;

    activeEffect = this;

    const result = this._fn();

    shouldTrack = false;

    return result;
  }
  stop() {
    if (this.active) {
      clearupEffect(this);

      if (this.onStop) {
        this.onStop();
      }

      this.active = false;
    }
  }
}

export const clearupEffect = (effect) => {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
};

let targetMap = new Map();
export const track = (target, key) => {
  // target -> key -> dep
  if (!isTracking()) return;
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);

  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffect(dep);
};

export const trackEffect = (dep) => {
  // 依赖是否存在
  if (dep.has(activeEffect)) return;
  // 收集到targetMap中
  dep.add(activeEffect);
  // 反向收集到effect中
  activeEffect.deps.push(dep);
};

/**
 * 是否需要收集依赖
 * @returns Boolean
 */
export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);

  triggerEffect(deps);
};

export const triggerEffect = (deps) => {
  for (const effect of deps) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
};

/**
 * 断掉effect实例中的所有收集到的依赖 (effect.deps)
 * @param runner effect函数的返回值（effect实例）
 */
export const stop = (runner) => {
  runner.effect.stop();
};

/**
 * 依赖收集
 * @param fn 传入的函数
 * @param options arg
 * @returns
 */
export const effect = (fn: any, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // _effect.onStop = options.onStop;
  // Object.assign(_effect, options);
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);

  runner.effect = _effect;

  return runner;
};
