import Head from "next/head";
import CandidateLayout from "~/layouts/candidate-layout";

/**
 * The Candidate page.
 */
export default function Candidate() {
  return (
    <>
      <Head>
        <title>RecruJobs/Candidate</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <main>Candidate Page</main>
      </CandidateLayout>
    </>
  );
}
