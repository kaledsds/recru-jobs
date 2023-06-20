import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ThemeToggler from "~/components/ui/theme-toggler";

// NavbarProps is the type of the props object that must be passed to Navbar component.
interface NavbarProps {
  type: "condidate" | "recruter";
}

/**
 * Navbar is a component that will render the navbar.
 * @param type The type of the navbar.
 * @returns The Navbar component.
 */
const Navbar: React.FC<NavbarProps> = ({ type }) => {
  const { data: session } = useSession();

  return (
    <header className="navbar fixed right-0 top-0 z-10 flex w-[100%] items-center justify-between bg-base-300 px-8 py-2 shadow-sm">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          RecruJobs
        </Link>
      </div>
      {/* Navbar Profile & ThemeToggler */}
      <div className="mx-8 flex-none">
        <div className="flex items-center justify-center space-x-6">
          <ThemeToggler />
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium">
              {session?.user.name}
            </span>
            <span className="block text-xs capitalize">{type}</span>
          </span>
          <div className="dropdown-end dropdown online avatar">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  className="rounded-full"
                  src={session?.user.image as string}
                  alt={session?.user.name as string}
                  width={50}
                  height={50}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow-md"
            >
              <li>
                <Link href={`/${type}/profile`} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                {type === "recruter" ? (
                  <Link href="/condidate" className="justify-between">
                    Switch to condidate
                  </Link>
                ) : (
                  <Link href="/recruter" className="justify-between">
                    Switch to recruter
                  </Link>
                )}
              </li>
              <li>
                <a onClick={() => void signOut()}>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
