import type {
  Gig,
  Job,
  Recruter,
  Signal,
  User,
  candidate,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "~/components/ui";
import JobDetails from "../manage-jobs/job-details";
import GigDetails from "../manage-gigs/gig-details";
import ReportReason from "./report-reason";
import DeleteReport from "./delete-report";

interface ReportRowProps {
  report: Signal & {
    user: User;
    recruter: Recruter | null;
    candidate: candidate | null;
    gig:
      | (Gig & {
          candidate: candidate & {
            user: User;
          };
        })
      | null;
    job:
      | (Job & {
          recruter: Recruter & {
            user: User;
          };
        })
      | null;
  };
}

const ReportRow: React.FC<ReportRowProps> = ({ report }) => {
  const reported =
    report.candidate?.fullName ||
    report.recruter?.fullName ||
    report.recruter?.orgName ||
    report.gig?.title ||
    report.job?.title;
  const reportType =
    report.candidate || report.recruter || report.gig || report.job;
  if (!reportType || !reported) {
    return (
      <>
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  src={report.user.image as string}
                  alt={report.user.name as string}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{report.user.name}</div>
              <div className="text-sm opacity-50">{report.user.email}</div>
            </div>
          </div>
        </td>
        <td>
          {reportType === report.candidate ? (
            <Link
              href={`/admin/candidate/${reportType.id}`}
              className="link-primary link"
            >
              {reported}
            </Link>
          ) : reportType === report.recruter ? (
            <Link
              href={`/admin/candidate/${reportType.id}`}
              className="link-primary link"
            >
              {reported}
            </Link>
          ) : reportType === report.gig ? (
            <>
              {/* The button to open modal */}
              <label
                htmlFor={`job-details${reportType.id}`}
                className="link-primary link"
              >
                {reported}
              </label>
              <GigDetails gig={reportType} />
            </>
          ) : reportType === report.job ? (
            <>
              {/* The button to open modal */}
              <label
                htmlFor={`job-details${reportType.id}`}
                className="link-primary link"
              >
                {reported}
              </label>
              <JobDetails job={reportType} />
            </>
          ) : null}
        </td>
        <td>
          <ReportReason reason={report.reason} id={report.id} />
        </td>
        <td>
          <DeleteReport id={report.id} />
        </td>
      </tr>
    </>
  );
};

export default ReportRow;
