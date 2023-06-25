import { type UseFormReturn } from "react-hook-form";
import type { RecruterNonOrgType } from "~/validation/recruter";

interface RecruterNonOrgInfoProps {
  nonOrgMethods: UseFormReturn<RecruterNonOrgType>;
  goPreviousStep: () => void;
  submitNonOrgData: (data: RecruterNonOrgType) => void;
}

/**
 * Recruter Individual Info form component.
 * @param nonOrgMethods The react-hook-form methods for the non-organization form.
 * @param goPreviousStep The function to go to the previous step.
 * @param submitNonOrgData The function to submit the non-organization data.
 * @returns The JSX element for the recruter individual info form component.
 */
const RecruterNonOrgInfo: React.FC<RecruterNonOrgInfoProps> = ({
  nonOrgMethods,
  goPreviousStep,
  submitNonOrgData,
}) => {
  return (
    <form
      onSubmit={nonOrgMethods.handleSubmit(submitNonOrgData)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">Please provide your full name and CIN:</h1>
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
            {...nonOrgMethods.register("fullName")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {nonOrgMethods.formState.errors.fullName?.message}
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
            {...nonOrgMethods.register("cin")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {nonOrgMethods.formState.errors.cin?.message}
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

export default RecruterNonOrgInfo;
