import { Mailbox } from "lucide-react";
import Head from "next/head";
import React, { useState } from "react";
import { ReceivedRequestRow } from "~/components/candidate/Request";
import { PageHeader, Spinner } from "~/components/ui";
import CandidateLayout from "~/layouts/candidate-layout";
import { api } from "~/utils/api";

const Received = () => {
  const [statusValue, setStatusValue] = useState<string>("Request Status");

  const [gigValue, setGigalue] = useState<string>("Gig Title");

  const { data: gigs } = api.gig.getGigByCondidate.useQuery();

  const { data: GigRequests } =
    api.gigRequest.getGigRequestByCandidate.useQuery({
      statusValue: statusValue,
      gigValue: gigValue,
    });

  if (GigRequests && !gigs) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>RecruJobs/Candidate</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateLayout>
        <div className="container">
          <PageHeader title="Received Gig Requests" Icon={Mailbox} />
          <div className="w-full overflow-x-visible">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Recruter Name</th>
                  <th>
                    <select
                      onChange={(e) => setGigalue(e.target.value)}
                      value={gigValue}
                      id="gigValue"
                      className="cursor-pointer bg-base-200"
                    >
                      <option>Gig Title</option>
                      {gigs?.map((gig) => (
                        <option key={gig.id}>{gig.title}</option>
                      ))}
                    </select>
                  </th>
                  <th>Job Assigned</th>
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
                    <span className="flex items-center justify-center">
                      action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {GigRequests?.gigRequests.map((request) => (
                  <ReceivedRequestRow key={request.id} request={request} />
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
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

export default Received;
