import { Mailbox } from "lucide-react";
import Head from "next/head";
import React from "react";
import { ReceivedRequestRow } from "~/components/recruter/Request";
import { PageHeader } from "~/components/ui";
import RecruterLayout from "~/layouts/recruter-layout";
import { api } from "~/utils/api";

const Received = () => {
  const { data: JobRequests } =
    api.jobRequest.getJobRequestByRecruter.useQuery();
  return (
    <>
      <Head>
        <title>Recruter/Sent</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecruterLayout>
        <PageHeader title="Received Job Requests" Icon={Mailbox} />
        <div className="w-full overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Requesting on</th>
                <th>request status</th>
                <th>
                  <span className="px-4">action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {JobRequests?.jobRequests.map(
                (request) =>
                  request.status !== "declined" && (
                    <ReceivedRequestRow key={request.id} request={request} />
                  )
              )}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>nav</th>
                <th></th>
                <th></th>
                <th>
                  <span className="px-4">page</span>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </RecruterLayout>
    </>
  );
};

export default Received;