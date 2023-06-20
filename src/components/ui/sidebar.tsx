import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

// Config Type for Sidebar
interface ConfigType {
  type: string;
  navItems: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[];
}

// Sidebar Props
interface SidebarProps {
  config: ConfigType;
}

/**
 * Sidebar Component
 * @param config
 */
const Sidebar: React.FC<SidebarProps> = ({ config }) => {
  return (
    <aside className=" fixed left-0 top-0 hidden h-screen w-[20%] flex-col overflow-y-hidden bg-base-300 shadow-md duration-300 ease-linear lg:static lg:flex lg:translate-x-0 ">
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 pt-14 lg:mt-9 lg:px-6">
          <div>
            <h3 className="text-bodydark2 px-4 py-3 text-sm font-semibold">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-4">
              {/* Dashboard */}
              <ul className="menu rounded-box w-full bg-base-100 p-2">
                <li key={config.type}>
                  <Link href={`/${config.type}`}>
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </li>
              </ul>
              {/* NavItems */}
              {config.navItems.map((navItem) => (
                <ul
                  className="menu rounded-box w-full bg-base-100 p-2"
                  key={navItem.id}
                >
                  <li className="menu-title">
                    <span>{navItem.name}</span>
                  </li>
                  {navItem.items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href}>
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
