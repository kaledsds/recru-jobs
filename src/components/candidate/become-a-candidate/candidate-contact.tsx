import { type UseFormReturn } from "react-hook-form";
import { type CandidateContactType } from "~/validation/candidate";

interface CandidateContactProps {
  methods: UseFormReturn<CandidateContactType>;
  goPreviousStep: () => void;
  submitData: (data: CandidateContactType) => void;
}

/**
 * Candidate Contact
 * @param {CandidateContactProps} props
 * @returns {JSX.Element} JSX.Element
 */
const CandidateContact: React.FC<CandidateContactProps> = ({
  methods,
  goPreviousStep,
  submitData,
}) => {
  return (
    <form
      onSubmit={methods.handleSubmit(submitData)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">Please provide your contact:</h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* Phone Number */}
        <div className="form-control w-full">
          <label htmlFor="phone" className="pb-2 font-semibold">
            Phone Number:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="phone"
            type="text"
            placeholder="Type here"
            {...methods.register("phone")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.phone?.message}
            </span>
          </label>
        </div>
        {/* E-mail */}
        <div className="form-control w-full">
          <label htmlFor="email" className="pb-2 font-semibold">
            E-mail:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="email"
            type="text"
            placeholder="Type here"
            {...methods.register("email")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.email?.message}
            </span>
          </label>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between">
        {/* Previous btn */}
        <button
          className="btn-outline btn-primary btn-sm btn"
          onClick={goPreviousStep}
        >
          Previous
        </button>
        {/* Next btn */}
        <button type="submit" className="btn-primary btn-sm btn">
          Next
        </button>
      </div>
    </form>
  );
};

export default CandidateContact;
