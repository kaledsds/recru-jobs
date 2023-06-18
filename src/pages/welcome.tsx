import Head from "next/head";
import Link from "next/link";
import MainLayout from "~/layouts/main-layout";

/**
 * The Welcome page.
 */
export default function Welcome() {
  return (
    <>
      <Head>
        <title>RecruJobs</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
          <h1>You can login as:</h1>
          <div className="space-x-4">
            <Link href="/recruter" className="border border-slate-800 p-4">
              Recruter
            </Link>
            <Link href="/condidate" className="border border-slate-800 p-4">
              Condidate
            </Link>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
