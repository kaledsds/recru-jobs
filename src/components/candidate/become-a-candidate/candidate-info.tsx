import Link from "next/link";
import { type UseFormReturn } from "react-hook-form";
import { type CandidateInfoType } from "~/validation/candidate";

interface CandidateInfoProps {
  methods: UseFormReturn<CandidateInfoType>;
  submitData: (data: CandidateInfoType) => void;
}

/**
 * Candidate Info
 * @param {CandidateInfoProps} props
 * @returns {JSX.Element} JSX.Element
 */
const CandidateInfo: React.FC<CandidateInfoProps> = ({
  methods,
  submitData,
}) => {
  return (
    <form
      onSubmit={methods.handleSubmit(submitData)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">
        Please provide your full name, CIN and your Field of expertise:
      </h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* Full Name */}
        <div className="form-control w-full">
          <label htmlFor="fullName" className="pb-2 font-semibold">
            Full Name:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="fullName"
            type="text"
            placeholder="Type here"
            {...methods.register("fullName")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.fullName?.message}
            </span>
          </label>
        </div>
        {/* CIN */}
        <div className="form-control w-full">
          <label htmlFor="cin" className="pb-2 font-semibold">
            CIN:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="cin"
            type="text"
            placeholder="Type here"
            {...methods.register("cin")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.cin?.message}
            </span>
          </label>
        </div>
        {/* Expertise */}
        <div className="form-control w-full">
          <label htmlFor="expertise" className="pb-2 font-semibold">
            Expertise:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="expertise"
            type="text"
            placeholder="Type here"
            {...methods.register("expertise")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.expertise?.message}
            </span>
          </label>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between">
        {/* Go back btn */}
        <Link href="/welcome" className="btn-outline btn-primary btn-sm btn">
          Go back
        </Link>
        {/* Next btn */}
        <button type="submit" className="btn-primary btn-sm btn">
          Next
        </button>
      </div>
    </form>
  );
};

export default CandidateInfo;
