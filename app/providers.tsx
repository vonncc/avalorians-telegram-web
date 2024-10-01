// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TokenProvider } from "./context/token.context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <TokenProvider>{children}</TokenProvider>
        </NextUIProvider>
    );
}
