"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useStackConfig } from "@/hooks/useStackConfig";

type StackConfigValue = ReturnType<typeof useStackConfig>;

const StackConfigContext = createContext<StackConfigValue | null>(null);

export function StackConfigProvider({ children }: { children: ReactNode }) {
  const config = useStackConfig();
  return (
    <StackConfigContext.Provider value={config}>
      {children}
    </StackConfigContext.Provider>
  );
}

export function useStackConfigContext(): StackConfigValue {
  const ctx = useContext(StackConfigContext);
  if (!ctx) {
    throw new Error(
      "useStackConfigContext must be used within a StackConfigProvider"
    );
  }
  return ctx;
}
