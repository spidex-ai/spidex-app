'use client';

import { Analytics } from '@vercel/analytics/react';

import { ColorModeProvider } from './color-mode';
import { PostHogProvider } from './posthog';
import { LoginModalProvider } from './login-modal-context';
import { ReduxProvider } from '@/store/ReduxProvider';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <PostHogProvider>
      <ReduxProvider>
        <ColorModeProvider>
          <LoginModalProvider>
            <Analytics />
            {children}
          </LoginModalProvider>
        </ColorModeProvider>
      </ReduxProvider>
    </PostHogProvider>
  );
};

export default Providers;

export * from './color-mode';
export * from './login-modal-context';
