import { Navbar, Sidebar, Spinner } from "~/components/ui";
import MainLayout from "./main-layout";
import { candidateConfig } from "~/config/candidate-config";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * The props for the CandidateLayout component.
 * children: The children to render inside the MainLayout component.
 */
interface CandidateLayoutProps {
  children: React.ReactNode;
}
/**
 * CandidateLayout is a component that will render the children inside the MainLayout component.
 * @param children The children to render inside the MainLayout component.
 * @returns The CandidateLayout component.
 */
const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => {
  const { data: checkCandidate, status } = api.candidate.checkCandidate.useQuery();

  const router = useRouter();
  useEffect(() => {
    if (!checkCandidate && status === "success") {
      router.push("/candidate/become-a-candidate");
    }
  }, [checkCandidate, router, status]);

  if (status === "loading" || !checkCandidate) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Render the MainLayout component with the children inside.
  return (
    <>
      <MainLayout>
        <div className="flex h-screen flex-col">
          <Navbar type="candidate" />
          <div className="flex h-full">
            <Sidebar config={candidateConfig} />
            <main className="mt-16 w-full overflow-y-auto p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CandidateLayout;
