import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function LandingPage() {
  return (
    <div>
      <Link href="/sign-in" passHref>
        <Button>Login</Button>
      </Link>
      <Link href="/sign-up" passHref>
        <Button>Sign-up</Button>
      </Link>
    </div>
  )
}