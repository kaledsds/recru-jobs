import { Mailbox, Send, UserCog2, UserPlus2 } from "lucide-react";

export const candidateConfig = {
  type: "candidate",
  navItems: [
    {
      id: "posts",
      name: "Posts",
      items: [
        {
          id: "postagig",
          name: "Post A Gig",
          href: "/candidate/post-a-gig",
          icon: <UserPlus2 className="h-5 w-5" />,
        },
        {
          id: "managegigs",
          name: "Manage Gigs",
          href: "/candidate/manage-gigs",
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
          href: "/candidate/sent",
          icon: <Send className="h-5 w-5" />,
        },
        {
          id: "received",
          name: "Received",
          href: "/candidate/received",
          icon: <Mailbox className="h-5 w-5" />,
        },
      ],
    },
  ],
};
