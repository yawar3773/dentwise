import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <SignedOut>
        <SignUpButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <SignOutButton>Logout</SignOutButton>
      </SignedIn>
    </div>
  );
}
