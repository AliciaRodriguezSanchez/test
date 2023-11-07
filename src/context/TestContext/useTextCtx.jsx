import { useState } from "react";

export const useTestCtx = () => {
  const [test, setTest] = useState({ done: false });

  const updateTestResponses = (newTest) => {
    setTest(newTest);
  };

  return { state: { test }, actions: { updateTestResponses } };
};
