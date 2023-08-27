import Link from "next/link";
import { cn } from "~/utils/cn";
import { routeLink, routeToArray } from "~/utils/route-to-array";

interface BreadcrumbsProps {
  baseRoute: string;
}

/**
 * The breadcrumbs component.
 * @param props The breadcrumbs props.
 * @returns The JSX element for the breadcrumbs component.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ baseRoute }) => {
  const routes = routeToArray(baseRoute);

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              href={routeLink(routes, index)}
              className={cn(
                "text-base font-semibold capitalize",
                index === routes.length - 1 && "text-primary"
              )}
            >
              {(!route.includes("[id]") && route) || ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
