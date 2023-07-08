import { UserCircle2 } from "lucide-react";
import Head from "next/head";
import { PageHeader } from "~/components/ui";
import CandidateLayout from "~/layouts/candidate-layout";
import { api } from "~/utils/api";

import {
  EditCondidateInfo,
  EditCondidateResume,
  EditCondidateSocials,
} from "~/components/candidate/profile";

// Edit page
export default function Edit() {
  const { data: candidate } = api.candidate.getUserCandidate.useQuery();

  return (
    <>
      <Head>
        <title>{candidate?.fullName}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <div className="container">
          <PageHeader title="Edit Profile Page" Icon={UserCircle2} />
        </div>
        <div className="container">
          <div className="flex w-full">
            <div className="container card rounded-box grid flex-grow border border-primary bg-base-300">
              <div className="container py-8">
                <div className="divider"></div>
                {/* Condidate info */}
                <EditCondidateInfo />
              </div>
            </div>
            <div className="divider divider-horizontal"></div>
            {/* Resume */}
            <EditCondidateResume />
          </div>
        </div>
        <div className="container">
          <div className="divider"></div>
          <div className="container card rounded-box grid flex-grow border border-primary bg-base-300 py-7">
            <div className="divider"></div>
            <h1 className="flex justify-center rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
              Socials
            </h1>
            <div className="divider"></div>
            {/* Condidate Socials */}
            <EditCondidateSocials />
          </div>
        </div>
      </CandidateLayout>
    </>
  );
}
