import MainLayout from "./main-layout";

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
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default RecruterLayout;
