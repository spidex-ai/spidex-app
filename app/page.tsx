'use client'
// import React from 'react'

// import { BorderBeam } from '@/components/ui';

// import GraphComponent from './_components'
// import LoginButtonWrapper from './_components/login-button-wrapper';
import { useRouter } from 'next/navigation';


const Graph = () => {
    const router = useRouter()
    return router.push('/chat')
}

export default Graph;