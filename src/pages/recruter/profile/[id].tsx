import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  UserCircle2,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "~/components/ui";
import CandidateLayout from "~/layouts/candidate-layout";
import { api } from "~/utils/api";

export default function Profile() {
  const { query } = useRouter();
  const { data: recruter } = api.recruter.getRecruterProfile.useQuery({
    id: query.id as string,
  });

  return (
    <>
      <Head>
        <title>{recruter?.fullName}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <div className="container">
          <PageHeader title="Profile Page" Icon={UserCircle2} />
          <div className="container">
            <div className="flex w-full">
              <div className="container card rounded-box grid flex-grow border border-primary bg-base-300">
                <div className="container py-8">
                  {/* Condidate info */}
                  <div className="divider"></div>
                  <section className="text-center">
                    {/* Section title */}
                    <h1 className="rounded-lg bg-primary py-2  text-xl font-bold text-slate-100">
                      Recruiter Info
                    </h1>
                    <div className="divider"></div>
                    <div className="space-y-2 py-2">
                      {recruter?.isOrganization === true ? (
                        // Organization name
                        <h1 className="text-lg">
                          <span className="font-semibold">
                            Organization Name:{" "}
                          </span>
                          {recruter?.orgName}
                        </h1>
                      ) : (
                        // Full name
                        <h1 className="text-lg">
                          <span className="font-semibold">Full Name: </span>
                          {recruter?.fullName}
                        </h1>
                      )}
                      {/* Phone */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Phone: </span>
                        {recruter?.phone}
                      </h1>
                      {/* E-mail */}
                      <h1 className="text-lg">
                        <span className="font-semibold">E-mail: </span>
                        {recruter?.email}
                      </h1>
                      {/* City */}
                      <h1 className="text-lg">
                        <span className="font-semibold">City: </span>
                        {recruter?.city}
                      </h1>
                      {/* Address */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Address: </span>
                        {recruter?.address}
                      </h1>
                      {/* Postal Code */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Postal Code: </span>
                        {recruter?.postalCode}
                      </h1>
                    </div>
                  </section>
                  <div className="divider"></div>
                  <section className="text-center">
                    {/* Section title */}
                    <h1 className="rounded-lg bg-primary py-2  text-xl font-bold text-slate-100">
                      Recruiter Socials
                    </h1>
                    <div className="divider"></div>
                    <div className="flex items-center justify-center gap-4 py-2">
                      {/* LinkedIn */}
                      {recruter?.linkedIn && (
                        <a target="_blank" href={recruter.linkedIn}>
                          <Linkedin className="text-primary" />
                        </a>
                      )}
                      {/* Twitter */}
                      {recruter?.twitter && (
                        <a
                          target="_blank"
                          href={`https://twitter.com/${recruter.twitter}`}
                        >
                          <Twitter className="text-primary" />
                        </a>
                      )}
                      {/* Facebook */}
                      {recruter?.facebook && (
                        <a
                          target="_blank"
                          href={`https://www.facebook.com/${recruter.facebook}`}
                        >
                          <Facebook className="text-primary" />
                        </a>
                      )}
                      {/* Instagram */}
                      {recruter?.instagram && (
                        <a
                          target="_blank"
                          href={`https://www.instagram.com/${recruter.instagram}`}
                        >
                          <Instagram className="text-primary" />
                        </a>
                      )}
                      {/* Web Site */}
                      {recruter?.website && (
                        <a target="_blank" href={recruter.website}>
                          <Globe className="text-primary" />
                        </a>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CandidateLayout>
    </>
  );
}
