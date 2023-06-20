import Head from "next/head";
import { useState } from "react";
import {
  RecruterDone,
  RecruterContact,
  RecruterInfo,
  RecruterSocials,
  RecruterType,
} from "~/components/recruter/become-a-recruter";
import FormSteps from "~/components/recruter/become-a-recruter/form-steps";
import { ThemeApplyer } from "~/components/ui";
import { useForm } from "react-hook-form";
import {
  recruterTypeSchema,
  type RecruterTypeType,
} from "~/validation/recruter/recruterType";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * The Become a recruter page.
 */
export default function BecomeARecruter() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // recruter type form methods
  const recruterTypeFormMethods = useForm<RecruterTypeType>({
    resolver: zodResolver(recruterTypeSchema),
  });

  // recruter data state
  const [recruterTypeData, setRecruterTypeData] = useState<RecruterTypeType>();

  return (
    <>
      <Head>
        <title>RecruJobs/Welcome</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden ">
        <div className="space-y-8">
          <h1 className="text-center text-4xl font-bold text-primary">
            Become a recruter
          </h1>
          <FormSteps step={currentStep} />
          <div className="rounded-lg bg-primary bg-opacity-5 p-10">
            {currentStep === 1 && (
              <RecruterType
                methods={recruterTypeFormMethods}
                goNextStep={() => setCurrentStep((step) => step + 1)}
                submitData={(data: RecruterTypeType) =>
                  setRecruterTypeData(data)
                }
              />
            )}
            {currentStep === 2 && <RecruterInfo />}
            {currentStep === 3 && <RecruterContact />}
            {currentStep === 4 && <RecruterSocials />}
            {currentStep === 5 && <RecruterDone />}
          </div>
        </div>
        <ThemeApplyer />
      </main>
    </>
  );
}
