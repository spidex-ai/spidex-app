"use client";

import { Analytics } from "@vercel/analytics/react"

import { ColorModeProvider } from "./color-mode";
import { PostHogProvider } from "./posthog";
import { SpidexCoreProvider } from "./spidex-core";
import { LoginModalProvider } from "./login-modal-context";

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    return (
        <PostHogProvider>
            <ColorModeProvider>
                <SpidexCoreProvider>
                    <LoginModalProvider>
                        <Analytics />
                        {children}
                    </LoginModalProvider>
                </SpidexCoreProvider>
            </ColorModeProvider>
        </PostHogProvider>
    )
}

export default Providers;

export * from "./color-mode"
export * from "./spidex-core"
export * from "./login-modal-context"