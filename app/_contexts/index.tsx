"use client";

import { Analytics } from "@vercel/analytics/react"

import { ColorModeProvider } from "./color-mode";
import { PostHogProvider } from "./posthog";
import { SpidexCoreProvider } from "./spidex-core";

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    return (
        <PostHogProvider>
            <ColorModeProvider>
                <SpidexCoreProvider>
                    <Analytics />
                    {children}
                </SpidexCoreProvider>
            </ColorModeProvider>
        </PostHogProvider>
    )
}

export default Providers;

export * from "./color-mode"
export * from "./spidex-core"