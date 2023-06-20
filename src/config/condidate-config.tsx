import { Mailbox, Send, UserCog2, UserPlus2 } from "lucide-react";

export const condidateConfig = {
  type: "condidate",
  navItems: [
    {
      id: "posts",
      name: "Posts",
      items: [
        {
          id: "postagig",
          name: "Post A Gig",
          href: "/condidate/postagig",
          icon: <UserPlus2 className="h-5 w-5" />,
        },
        {
          id: "managegigs",
          name: "Manage Gigs",
          href: "/condidate/managegigs",
          icon: <UserCog2 className="h-5 w-5" />,
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
          href: "/condidate/sent",
          icon: <Send className="h-5 w-5" />,
        },
        {
          id: "received",
          name: "Received",
          href: "/condidate/received",
          icon: <Mailbox className="h-5 w-5" />,
        },
      ],
    },
  ],
};
