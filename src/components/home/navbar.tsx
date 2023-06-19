import Link from "next/link";
import { navItem } from "~/config/main-page-config";
import useScroll from "~/hooks/useScroll";
import ThemeToggler from "../ui/theme-toggler";

/**
 * Navbar is the navigation bar of the application.
 * @returns The Navbar component.
 */
const Navbar: React.FC = () => {
  const scrollPosition = useScroll();

  return (
    <header
      className={
        scrollPosition === 0
          ? "navbar fixed left-0 top-0 z-10 bg-base-200 bg-transparent px-24 py-4"
          : "navbar fixed left-0 top-0 z-10 bg-base-300 px-24 py-4 shadow-md"
      }
    >
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          RecruJobs
        </Link>
      </div>
      {/* Inpage Navigtion items */}
      <nav className="mx-8 flex-none">
        <ul className="menu menu-horizontal px-1">
          {navItem.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggler />
    </header>
  );
};

export default Navbar;
