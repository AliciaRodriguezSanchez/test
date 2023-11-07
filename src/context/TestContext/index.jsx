import React, { createContext, useState, useContext } from "react";
import { useTestCtx } from "./useTextCtx";

// Crear el contexto
const TestContext = createContext({});

// Crear el proveedor de contexto
export const TestProvider = (props) => {
  const { children } = props;
  const context = useTestCtx();
  return (
    <TestContext.Provider value={context}>{children}</TestContext.Provider>
  );
};
//Crear el hook personalizado
export const useTestContext = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error("useTestCtx must be used within a TestProvider");
  }
  return context;
};
