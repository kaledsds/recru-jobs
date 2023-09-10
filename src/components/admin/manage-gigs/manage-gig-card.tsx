import type { Gig, User, candidate } from "@prisma/client";
import GigDetails from "./gig-details";
import Link from "next/link";
import DeleteGig from "./delete-gig";

interface ManageGigCardProps {
  gig: Gig & {
    candidate: candidate & {
      user: User;
    };
  };
}

const ManageGigCard: React.FC<ManageGigCardProps> = ({ gig }) => {
  return (
    <div className="w-[350px] rounded-lg border border-primary bg-base-300 p-8">
      {/* Gig title */}
      <div className="rounded-lg bg-primary px-12 py-1">
        <h1 className="text-center text-xl font-bold text-slate-100">
          {gig.title}
        </h1>
      </div>
      {/* Job infos */}
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Candidate Name:</span>
          <Link
            href={`/admin/candidate/${gig.candidate.id}`}
            className="text-lg font-semibold text-primary"
          >
            {gig.candidate.fullName}
          </Link>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Service Type:</span>
          <span className="text-lg">{gig.serviceType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Salary:</span>
          <span className="text-lg">{gig.salary}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Posted at:</span>
          <span className="text-lg"> {gig.createdAt.toLocaleString()}</span>
        </div>
      </div>
      {/* Job actions */}
      <div className="flex justify-between">
        <GigDetails gig={gig} />
        <DeleteGig id={gig.id} />
      </div>
    </div>
  );
};

export default ManageGigCard;
