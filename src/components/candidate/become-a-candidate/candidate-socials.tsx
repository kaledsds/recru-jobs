import { type UseFormReturn } from "react-hook-form";
import { type CandidateSocialsType } from "~/validation/candidate";

interface CandidateSocialsProps {
  methods: UseFormReturn<CandidateSocialsType>;
  goPreviousStep: () => void;
  submitData: (data: CandidateSocialsType) => void;
}

/**
 * Candidate Socials
 * @param {CandidateSocialsProps} props
 * @returns {JSX.Element} JSX.Element
 */
const CandidateSocials: React.FC<CandidateSocialsProps> = ({
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
        You can also add your social media links here so it will be easier to
        contact you:
      </h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* LinkedIn & Facebook */}
        <div className="flex gap-4">
          {/* LinkedIn */}
          <div className="form-control w-full">
            <label htmlFor="linkedIn" className="pb-2 font-semibold">
              LinkedIn:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="linkedIn"
              type="text"
              placeholder="Type here"
              {...methods.register("linkedIn")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.linkedIn?.message}
              </span>
            </label>
          </div>
          {/* Facebook */}
          <div className="form-control w-full">
            <label htmlFor="facebook" className="pb-2 font-semibold">
              Facebook:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="facebook"
              type="text"
              placeholder="Type here"
              {...methods.register("facebook")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.facebook?.message}
              </span>
            </label>
          </div>
        </div>
        {/* Twitter & Instagram */}
        <div className="flex gap-4">
          {/* Twitter */}
          <div className="form-control w-full">
            <label htmlFor="twitter" className="pb-2 font-semibold">
              Twitter:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="twitter"
              type="text"
              placeholder="Type here"
              {...methods.register("twitter")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.instagram?.message}
              </span>
            </label>
          </div>
          {/* Instagram */}
          <div className="form-control w-full">
            <label htmlFor="instagram" className="pb-2 font-semibold">
              Instagram:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="instagram"
              type="text"
              placeholder="Type here"
              {...methods.register("instagram")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.instagram?.message}
              </span>
            </label>
          </div>
        </div>
        {/* Github & Website */}
        <div className="flex gap-4">
          {/* Github */}
          <div className="form-control w-full">
            <label htmlFor="github" className="pb-2 font-semibold">
              Github:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="github"
              type="text"
              placeholder="Type here"
              {...methods.register("github")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.github?.message}
              </span>
            </label>
          </div>
          {/* Website */}
          <div className="form-control w-full">
            <label htmlFor="website" className="pb-2 font-semibold">
              Website:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="website"
              type="text"
              placeholder="Type here"
              {...methods.register("website")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.website?.message}
              </span>
            </label>
          </div>
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

export default CandidateSocials;
