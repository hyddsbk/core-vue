import { isChanged, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

class RefImpl {
  private _value: any;
  public deps;
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.deps = new Set();
  }

  get value() {
    // activeEffect 有 就收集依赖;
    trackRefEffect(this);
    return this._value;
  }

  set value(newValue) {
    if (isChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffect(this.deps);
    }
  }
}

function trackRefEffect(effect) {
  if (isTracking()) {
    trackEffect(effect.deps);
  }
}

export const ref = (value) => {
  return new RefImpl(value);
};
