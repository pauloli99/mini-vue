import { isReadonly, readonly, isProxy } from "../reative";

describe("readonly", () => {
  it("happy path", () => {
    const original = {
      foo: 1,
      bar: {
        baz: 2,
      },
    };
    const wrapped = readonly(original);

    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);

    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);

    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);

    expect(isProxy(wrapped)).toBe(true);
  });

  it("warn when call set", () => {
    console.warn = jest.fn();

    const user = readonly({
      age: 11,
    });

    user.age = 12;

    expect(console.warn).toHaveBeenCalled();
  });
});
