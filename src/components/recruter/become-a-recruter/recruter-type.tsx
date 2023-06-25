import Link from "next/link";
import { type UseFormReturn } from "react-hook-form";
import { type RecruterTypeType } from "~/validation/recruter";

// recruter type form component props
interface RecruterTypeProps {
  methods: UseFormReturn<RecruterTypeType>;
  submitData: (data: RecruterTypeType) => void;
}
/**
 * The recruter type form component.
 * @param {RecruterTypeProps} props The component props.
 * @returns {JSX.Element} The JSX Code for the recruter type form component.
 */
const RecruterType: React.FC<RecruterTypeProps> = ({ methods, submitData }) => {
  return (
    <form className="space-y-6" onSubmit={methods.handleSubmit(submitData)}>
      <h1 className="font-bold">
        Please specify the type of usage from the options below:
      </h1>
      <div>
        {/* Org radio */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Organization</span>
            <input
              type="radio"
              className="radio"
              value="Organization"
              {...methods.register("isOrganization")}
            />
          </label>
        </div>
        {/* Individual radio */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Individual</span>
            <input
              type="radio"
              className="radio"
              value="Individual"
              {...methods.register("isOrganization")}
            />
          </label>
        </div>
      </div>
      {methods.formState.errors.isOrganization && (
        <p className="text-error">
          {methods.formState.errors.isOrganization.message}
        </p>
      )}
      {/* Next button */}
      <div className="flex justify-between">
        {/* Go back btn */}
        <Link href="/welcome" className="btn-outline btn-primary btn-sm btn">
          Go back
        </Link>
        <button type="submit" className="btn-primary btn-sm btn">
          Next
        </button>
      </div>
    </form>
  );
};

export default RecruterType;
