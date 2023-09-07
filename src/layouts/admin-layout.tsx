import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "./main-layout";
import { DashboardTheme, Navbar, Sidebar } from "~/components/ui";
import { adminConfig } from "~/config/admin-config";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
    }
    if (session?.user.role !== "ADMIN" && sessionStatus === "authenticated") {
      router.push("/welcome");
    }
  }, [router, sessionStatus, session]);

  return (
    <>
      <MainLayout>
        <div className="flex h-screen flex-col">
          <Navbar type="admin" />
          <div className="flex h-full">
            <Sidebar config={adminConfig} />
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

export default AdminLayout;
