import { type UseFormReturn } from "react-hook-form";
import type { RecruterOrgType } from "~/validation/recruter";

interface RecruterOrgInfoProps {
  orgMethods: UseFormReturn<RecruterOrgType>;
  goPreviousStep: () => void;
  submitOrgData: (data: RecruterOrgType) => void;
}

/**
 * Recruter Organization Info form component.
 * @param orgMethods The react-hook-form methods for the organization form.
 * @param goPreviousStep The function to go to the previous step.
 * @param submitOrgData The function to submit the organization data.
 * @returns The JSX element for the recruter organization info component.
 */
const RecruterOrgInfo: React.FC<RecruterOrgInfoProps> = ({
  orgMethods,
  goPreviousStep,
  submitOrgData,
}) => {
  return (
    <form
      onSubmit={orgMethods.handleSubmit(submitOrgData)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">
        Please provide your organization name and ID:
      </h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* Org Name */}
        <div className="form-control w-full">
          <label htmlFor="orgName" className="pb-2 font-semibold">
            Organization Name:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="orgName"
            type="text"
            placeholder="Type here"
            {...orgMethods.register("orgName")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {orgMethods.formState.errors.orgName?.message}
            </span>
          </label>
        </div>
        {/* Org ID */}
        <div className="form-control w-full">
          <label htmlFor="orgId" className="pb-2 font-semibold">
            Organization ID:
          </label>
          <input
            className="input-bordered input-primary input w-full"
            id="orgId"
            type="text"
            placeholder="Type here"
            {...orgMethods.register("orgId")}
          />
          <label className="label">
            <span></span>
            <span className="label-text-alt text-error">
              {orgMethods.formState.errors.orgId?.message}
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

export default RecruterOrgInfo;
