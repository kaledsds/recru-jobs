import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import {
  type EditCondidateSocialsType,
  editCondidateSocialsSchema,
} from "~/validation/candidate";

// Edit candidate socials
const EditCondidateSocials = () => {
  // Get candidate Socials
  const { data: candidate } = api.candidate.getUserCandidate.useQuery();

  // Initialize the form hook for editing the condidate socials.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCondidateSocialsType>({
    resolver: zodResolver(editCondidateSocialsSchema),
    defaultValues: {
      linkedIn: candidate?.linkedIn?.toString(),
      twitter: candidate?.twitter?.toString(),
      facebook: candidate?.facebook?.toString(),
      instagram: candidate?.instagram?.toString(),
      github: candidate?.github?.toString(),
      website: candidate?.website?.toString(),
    },
  });

  // Update success state
  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);

  // Get the API context
  const ctx = api.useContext();

  // Edit candidate socials mutation
  const editSocials = api.candidate.editCondidateSocials.useMutation({
    onSuccess: async () => {
      await ctx.candidate.invalidate();
      setUpdatedSuccess(true);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });

  // Submit the form
  const onSubmit = async (data: EditCondidateSocialsType) => {
    await editSocials.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 py-2">
      {/* LinkedIn */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">LinkedIn: </span>
        {(candidate?.linkedIn && (
          <input
            type="text"
            placeholder={candidate?.linkedIn}
            className="input-bordered input-primary input w-full"
            {...register("linkedIn")}
          />
        )) || (
          <input
            type="text"
            placeholder="LinkedIn"
            className="input-bordered input-primary input w-full"
            {...register("linkedIn")}
          />
        )}
      </div>
      {/* Twitter */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">Twitter: </span>
        {(candidate?.twitter && (
          <input
            type="text"
            placeholder={candidate?.twitter}
            className="input-bordered input-primary input w-full"
            {...register("twitter")}
          />
        )) || (
          <input
            type="text"
            placeholder="Twitter"
            className="input-bordered input-primary input w-full"
            {...register("twitter")}
          />
        )}
      </div>
      {/* Facebook */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">Facebook: </span>
        {(candidate?.facebook && (
          <input
            type="text"
            placeholder={candidate?.facebook}
            className="input-bordered input-primary input w-full"
            {...register("facebook")}
          />
        )) || (
          <input
            type="text"
            placeholder="Facebook"
            className="input-bordered input-primary input w-full"
            {...register("facebook")}
          />
        )}
      </div>
      {/* Instagram */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">Instagram: </span>
        {(candidate?.instagram && (
          <input
            type="text"
            placeholder={candidate?.instagram}
            className="input-bordered input-primary input w-full"
            {...register("instagram")}
          />
        )) || (
          <input
            type="text"
            placeholder="Instagram"
            className="input-bordered input-primary input w-full"
            {...register("instagram")}
          />
        )}
      </div>
      {/* Github */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">Github: </span>
        {(candidate?.github && (
          <input
            type="text"
            placeholder={candidate?.github}
            className="input-bordered input-primary input w-full"
            {...register("github")}
          />
        )) || (
          <input
            type="text"
            placeholder="Github"
            className="input-bordered input-primary input w-full"
            {...register("github")}
          />
        )}
      </div>
      {/* Web Site */}
      <div className="flex items-center justify-between gap-5 text-lg">
        <span className="font-semibold">Web Site: </span>
        {(candidate?.website && (
          <input
            type="text"
            placeholder={candidate?.website}
            className="input-bordered input-primary input w-full"
            {...register("website")}
          />
        )) || (
          <input
            type="text"
            placeholder="Web Site"
            className="input-bordered input-primary input w-full"
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
          {errors.github?.message}
          {errors.website?.message}
        </div>
      </div>
    </form>
  );
};

export default EditCondidateSocials;
