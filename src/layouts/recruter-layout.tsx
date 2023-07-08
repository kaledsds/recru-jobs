import { recruterConfig } from "~/config/recruter-config";
import MainLayout from "./main-layout";
import { DashboardTheme, Navbar, Sidebar, Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const { data: checkRecruter, status } = api.recruter.checkRecruter.useQuery();

  const router = useRouter();
  useEffect(() => {
    if (!checkRecruter && status === "success") {
      router.push("/recruter/become-a-recruter");
    }
  }, [checkRecruter, router, status]);

  if (status === "loading" || !checkRecruter) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

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
            <DashboardTheme />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default RecruterLayout;
