import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import {
  reportInputSchema,
  type ReporttInputType,
} from "~/validation/reportInput";

interface ReportModalProps {
  id: string;
  reported: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ id, reported }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReporttInputType>({
    resolver: zodResolver(reportInputSchema),
    defaultValues: {
      id,
    },
  });

  const ctx = api.useContext();

  const [Success, setSuccess] = useState<boolean>(false);

  const reportGig = api.report.createGigReport.useMutation({
    onSuccess: async () => {
      await ctx.report.invalidate();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      reset();
    },
  });

  const reportCandidate = api.report.createCandidateReport.useMutation({
    onSuccess: async () => {
      await ctx.report.invalidate();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      reset();
    },
  });

  const reportJob = api.report.createJobReport.useMutation({
    onSuccess: async () => {
      await ctx.report.invalidate();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      reset();
    },
  });

  const reportRecruiter = api.report.createRecruiterReport.useMutation({
    onSuccess: async () => {
      await ctx.report.invalidate();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      reset();
    },
  });

  const onSubmit = (data: ReporttInputType) => {
    if (reported === "gig post") {
      reportGig.mutate(data);
    }
    if (reported === "candidate") {
      reportCandidate.mutate(data);
    }
    if (reported === "job post") {
      reportJob.mutate(data);
    }
    if (reported === "recruiter") {
      reportRecruiter.mutate(data);
    }
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`report${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`report${id}`}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            if you have any issue with this {reported} please report buy typing
            the reason below!
          </h3>
          <form
            className="form-control w-full gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="label">
              <span className="label-text">Reason :</span>
            </label>
            <textarea
              className="input-bordered input w-full"
              {...register("reason")}
            ></textarea>
            <label className="label">
              <span className="label-text"></span>
              <span className="label-text text-red-500">
                {errors.reason?.message}
              </span>
            </label>
            {Success && (
              <span className="text-center text-emerald-500">
                your report has been sent successfully
              </span>
            )}
            <div className="flex justify-end pt-2">
              <button type="submit" className="btn-warning btn-sm btn">
                report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
