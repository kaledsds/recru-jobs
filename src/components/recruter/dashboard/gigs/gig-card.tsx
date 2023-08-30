import type { Gig, Job, User, candidate } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import GigRecrute from "./gig-recrute";

interface GigCardProps {
  recruterJobs: Job[];
  gig: Gig & {
    candidate: candidate & {
      user: User;
    };
  };
}

/**
 * The GigCard component.
 */
const GigCard: React.FC<GigCardProps> = ({ gig, recruterJobs }) => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <>
      <div className="card w-full border border-primary bg-base-200 shadow-md">
        <div className="card-body gap-5">
          <div className="flex items-center justify-start gap-3">
            <Image
              className="rounded-full"
              src={gig.candidate.user.image as string}
              alt="user"
              width={50}
              height={50}
            />
            <div>
              <h2 className="card-title">{gig.candidate.user.name}</h2>
              <p>is looking for</p>
            </div>
            <p className="mr-1 flex items-center justify-end text-slate-500">
              {gig.createdAt.toLocaleString()}
            </p>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="rounded-full ">
                  <MoreVertical />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a>Report User</a>
                </li>
              </ul>
            </div>
          </div>
          <h2 className="card-title font-bold text-primary">{gig.title}</h2>
          <p>
            <span className="rounded-full border-2 border-primary px-2 py-1">
              category: {gig.category}
            </span>
            <span className="mx-3 rounded-full border-2 border-primary px-2 py-1">
              Service Type: {gig.serviceType}
            </span>
            <span className="rounded-full border-2 border-primary px-2 py-1">
              Salary: {gig.salary}
            </span>
          </p>

          <div className="card-actions justify-end">
            {gig.candidate.user.id !== session.user.id && gig.id && (
              <GigRecrute gigId={gig.id} recruterJobs={recruterJobs} />
            )}
            {/* <Link
              href={`/candidate/job/${gig.id}`}
              className="btn-primary btn-sm btn"
            >
              Details
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GigCard;
