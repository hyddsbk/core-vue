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
});
