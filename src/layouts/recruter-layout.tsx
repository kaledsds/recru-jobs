import { recruterConfig } from "~/config/recruter-config";
import MainLayout from "./main-layout";
import { Navbar, Sidebar } from "~/components/ui";

/**
 * The props for the RecruterLayout component.
 * children: The children to render inside the MainLayout component.
 */
interface RecruterLayoutProps {
  children: React.ReactNode;
}

/**
 * RecruterLayout is a component that will render the children inside the MainLayout component.
 * @param children The children to render inside the MainLayout component.
 * @returns The RecruterLayout component.
 */
const RecruterLayout: React.FC<RecruterLayoutProps> = ({ children }) => {
  return (
    <>
      <MainLayout>
        <div className="flex h-screen flex-col">
          <Navbar type="recruter" />
          <div className="flex h-full">
            <Sidebar config={recruterConfig} />
            <main className="mt-16 w-full overflow-y-auto p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default RecruterLayout;
