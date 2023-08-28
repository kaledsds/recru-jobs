import { zodResolver } from "@hookform/resolvers/zod";
import { type Gig } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import { type EditGigInputType, editGigInputSchema } from "~/validation/gig";

interface EditGigPostProps {
  gigPost: Gig;
}

const EditGigPost: React.FC<EditGigPostProps> = ({ gigPost }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGigInputType>({
    resolver: zodResolver(editGigInputSchema),
    defaultValues: {
      id: gigPost.id,
      title: gigPost.title,
      category: gigPost.category,
      serviceType: gigPost.serviceType,
      salary: gigPost.salary,
    },
  });

  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);
  const ctx = api.useContext();

  const EditGigPost = api.gig.editGigPost.useMutation({
    onSuccess: async () => {
      await ctx.gig.invalidate();
      setUpdatedSuccess(true);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });

  const onSubmit = (data: EditGigInputType) => {
    EditGigPost.mutate({
      id: data.id,
      title: data.title,
      category: data.category,
      serviceType: data.serviceType,
      salary: data.salary,
    });
  };

  return (
    <div className="container">
      <div className="flex w-full">
        <div className="container card rounded-box grid flex-grow border border-primary bg-base-300">
          <div className="container py-8">
            {/* Page noation */}
            <div className="">
              <p className="text:sm italic text-slate-500">
                NOTE: Kindly take a moment to complete the gig form provided
                below. This will allow us to showcase your gig and give talented
                individuals the chance to jump on board. Your support in aiding
                us to discover the perfect match is immensely valued!
              </p>
            </div>
            <div className="divider"></div>
            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container grid grid-cols-2 py-2">
                {/* Form Col 1 */}
                <div className="container space-y-4">
                  {/* Job Title */}
                  <div className="container flex flex-col gap-1.5">
                    <label className="pl-1 font-bold" htmlFor="gigTitle">
                      Gig Title :{" "}
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      placeholder="Type here"
                      className="input-bordered input-primary input w-full"
                      {...register("title")}
                    />
                  </div>
                  {/* Category */}
                  <div className="container flex flex-col gap-1.5">
                    <label className="pl-1 font-bold" htmlFor="category">
                      Category :{" "}
                    </label>
                    <input
                      id="category"
                      type="text"
                      placeholder="Type here"
                      className="input-bordered input-primary input w-full"
                      {...register("category")}
                    />
                  </div>
                </div>
                {/* Form Col 2 */}
                {/* Job Location */}
                <div className="container space-y-4">
                  <div className="container flex flex-col gap-1.5">
                    <label className="pl-1 font-bold" htmlFor="jobLocation">
                      Service Type :{" "}
                    </label>
                    <input
                      id="serviceType"
                      type="text"
                      placeholder="Type here"
                      className="input-bordered input-primary input w-full"
                      {...register("serviceType")}
                    />
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
              <div className="divider"></div>
              {/* Submit btn */}
              <div className="flex items-center justify-center">
                <button type="submit" className="btn-primary btn">
                  post
                </button>
              </div>
              <div className="flex flex-col justify-center p-4">
                <div className="flex justify-center">
                  {EditGigPost.isLoading && <Spinner />}
                </div>
                {updatedSuccess && (
                  <span className="flex justify-center text-green-500">
                    Updated successfully
                  </span>
                )}
                <div className="flex items-center justify-center text-red-600">
                  {errors.title?.message}
                  {errors.category?.message}
                  {errors.serviceType?.message}
                  {errors.salary?.message}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGigPost;
