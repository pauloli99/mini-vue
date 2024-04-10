import { camelize, toHandleKey } from "../shared";

export const emit = (instance, eventName, ...args) => {
  console.log(`output->eventName`, eventName);

  //   instance.props => event
  const { props } = instance;

  const handleName = toHandleKey(camelize(eventName));

  const handler = props[handleName];
  handler && handler(...args);
};
