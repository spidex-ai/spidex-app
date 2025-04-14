'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LoginModalContextType {
  isOpen: boolean
  openModal: (hideSocialLogin?: boolean) => void
  closeModal: () => void
  hideSocialLogin: boolean
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined)

export const useLoginModal = () => {
  const context = useContext(LoginModalContext)
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider')
  }
  return context
}

interface LoginModalProviderProps {
  children: ReactNode
}

export const LoginModalProvider: React.FC<LoginModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hideSocialLogin, setHideSocialLogin] = useState(false)

  const openModal = (hideSocialLoginOptions = false) => {
    setHideSocialLogin(hideSocialLoginOptions)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <LoginModalContext.Provider value={{ isOpen, openModal, closeModal, hideSocialLogin }}>
      {children}
    </LoginModalContext.Provider>
  )
} 