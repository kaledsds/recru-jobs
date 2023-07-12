import { ClipboardSignature, FileCog2, Mailbox, Send } from "lucide-react";

export const recruterConfig = {
  type: "recruter",
  navItems: [
    {
      id: "posts",
      name: "Posts",
      items: [
        {
          id: "postajob",
          name: "Post A Job",
          href: "/recruter/post-a-job",
          icon: <ClipboardSignature className="h-5 w-5" />,
        },
        {
          id: "managejobs",
          name: "Manage Jobs",
          href: "/recruter/manage-jobs",
          icon: <FileCog2 className="h-5 w-5" />,
        },
      ],
    },
    {
      id: "requests",
      name: "Requests",
      items: [
        {
          id: "sent",
          name: "Sent",
          href: "/recruter/sent",
          icon: <Send className="h-5 w-5" />,
        },
        {
          id: "received",
          name: "Received",
          href: "/recruter/received",
          icon: <Mailbox className="h-5 w-5" />,
        },
      ],
    },
  ],
};
