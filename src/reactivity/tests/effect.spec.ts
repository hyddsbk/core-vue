import { effect, stop } from "../effect";
import { reactive } from "../reactive";
describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      info: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.info + 1;
    });

    expect(nextAge).toBe(11);

    // update
    user.info++;
    expect(nextAge).toBe(12);
  });

  it("should return runner when call effect", () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe("foo");
  });

  it("scheduler", () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);

    run();
    expect(dummy).toBe(2);
  });

  it("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);

    stop(runner);
    // obj.prop = 3; 只有set

    // get set
    // obj.prop = obj.prop + 1;
    // get触发了依赖收集
    // 当执行stop函数后想法办阻止get依赖收集
    obj.prop++;
    expect(dummy).toBe(2);

    runner();
    expect(dummy).toBe(3);
  });

  it("onStop", () => {
    const obj = reactive({ foo: 1 });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { onStop }
    );

    stop(runner);
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});
