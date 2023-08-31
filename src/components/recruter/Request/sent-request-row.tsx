import type { Gig, Job, User, candidate } from "@prisma/client";
import { Check, Trash2, X } from "lucide-react";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface SentRequestRowProps {
  gig: Gig & {
    candidate: candidate & {
      user: User;
    };
  };
  job: Job;
  status: string;
  id: string;
}

const SentRequestRow: React.FC<SentRequestRowProps> = ({
  gig,
  job,
  status,
  id,
}) => {
  const ctx = api.useContext();
  const DeletesentRequest = api.gigRequest.deletGigRequest.useMutation({
    onSuccess: async () => {
      await ctx.gigRequest.invalidate();
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
                  src={gig.candidate.user.image as string}
                  alt={gig.candidate.user.name as string}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{gig.candidate.user.name}</div>
              {status === "accepted" && (
                <div className="text-sm opacity-50">
                  {gig.candidate.user.email}
                </div>
              )}
            </div>
          </div>
        </td>
        <td>{gig.title}</td>
        <td>{job.title}</td>
        {status === "pending" && (
          <td>
            <div className="flex items-center gap-1.5 text-primary ">
              <span className="font-semibold capitalize">{status}</span>
              <Clock className="-mb-1.5 h-5 w-5" />
            </div>
          </td>
        )}
        {status === "accepted" && (
          <td>
            <div className="flex items-center gap-1.5 text-green-500 ">
              <span className="font-semibold capitalize ">{status}</span>
              <Check />
            </div>
          </td>
        )}
        {status === "declined" && (
          <td>
            <div className="flex items-center gap-1.5 text-red-500 ">
              <span className="font-semibold capitalize ">{status}</span>
              <X />
            </div>
          </td>
        )}
        <th>
          <div className="flex items-center justify-center text-red-600">
            <button
              onClick={() => {
                DeletesentRequest.mutate({ id: id });
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
