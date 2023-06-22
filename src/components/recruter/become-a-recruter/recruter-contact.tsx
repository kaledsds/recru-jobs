import { type UseFormReturn } from "react-hook-form";
import { type RecruterContactType } from "~/validation/recruter/recruterContact";

interface RecruterContactProps {
  methods: UseFormReturn<RecruterContactType>;
  goPreviousStep: () => void;
  submitData: (data: RecruterContactType) => void;
}

/**
 * Contact step of the recruter registration form
 * @param methods The react hook form methods
 * @param goPreviousStep The function to go to the previous step
 * @param submitData The function to submit the data
 * @returns The JSX code for the contact step of the recruter registration form
 */
const RecruterContact: React.FC<RecruterContactProps> = ({
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
        Please provide your contact and localisation coordinates:
      </h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* Phone & Email */}
        <div className="flex gap-4">
          {/* Phone */}
          <div className="form-control w-full">
            <label htmlFor="phone" className="pb-2 font-semibold">
              Phone:
            </label>
            <input
              className="input-bordered input-primary input w-full"
              id="phone"
              type="text"
              placeholder="Type here"
              {...methods.register("phone")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {methods.formState.errors.phone?.message}
              </span>
            </label>
          </div>
          {/* Email */}
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
              <span className="label-text-alt text-error">
                {methods.formState.errors.email?.message}
              </span>
            </label>
          </div>
        </div>
        {/* City & Postal Code */}
        <div className="flex gap-4">
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
              <span className="label-text-alt text-error">
                {methods.formState.errors.city?.message}
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
              <span className="label-text-alt text-error">
                {methods.formState.errors.postalCode?.message}
              </span>
            </label>
          </div>
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
            <span className="label-text-alt text-error">
              {methods.formState.errors.address?.message}
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

export default RecruterContact;
