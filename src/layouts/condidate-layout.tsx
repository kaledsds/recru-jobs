import MainLayout from "./main-layout";

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
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default CondidateLayout;
