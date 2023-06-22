import { Navbar, Sidebar } from "~/components/ui";
import MainLayout from "./main-layout";
import { candidateConfig } from "~/config/candidate-config";

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
