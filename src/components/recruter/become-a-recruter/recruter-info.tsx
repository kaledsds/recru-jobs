import { type UseFormReturn } from "react-hook-form";
import RecruterNonOrgInfo from "./recruter-non-org-info";
import RecruterOrgInfo from "./recruter-org-info";
import type {
  RecruterNonOrgType,
  RecruterOrgType,
} from "~/validation/recruter";

interface RecruterInfoProps {
  isOrganization: boolean;
  orgMethods: UseFormReturn<RecruterOrgType>;
  nonOrgMethods: UseFormReturn<RecruterNonOrgType>;
  goPreviousStep: () => void;
  submitOrgData: (data: RecruterOrgType) => void;
  submitNonOrgData: (data: RecruterNonOrgType) => void;
}

/**
 * The recruter info component.
 * @param isOrganization Whether the recruter is an organization or not.
 * @param orgMethods The react-hook-form methods for the organization form.
 * @param nonOrgMethods The react-hook-form methods for the non-organization form.
 * @param goPreviousStep The function to go to the previous step.
 * @param submitOrgData The function to submit the organization data.
 * @param submitNonOrgData The function to submit the non-organization data.
 * @returns The JSX element for the recruter info component.
 */
const RecruterInfo: React.FC<RecruterInfoProps> = ({
  isOrganization,
  orgMethods,
  nonOrgMethods,
  goPreviousStep,
  submitOrgData,
  submitNonOrgData,
}) => {
  return (
    <>
      {isOrganization && (
        <RecruterOrgInfo
          orgMethods={orgMethods}
          goPreviousStep={goPreviousStep}
          submitOrgData={submitOrgData}
        />
      )}
      {!isOrganization && (
        <RecruterNonOrgInfo
          nonOrgMethods={nonOrgMethods}
          goPreviousStep={goPreviousStep}
          submitNonOrgData={submitNonOrgData}
        />
      )}
    </>
  );
};

export default RecruterInfo;
