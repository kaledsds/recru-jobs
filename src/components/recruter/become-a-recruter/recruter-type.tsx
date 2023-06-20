import { type UseFormReturn } from "react-hook-form";
import { type RecruterTypeType } from "~/validation/recruter/recruterType";

// recruter type form component props
interface RecruterTypeProps {
  methods: UseFormReturn<RecruterTypeType>;
  goNextStep: () => void;
  submitData: (data: RecruterTypeType) => void;
}
/**
 * The recruter type form component.
 * @param {RecruterTypeProps} props The component props.
 * @returns {JSX.Element} The JSX Code for the recruter type form component.
 */
const RecruterType: React.FC<RecruterTypeProps> = ({
  methods,
  goNextStep,
  submitData,
}) => {
  // onSubmit Function
  const onSubmit = (data: RecruterTypeType) => {
    submitData(data);
    goNextStep();
  };

  return (
    <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
      <h1>Please specify the type of usage from the options below:</h1>
      <div>
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
        <p>{methods.formState.errors.isOrganization.message}</p>
      )}
      <div className="justify-end- flex">
        <button type="submit" className="btn-primary btn">
          Next
        </button>
      </div>
    </form>
  );
};

export default RecruterType;
