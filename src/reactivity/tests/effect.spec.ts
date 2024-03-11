import { effect } from "../effect";
import { reactive } from "../reative";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;

    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    // update
    user.age++;
    expect(nextAge).toBe(12);
  });

  it("should return runner when call ef fect", () => {
    // 1. effect(fn) => function(runner) => fn => return
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
    // 1.通过effect的第二个参数给定一个scheduler的fn
    // 2.effect第一次执行的时候还会执行fn
    // 3.当响应式对象update时不会执行fn而是scheduler
    // 4.如果说执行runner的时候，会执行fn

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
      {
        scheduler,
      }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);

    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  });
});
