import { isReactive, reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const obj = { age: 1 };
    const user = reactive(obj);
    let nextAge;
    nextAge = user.age + 1;

    expect(nextAge).not.toBe(user);
    expect(nextAge).toBe(2);

    expect(isReactive(obj)).toBe(false);
    expect(isReactive(user)).toBe(true);
  });

  test("nested reactive", () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };

    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});
