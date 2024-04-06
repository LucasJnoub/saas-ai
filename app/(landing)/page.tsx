import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'

export default function LandingPage() {
  return (
    <div>
      <Button>
        <Link href='/sign-in'>Login</Link>
      </Button>
      <Button>
        <Link href='/sign-up'>Sign-up</Link>
      </Button>
    </div>
  )
}
