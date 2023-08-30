import { LayoutDashboard } from "lucide-react";
import Head from "next/head";
import { JobCard } from "~/components/candidate/dashboard";
import { Footer, PageHeader } from "~/components/ui";
import CandidateLayout from "~/layouts/candidate-layout";
import { api } from "~/utils/api";

/**
 * The Candidate page.
 */
export default function Candidate() {
  const jobs = api.job.getjobs.useQuery();

  return (
    <>
      <Head>
        <title>RecruJobs/Candidate</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <div className="container">
          <PageHeader title="Dashboard" Icon={LayoutDashboard}>
            <div className="input-group w-full ">
              <input
                type="text"
                placeholder="Search…"
                className="input-bordered input w-full border-r-0 border-neutral-content focus:outline-none"
              />
              <button className="btn-square btn border-l-0 border-neutral-content bg-transparent hover:border-neutral-content hover:bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </PageHeader>
          <div className="flex">
            <div className="container rounded-box w-[70%] space-y-4 bg-base-300 p-8">
              <p className="text:sm italic text-slate-500">
                NOTE: Enhance your job hunting strategy with our advanced search
                bar and comprehensive filter section. Find your ideal job by
                customizing your search based on keywords, location, industry,
                and more.
              </p>
              {jobs.data?.map((job) => (
                <JobCard job={job} key={job.id} />
              ))}
            </div>
            <div className="container w-[30%]">
              <div className="h-full space-y-4 p-4  pt-0">
                <div className="card rounded-box grid bg-base-300 px-4 py-4">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold">Filtter :</h1>
                    <div className="container">
                      <div className="container flex flex-col gap-1.5 p-0">
                        <label className="pl-1" htmlFor="gigType">
                          Job Type :
                        </label>
                        <select
                          id="gigType"
                          className="select-primary select w-full"
                        >
                          <option>Full Time</option>
                          <option>Half Time</option>
                          <option>Freelance</option>
                          <option>Temporary</option>
                        </select>
                      </div>
                      <div className="container flex flex-col gap-1.5 p-0">
                        <label className="pl-1" htmlFor="category">
                          Years Of Experience :
                        </label>
                        <select
                          id="category"
                          className="select-primary select w-full"
                        >
                          <option>Less then one year</option>
                          <option>1 year</option>
                          <option>2 years</option>
                          <option>3 years</option>
                          <option>4 years</option>
                          <option>5 years plus</option>
                        </select>
                      </div>
                      <div className="divider"></div>
                      <div className="container flex justify-center p-0 pb-2">
                        <button className="btn-primary btn-sm btn">Find</button>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </CandidateLayout>
    </>
  );
}
