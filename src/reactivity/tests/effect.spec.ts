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
});
