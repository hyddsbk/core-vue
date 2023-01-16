import { reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const user = reactive({ age: 1 });
    let nextAge;
    nextAge = user.age + 1;
    expect(nextAge).not.toBe(user);
    expect(nextAge).toBe(2);
  });
});
