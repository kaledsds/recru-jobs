import {
  AlertOctagonIcon,
  Contact,
  FileCog2,
  MessagesSquare,
  UserCog2,
} from "lucide-react";

export const adminConfig = {
  type: "admin",
  navItems: [
    {
      id: "posts",
      name: "Posts",
      items: [
        {
          id: "managejob",
          name: "Manage Jobs",
          href: "/admin/manage-jobs",
          icon: <FileCog2 className="h-5 w-5" />,
        },
        {
          id: "managegigs",
          name: "Manage Gigs",
          href: "/admin/manage-gigs",
          icon: <UserCog2 className="h-5 w-5" />,
        },
      ],
    },
    {
      id: "support",
      name: "Support",
      items: [
        {
          id: "reports",
          name: "Reports",
          href: "/admin/reports",
          icon: <AlertOctagonIcon className="h-5 w-5" />,
        },
        {
          id: "cantact",
          name: "Cantact",
          href: "/admin/cantact",
          icon: <Contact className="h-5 w-5" />,
        },
        {
          id: "feedback",
          name: "Feedback",
          href: "/admin/feedback",
          icon: <MessagesSquare className="h-5 w-5" />,
        },
      ],
    },
  ],
};
