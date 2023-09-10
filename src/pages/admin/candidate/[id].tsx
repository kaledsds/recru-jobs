import { ArrowUpRightFromCircle, Facebook } from "lucide-react";
import { Github, Globe, Instagram, Twitter } from "lucide-react";
import { Linkedin, UserCircle2 } from "lucide-react";
import Head from "next/head";
import AdminLayout from "~/layouts/admin-layout";
import { PageHeader, Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import { DeleteCandidate } from "~/components/admin";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useRouter } from "next/router";

/**
 * The Profile page.
 */
export default function CandidateProfile() {
  const { query } = useRouter();
  const { data: candidate } = api.candidateAdmin.getCandidateProfile.useQuery({
    id: query.id as string,
  });
  if (!candidate || !query) {
    return <Spinner />;
  }
  const resume = candidate.resume;

  return (
    <>
      <Head>
        <title>{candidate.fullName}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
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
                      Condidate Info
                    </h1>
                    <div className="divider"></div>
                    <div className="space-y-2 py-2">
                      {/* Full name */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Full Name: </span>
                        {candidate.fullName}
                      </h1>
                      {/* CIN */}
                      <h1 className="text-lg">
                        <span className="font-semibold">CIN: </span>
                        {candidate.cin}
                      </h1>
                      {/* Full name */}
                      <h1 className="text-lg">
                        <span className="font-semibold">
                          Field of expertise:{" "}
                        </span>
                        {candidate.expertise}
                      </h1>
                      {/* Phone */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Phone: </span>
                        {candidate.phone}
                      </h1>
                      {/* E-mail */}
                      <h1 className="text-lg">
                        <span className="font-semibold">E-mail: </span>
                        {candidate.email}
                      </h1>
                      {/* City */}
                      <h1 className="text-lg">
                        <span className="font-semibold">City: </span>
                        {candidate?.city}
                      </h1>
                      {/* Address */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Address: </span>
                        {candidate.address}
                      </h1>
                      {/* Postal Code */}
                      <h1 className="text-lg">
                        <span className="font-semibold">Postal Code: </span>
                        {candidate.postalCode}
                      </h1>
                    </div>
                  </section>
                  <div className="divider"></div>
                  <section className="text-center">
                    {/* Section title */}
                    <h1 className="rounded-lg bg-primary py-2  text-xl font-bold text-slate-100">
                      Condidate Socials
                    </h1>
                    <div className="divider"></div>
                    <div className="flex items-center justify-center gap-4 py-2">
                      {/* LinkedIn */}
                      {candidate?.linkedIn && (
                        <a target="_blank" href={candidate.linkedIn}>
                          <Linkedin className="text-primary" />
                        </a>
                      )}
                      {/* Twitter */}
                      {candidate.twitter && (
                        <a
                          target="_blank"
                          href={`https://twitter.com/${candidate.twitter}`}
                        >
                          <Twitter className="text-primary" />
                        </a>
                      )}
                      {/* Facebook */}
                      {candidate.facebook && (
                        <a
                          target="_blank"
                          href={`https://www.facebook.com/${candidate.facebook}`}
                        >
                          <Facebook className="text-primary" />
                        </a>
                      )}
                      {/* Instagram */}
                      {candidate.instagram && (
                        <a
                          target="_blank"
                          href={`https://www.instagram.com/${candidate.instagram}`}
                        >
                          <Instagram className="text-primary" />
                        </a>
                      )}
                      {/* Github */}
                      {candidate.github && (
                        <a
                          target="_blank"
                          href={`https://github.com/${candidate.github}`}
                        >
                          <Github className="text-primary" />
                        </a>
                      )}
                      {/* Web Site */}
                      {candidate.website && (
                        <a target="_blank" href={candidate.website}>
                          <Globe className="text-primary" />
                        </a>
                      )}
                    </div>
                  </section>
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="container card rounded-box grid flex-grow border border-primary bg-base-300 py-7">
                <div className="divider"></div>
                <div className="-my-3">
                  <h1 className="flex justify-center rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
                    Resume
                  </h1>
                </div>
                <div className="divider"></div>
                <div className="flex w-full justify-center">
                  <div className="flex w-[300px] justify-center">
                    {resume && (
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.js">
                        <Viewer fileUrl={resume} />
                      </Worker>
                    )}
                  </div>
                </div>
                <div className="divider"></div>
                <div className="flex justify-center">
                  <a target="_blank" href={resume}>
                    <ArrowUpRightFromCircle className="text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="divider"></div>
            <div className="container card rounded-box grid flex-grow border border-red-600 bg-base-300 py-7">
              <DeleteCandidate id={candidate.id} />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}