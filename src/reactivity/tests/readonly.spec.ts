import { readonly } from "../reactive";
describe("readonly", () => {
  it("happy path", () => {
    // not set  不需要get 所以不需要搜集依赖和触发依赖

    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);

    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });

  it("warn then call set", () => {
    console.warn = jest.fn();
    const user = readonly({ age: 10 });
    user.age = 11;
    expect(user.age).toBe(10);
    expect(console.warn).toBeCalled();
  });
});
