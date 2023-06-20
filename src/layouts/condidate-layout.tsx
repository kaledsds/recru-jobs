import { Navbar, Sidebar } from "~/components/ui";
import MainLayout from "./main-layout";
import { condidateConfig } from "~/config/condidate-config";

/**
 * The props for the CondidateLayout component.
 * children: The children to render inside the MainLayout component.
 */
interface CondidateLayoutProps {
  children: React.ReactNode;
}
/**
 * CondidateLayout is a component that will render the children inside the MainLayout component.
 * @param children The children to render inside the MainLayout component.
 * @returns The CondidateLayout component.
 */
const CondidateLayout: React.FC<CondidateLayoutProps> = ({ children }) => {
  // Render the MainLayout component with the children inside.
  return (
    <>
      <MainLayout>
        <div className="flex h-screen flex-col">
          <Navbar type="condidate" />
          <div className="flex h-full">
            <Sidebar config={condidateConfig} />
            <main className="mt-16 w-full overflow-y-auto p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CondidateLayout;
