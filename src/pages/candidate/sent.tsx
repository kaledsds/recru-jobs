import { Spinner } from "@react-pdf-viewer/core";
import { Send } from "lucide-react";
import Head from "next/head";
import React, { useState } from "react";
import { SentRequestRow } from "~/components/candidate/Request";
import { PageHeader } from "~/components/ui";
import CandidateLayout from "~/layouts/candidate-layout";
import { api } from "~/utils/api";

const Sent = () => {
  const [statusValue, setStatusValue] = useState<string>("Request Status");

  const [jobValue, setjobValue] = useState<string>("Your Request on");

  const { data: jobs } = api.job.getJobsByCandidateRequest.useQuery();

  const { data: JobRequests } = api.jobRequest.getRequestByCandidate.useQuery({
    statusValue: statusValue,
    jobValue: jobValue,
  });

  if (JobRequests && !jobs) return <Spinner />;

  return (
    <>
      <Head>
        <title>RecruJobs/Candidate</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <div className="container">
          <PageHeader title="Sent Request" Icon={Send} />
          <div className="w-full overflow-x-visible">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Recruter Name</th>
                  <th>
                    <select
                      onChange={(e) => setjobValue(e.target.value)}
                      value={jobValue}
                      id="statusValue"
                      className="cursor-pointer bg-base-200"
                    >
                      <option>Your Request on</option>
                      {jobs?.jobs.map((job) => (
                        <option key={job.id}>{job.title}</option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <select
                      onChange={(e) => setStatusValue(e.target.value)}
                      value={statusValue}
                      id="statusValue"
                      className="cursor-pointer bg-base-200"
                    >
                      <option>Request Status</option>
                      <option>pending</option>
                      <option>accepted</option>
                      <option>declined</option>
                    </select>
                  </th>
                  <th>
                    <span className="flex items-center justify-center ">
                      action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {JobRequests?.jobRequests.map((request) => (
                  <SentRequestRow key={request.id} sentRequest={request} />
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CandidateLayout>
    </>
  );
};

export default Sent;
