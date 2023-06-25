import { type UseFormReturn } from "react-hook-form";
import { type CandidateLocationType } from "~/validation/candidate";

interface CandidateLocationProps {
  methods: UseFormReturn<CandidateLocationType>;
  goPreviousStep: () => void;
  submitData: (data: CandidateLocationType) => void;
}

/**
 * Candidate Location
 * @param {CandidateLocationProps} props
 * @returns {JSX.Element} JSX.Element
 */
const CandidateLocation: React.FC<CandidateLocationProps> = ({
  methods,
  goPreviousStep,
  submitData,
}) => {
  return (
    <form
      onSubmit={methods.handleSubmit(submitData)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">
        Please provide your localisation coordinates:
      </h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* City */}
        <div className="form-control w-full">
          <label htmlFor="city" className="pb-2 font-semibold">
            City:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="city"
            type="text"
            placeholder="Type here"
            {...methods.register("city")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.city?.message}
            </span>
          </label>
        </div>
        {/* Address */}
        <div className="form-control w-full">
          <label htmlFor="address" className="pb-2 font-semibold">
            Address:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="address"
            type="text"
            placeholder="Type here"
            {...methods.register("address")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.address?.message}
            </span>
          </label>
        </div>
        {/* Postal Code */}
        <div className="form-control w-full">
          <label htmlFor="postalCode" className="pb-2 font-semibold">
            Postal Code:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="postalCode"
            type="text"
            placeholder="Type here"
            {...methods.register("postalCode")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {methods.formState.errors.postalCode?.message}
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

export default CandidateLocation;
