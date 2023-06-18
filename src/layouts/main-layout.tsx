import AuthGuard from "./auth-guard";

/**
 * MainLayoutProps is the type of the props object that must be passed to MainLayout component.
 * children: The children to render inside the AuthGuard component.
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout is a component that will render the children inside the AuthGuard component.
 * @param children The children to render inside the AuthGuard component.
 * @returns The MainLayout component.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Render the AuthGuard component with the children inside.
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
};

export default MainLayout;
