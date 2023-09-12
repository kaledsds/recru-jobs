import type { Gig, User, candidate } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface GigDetailsProps {
  gig: Gig & { candidate: candidate & { user: User } };
}

const GigDetails: React.FC<GigDetailsProps> = ({ gig }) => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`job-details${gig.id}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`job-details${gig.id}`}
        className="modal cursor-pointer p-0"
      >
        <label className="modal-box relative p-0" htmlFor="">
          <div className="rounded-box flex-grow bg-base-300 p-4">
            <div className="flex justify-between">
              <div className="flex items-center justify-start gap-3">
                <Image
                  className="rounded-full"
                  src={gig.candidate.user.image as string}
                  alt="user"
                  width={50}
                  height={50}
                />
                <Link
                  href={`/admin/candidate/${gig.candidate.id}`}
                  className="card-title text-primary"
                >
                  {gig.candidate.fullName}
                </Link>
              </div>
              <p className="mr-1 flex items-center justify-end text-slate-500">
                {gig.createdAt.toLocaleString()}
              </p>
            </div>
            <div className="divider"></div>
            <div className="container">
              <h1 className="rounded-lg bg-primary py-2 text-center text-xl font-bold text-slate-100">
                Gig Details
              </h1>
              <div className="divider"></div>
              <div className="flex flex-col items-center space-y-5">
                <div className="flex flex-col items-start">
                  {/* Gig title */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">Gig title :</h2>
                    <p> {gig.title}</p>
                  </div>
                  {/* Category */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">Category :</h2>
                    <p>{gig.category}</p>
                  </div>
                  {/* Service Type */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">Service Type :</h2>
                    <p>{gig.serviceType} job</p>
                  </div>
                  {/* salary */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">salary :</h2>
                    <p>{gig.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default GigDetails;
