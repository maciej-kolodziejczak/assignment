/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren, FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as tlRender, type RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

export * from "@testing-library/react";

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export const render = (ui: ReactNode, options?: RenderOptions) =>
  tlRender(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
