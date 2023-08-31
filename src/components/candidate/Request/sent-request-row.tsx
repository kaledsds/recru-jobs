import type { Job, JobRequest, Recruter, User } from "@prisma/client";
import { Check, Clock, Trash2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface SentRequestRowProps {
  sentRequest: JobRequest & {
    job: Job & {
      recruter: Recruter & {
        user: User;
      };
    };
  };
}

const SentRequestRow: React.FC<SentRequestRowProps> = ({ sentRequest }) => {
  const ctx = api.useContext();
  const DeletesentRequest = api.jobRequest.deletJobRequest.useMutation({
    onSuccess: async () => {
      await ctx.jobRequest.invalidate();
    },
  });

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  src={sentRequest.job.recruter.user.image as string}
                  alt={sentRequest.job.recruter.user.name as string}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">
                {sentRequest.job.recruter.user.name}
              </div>
              {sentRequest.status === "accepted" && (
                <div className="text-sm opacity-50">
                  {sentRequest.job.recruter.user.email}
                </div>
              )}
            </div>
          </div>
        </td>
        <td>{sentRequest.job.title}</td>
        {sentRequest.status === "pending" && (
          <td>
            <div className="flex items-center gap-1.5 text-primary ">
              <span className="font-semibold capitalize">
                {sentRequest.status}
              </span>
              <Clock className="-mb-1.5 h-5 w-5" />
            </div>
          </td>
        )}
        {sentRequest.status === "accepted" && (
          <td>
            <div className="flex items-center gap-1.5 text-green-500 ">
              <span className="font-semibold capitalize ">
                {sentRequest.status}
              </span>
              <Check />
            </div>
          </td>
        )}
        {sentRequest.status === "declined" && (
          <td>
            <div className="flex items-center gap-1.5 text-red-500 ">
              <span className="font-semibold capitalize ">
                {sentRequest.status}
              </span>
              <X />
            </div>
          </td>
        )}
        <th>
          <div className="flex items-center justify-center text-red-600">
            <button
              onClick={() => {
                DeletesentRequest.mutate({ id: sentRequest.id });
              }}
            >
              <Trash2 />
            </button>
          </div>
        </th>
      </tr>
    </>
  );
};

export default SentRequestRow;
