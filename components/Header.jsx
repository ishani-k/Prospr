import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
      <nav className='container mx-auto px-4 py-0 flex items-center justify-between'>
        <Link href="/">
        <Image src={"/logo.png"} alt='Prospr logo' height={60} width={200}
        className='h-15 w-auto object-contain'/>
        </Link>


      
        <SignedIn>
          <Link href={"/dashboard"}>
          <Button variant="outline">
            

          </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </nav>
      </div>
    
  )
}

export default Header