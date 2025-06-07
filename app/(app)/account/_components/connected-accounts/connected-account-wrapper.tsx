'use client';

import dynamic from 'next/dynamic';
import { ConnectedAccountProps } from './connected-account';
const ConnectedAccount = dynamic(() => import('./connected-account'), {
  ssr: false,
  loading: () => <></>,
});

export default function ConnectedAccountWrapper(props: ConnectedAccountProps) {
  return <ConnectedAccount {...props} />;
}
