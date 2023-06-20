import { cn } from "~/utils/cn";

interface FormStepsProps {
  step: number;
}

const FormSteps: React.FC<FormStepsProps> = ({ step }) => {
  return (
    <ul className="steps">
      <li className="step-primary step">Type</li>
      <li className={cn("step", step >= 2 && "step-primary")}>Informations</li>
      <li className={cn("step", step >= 3 && "step-primary")}>Contact</li>
      <li className={cn("step", step >= 4 && "step-primary")}>Socials</li>
      <li className={cn("step", step >= 5 && "step-primary")}>Done</li>
    </ul>
  );
};

export default FormSteps;
