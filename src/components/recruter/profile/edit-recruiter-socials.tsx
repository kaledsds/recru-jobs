import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import {
  type EditRecruiterSocialsType,
  editRecruiterSocialsSchema,
} from "~/validation/recruter";
/**
 * Edit recruiter socials
 * @returns Edit recruiter socials
 */
const EditRecruiterSocials = () => {
  //Get recruter socials
  const { data: recruter } = api.recruter.getUserRecruter.useQuery();
  // Initialize the form hook for editing the recruter socials.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRecruiterSocialsType>({
    resolver: zodResolver(editRecruiterSocialsSchema),
    defaultValues: {
      linkedIn: recruter?.linkedIn?.toString(),
      twitter: recruter?.twitter?.toString(),
      facebook: recruter?.facebook?.toString(),
      instagram: recruter?.instagram?.toString(),
      website: recruter?.website?.toString(),
    },
  });
  // Update success state
  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);
  // Get the API context
  const ctx = api.useContext();

  // Edit recruter socials mutation
  const editSocials = api.recruter.editRecruiterSocials.useMutation({
    onSuccess: async () => {
      await ctx.recruter.invalidate();
      setUpdatedSuccess(true);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });

  // Submit the form
  const onSubmit = async (data: EditRecruiterSocialsType) => {
    await editSocials.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {/* Section title */}
      <h1 className="rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
        Recruiter Socials
      </h1>
      <div className="divider"></div>
      {/* LinkedIn */}
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between gap-5 text-lg">
          <span className="font-semibold">LinkedIn: </span>
          {(recruter?.linkedIn && (
            <input
              type="text"
              placeholder={recruter?.linkedIn}
              className="input-bordered input-primary input max-w-xs"
              {...register("linkedIn")}
            />
          )) || (
            <input
              type="text"
              placeholder="LinkedIn"
              className="input-bordered input-primary input max-w-xs"
              {...register("linkedIn")}
            />
          )}
        </div>
        {/* Twitter */}
        <div className="flex items-center justify-between gap-5 text-lg">
          <span className="font-semibold">Twitter: </span>
          {(recruter?.twitter && (
            <input
              type="text"
              placeholder={recruter?.twitter}
              className="input-bordered input-primary input max-w-xs"
              {...register("twitter")}
            />
          )) || (
            <input
              type="text"
              placeholder="Twitter"
              className="input-bordered input-primary input max-w-xs"
              {...register("twitter")}
            />
          )}
        </div>
        {/* Facebook */}
        <div className="flex items-center justify-between gap-5 text-lg">
          <span className="font-semibold">Facebook: </span>
          {(recruter?.facebook && (
            <input
              type="text"
              placeholder={recruter?.facebook}
              className="input-bordered input-primary input max-w-xs"
              {...register("facebook")}
            />
          )) || (
            <input
              type="text"
              placeholder="Facebook"
              className="input-bordered input-primary input max-w-xs"
              {...register("facebook")}
            />
          )}
        </div>
        {/* Instagram */}
        <div className="flex items-center justify-between gap-5 text-lg">
          <span className="font-semibold">Instagram: </span>
          {(recruter?.instagram && (
            <input
              type="text"
              placeholder={recruter?.instagram}
              className="input-bordered input-primary input max-w-xs"
              {...register("instagram")}
            />
          )) || (
            <input
              type="text"
              placeholder="Instagram"
              className="input-bordered input-primary input max-w-xs"
              {...register("instagram")}
            />
          )}
        </div>
        {/* Web Site */}
        <div className="flex items-center justify-between gap-5 text-lg">
          <span className="font-semibold">Web Site: </span>
          {(recruter?.website && (
            <input
              type="text"
              placeholder={recruter?.website}
              className="input-bordered input-primary input max-w-xs"
              {...register("website")}
            />
          )) || (
            <input
              type="text"
              placeholder="Web Site"
              className="input-bordered input-primary input max-w-xs"
              {...register("website")}
            />
          )}
        </div>
        <div className="divider"></div>
        <div className="flex justify-center">
          <button className="btn-primary btn-sm btn">submit</button>
        </div>
        <div className="flex flex-col justify-center p-4">
          <div className="flex justify-center">
            {editSocials.isLoading && <Spinner />}
          </div>
          {updatedSuccess && (
            <span className="flex justify-center text-green-500">
              Updated successfully
            </span>
          )}
          <div>
            {errors.linkedIn?.message}
            {errors.twitter?.message}
            {errors.facebook?.message}
            {errors.instagram?.message}
            {errors.website?.message}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditRecruiterSocials;
