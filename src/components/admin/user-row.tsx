import type { Recruter, User, candidate } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteUser from "./delete-user";

interface UserRowProps {
  user: User & {
    candidate: candidate | null;
    recruter: Recruter | null;
  };
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  src={user.image as string}
                  alt={user.name as string}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm opacity-50">{user.email}</div>
            </div>
          </div>
        </td>
        <td>
          {user.candidate ? (
            <Link
              href={`/admin/candidate/${user.candidate.id}`}
              className="font-bold"
            >
              {user.candidate.fullName}
            </Link>
          ) : (
            <X className="text-red-600" />
          )}
        </td>
        <td>
          {!user.recruter ? (
            <X className="text-red-600" />
          ) : (
            <Link
              href={`/admin/recruiter/${user.recruter.id}`}
              className="font-bold"
            >
              {user.recruter.orgName}
              {user.recruter.fullName}
            </Link>
          )}
        </td>
        <td>
          <DeleteUser id={user.id} />
        </td>
      </tr>
    </>
  );
};

export default UserRow;
