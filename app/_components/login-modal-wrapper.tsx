'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui'

const LoginModal = dynamic(
  () => import('./login-modal'),
  { 
    ssr: false,
    loading: () => <Button variant="default" className="w-24 h-10">Login</Button>
  }
)

export default function LoginModalWrapper() {
  return <LoginModal />
}