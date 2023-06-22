import { type UseFormReturn } from "react-hook-form";
import RecruterNonOrgInfo from "./recruter-non-org-info";
import RecruterOrgInfo from "./recruter-org-info";
import type {
  RecruterNonOrgType,
  RecruterOrgType,
} from "~/validation/recruter/recruterInfo";

interface RecruterInfoProps {
  isOrganization: boolean;
  orgMethods: UseFormReturn<RecruterOrgType>;
  nonOrgMethods: UseFormReturn<RecruterNonOrgType>;
  goPreviousStep: () => void;
  submitOrgData: (data: RecruterOrgType) => void;
  submitNonOrgData: (data: RecruterNonOrgType) => void;
}

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
