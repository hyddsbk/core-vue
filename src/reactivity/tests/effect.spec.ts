import { effect } from "../effect";
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
});
