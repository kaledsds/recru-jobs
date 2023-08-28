import { type Gig } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DeleteGig from "./delete-gig";

interface ManageGigCardProps {
  gig: Gig;
}

const ManageGigCard: React.FC<ManageGigCardProps> = ({ gig }) => {
  return (
    <div className="h-[275px] w-[350px] rounded-lg border border-primary bg-base-300 p-8">
      {/* Gig title */}
      <div className="rounded-lg bg-primary px-12 py-1">
        <h1 className="text-center text-xl font-bold text-slate-100">
          {gig.title}
        </h1>
      </div>
      {/* Job infos */}
      <div className="flex flex-col gap-2 py-4">
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
          <span className="text-lg">date</span>
        </div>
      </div>
      {/* Job actions */}
      <div className="flex justify-center gap-24 py-2">
        {/* <button className="btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600">
          Delete
        </button> */}
        <DeleteGig id={gig.id} />
        <Link
          href={`/candidate/manage-gigs/edit/${gig.id}`}
          className="btn-primary btn-sm btn text-slate-100"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ManageGigCard;
