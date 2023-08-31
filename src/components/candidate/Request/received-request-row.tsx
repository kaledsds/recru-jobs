import type { Gig, GigRequest, Job, Recruter, User } from "@prisma/client";
import { Check, Clock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

interface ReceivedRequestRowProps {
  request: GigRequest & {
    gig: Gig;
    job: Job;
    recruter: Recruter & {
      user: User;
    };
  };
}

const ReceivedRequestRow: React.FC<ReceivedRequestRowProps> = ({ request }) => {
  const ctx = api.useContext();
  const setStatus = api.gigRequest.editGigRequest.useMutation({
    onSuccess: async () => {
      await ctx.gigRequest.invalidate();
    },
  });

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <Image
                src={request.recruter.user.image as string}
                alt={request.recruter.user.name as string}
                width={50}
                height={50}
              />
            </div>
          </div>
          <div>
            <Link
              href={`/recruter/profile/${request.recruter.user.id}`}
              className="font-bold"
            >
              {request.recruter.user.name}
            </Link>
            <div className="text-sm opacity-50">
              {request.recruter.user.email}
            </div>
          </div>
        </div>
      </td>
      <td>{request.gig.title}</td>
      <td>{request.job.title}</td>
      {request.status === "pending" && (
        <td>
          <div className="flex items-center gap-1.5 text-primary ">
            <span className="font-semibold capitalize">{request.status}</span>
            <Clock className="-mb-1.5 h-5 w-5" />
          </div>
        </td>
      )}
      {request.status === "accepted" && (
        <td>
          <div className="flex items-center gap-1.5 text-green-500 ">
            <span className="font-semibold capitalize ">{request.status}</span>
            <Check />
          </div>
        </td>
      )}
      {request.status === "declined" && (
        <td>
          <div className="flex items-center gap-1.5 text-red-500 ">
            <span className="font-semibold capitalize ">{request.status}</span>
            <X />
          </div>
        </td>
      )}
      <th>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn">
            <div className="rounded-full">action</div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact bg-base-300 p-1 shadow-md"
          >
            <li>
              <button
                onClick={() => {
                  setStatus.mutate({ id: request.id, status: "accepted" });
                }}
              >
                accepted
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setStatus.mutate({ id: request.id, status: "declined" });
                }}
              >
                declined
              </button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};

export default ReceivedRequestRow;
