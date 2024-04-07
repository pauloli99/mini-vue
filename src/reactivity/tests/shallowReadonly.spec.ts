import { isReadonly, shallowReadonly } from "../reative";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it("warn when call set", () => {
    console.warn = jest.fn();

    const user = shallowReadonly({
      age: 11,
    });

    user.age = 12;

    expect(console.warn).toHaveBeenCalled();
  });
});
