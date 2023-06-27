import { useRouter } from "next/router";
import Breadcrumbs from "./breadcrumbs";

interface PageHeaderProps {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
}

/**
 * The page header component.
 * @param props The page header props.
 * @returns The JSX element for the page header component.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, Icon, children }) => {
  const router = useRouter();

  return (
    <header className="container">
      <div className="container flex items-center justify-between">
        <div className="flex w-fit items-center justify-center gap-2">
          <span className="-mb-1">
            <Icon />
          </span>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div>{children}</div>
        <div>
          <Breadcrumbs baseRoute={router.route} />
        </div>
      </div>
      <div className="divider"></div>
    </header>
  );
};

export default PageHeader;
