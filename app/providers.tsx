// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TokenProvider } from "./context/token.context";
import { UserStateProvider } from "./context/data.context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        // <NextUIProvider>
        <UserStateProvider>
            <TokenProvider>
                {children}
            </TokenProvider>
        </UserStateProvider>
        // </NextUIProvider>
    );
}
