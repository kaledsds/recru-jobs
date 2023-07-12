import Head from "next/head";
import { api } from "~/utils/api";
import RecruterLayout from "~/layouts/recruter-layout";
import { PageHeader, Spinner } from "~/components/ui";
import { ClipboardSignature } from "lucide-react";
import { useForm } from "react-hook-form";
import { jobInputSchema, type JobInputType } from "~/validation/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/**
 *  PostAJob Page
 */
const PostAJob = () => {
  const { data: recruter } = api.recruter.getUserRecruter.useQuery();
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const ctx = api.useContext();

  // Initialize the form hook for creating the job post.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobInputType>({
    resolver: zodResolver(jobInputSchema),
  });
  const postJob = api.job.createJob.useMutation({
    onSuccess: async () => {
      await ctx.job.invalidate();
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
      }, 2000);
      reset();
    },
  });
  const onSubmit = async (data: JobInputType) => {
    await postJob.mutateAsync(data);
  };

  return (
    <>
      <Head>
        <title>{recruter?.fullName}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecruterLayout>
        <div className="container">
          {/* Page Header */}
          <PageHeader title="Post A Job" Icon={ClipboardSignature} />
          <div className="container">
            <div className="flex w-full">
              <div className="container card rounded-box grid flex-grow border border-primary bg-base-300">
                <div className="container py-8">
                  {/* Page noation */}
                  <div className="">
                    <p className="text:sm italic text-slate-500">
                      NOTE: Please fill out the job form below to post the job
                      and allow candidates to apply. Your assistance is greatly
                      appreciated in helping us finding the right talent for
                      you!
                    </p>
                  </div>
                  <div className="divider"></div>
                  {/* FORM */}
                  <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="container grid grid-cols-2 py-2">
                      {/* Form Col 1 */}
                      <div className="container space-y-4">
                        {/* Job Title */}
                        <div className="container flex flex-col gap-1.5">
                          <label className="pl-1 font-bold" htmlFor="jobTitle">
                            Job Title :{" "}
                          </label>
                          <input
                            id="jobTitle"
                            type="text"
                            placeholder="Type here"
                            className="input-bordered input-primary input w-full"
                            {...register("title")}
                          />
                        </div>
                        {/* Job Type */}
                        <div className="container flex flex-col gap-1.5">
                          <label className="pl-1 font-bold" htmlFor="jobType">
                            Job Type :{" "}
                          </label>
                          <select
                            id="jobType"
                            className="select-primary select w-full"
                            {...register("type")}
                          >
                            <option>Full Time</option>
                            <option>Half Time</option>
                            <option>Freelance</option>
                            <option>Temporary</option>
                          </select>
                        </div>
                        {/* Hours of Work */}
                        <div className="container flex flex-col gap-1.5">
                          <label
                            className="pl-1 font-bold"
                            htmlFor="hoursOfWork"
                          >
                            Hours of work :{" "}
                          </label>
                          <input
                            id="hoursOfWork"
                            type="text"
                            placeholder="Type here"
                            className="input-bordered input-primary input w-full"
                            {...register("hoursofwork")}
                          />
                        </div>
                      </div>
                      {/* Form Col 2 */}
                      {/* Job Location */}
                      <div className="container space-y-4">
                        <div className="container flex flex-col gap-1.5">
                          <label
                            className="pl-1 font-bold"
                            htmlFor="jobLocation"
                          >
                            Job Location :{" "}
                          </label>
                          <input
                            id="jobLocation"
                            type="text"
                            placeholder="Type here"
                            className="input-bordered input-primary input w-full"
                            {...register("location")}
                          />
                        </div>
                        {/* Years Of Experience */}
                        <div className="container flex flex-col gap-1.5">
                          <label
                            className="pl-1 font-bold"
                            htmlFor="yearsOfExperience"
                          >
                            Years Of Experience :{" "}
                          </label>
                          <select
                            id="yearsOfExperience"
                            className="select-primary select w-full"
                            {...register("yearsOfExperience")}
                          >
                            <option>Less then one year</option>
                            <option>1 year</option>
                            <option>2 years</option>
                            <option>3 years</option>
                            <option>4 years</option>
                            <option>5 years plus</option>
                          </select>
                        </div>
                        {/* Salary */}
                        <div className="container flex flex-col gap-1.5">
                          <label className="pl-1 font-bold" htmlFor="salary">
                            Salary :{" "}
                          </label>
                          <input
                            id="salary"
                            type="text"
                            placeholder="Type here"
                            className="input-bordered input-primary input w-full"
                            {...register("salary")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Job Description */}
                    <div className="container py-4">
                      <div className="flex flex-col gap-1.5 px-12">
                        <label
                          className="pl-1 font-bold"
                          htmlFor="jobDescription"
                        >
                          Job Description:{" "}
                        </label>
                        <textarea
                          id="jobDescription"
                          className="textarea-primary textarea h-36"
                          placeholder="Bio"
                          {...register("description")}
                        ></textarea>
                      </div>
                    </div>
                    <div className="divider"></div>
                    {/* Submit btn */}
                    <div className="flex items-center justify-center">
                      <button type="submit" className="btn-primary btn">
                        post
                      </button>
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <div className="flex justify-center">
                        {postJob.isLoading && <Spinner />}
                      </div>
                      {successMsg && (
                        <span className="flex justify-center text-green-500">
                          Updated successfully
                        </span>
                      )}
                      <div className="flex items-center justify-center text-red-600">
                        {errors.title?.message}
                        {errors.description?.message}
                        {errors.yearsOfExperience?.message}
                        {errors.type?.message}
                        {errors.salary?.message}
                        {errors.hoursofwork?.message}
                        {errors.location?.message}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RecruterLayout>
    </>
  );
};

export default PostAJob;
