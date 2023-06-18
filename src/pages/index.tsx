import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

/**
 * Home is the main page of the application.
 * @returns The Home page.
 */
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>RecruJobs</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Hello From RecruJobs</p>
        {session ? (
          <button
            className="border border-slate-800 px-4 py-2"
            onClick={() => void signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="border border-slate-800 px-4 py-2"
            onClick={() => void signIn()}
          >
            Login
          </button>
        )}
      </main>
    </>
  );
}
