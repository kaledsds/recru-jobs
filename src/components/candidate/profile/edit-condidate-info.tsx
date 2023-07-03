import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import {
  type EditCondidateInfoType,
  editCondidateInfoSchema,
} from "~/validation/candidate";

//Edit candidate info
const EditCondidateInfo = () => {
  // Get candidate info
  const { data: candidate } = api.candidate.getUserCandidate.useQuery();

  // Initialize the form hook for editing the condidate info.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCondidateInfoType>({
    resolver: zodResolver(editCondidateInfoSchema),
    defaultValues: {
      fullName: candidate?.fullName,
      expertise: candidate?.expertise,
      phone: candidate?.phone,
      email: candidate?.email,
      city: candidate?.city,
      address: candidate?.address,
      postalCode: candidate?.postalCode,
    },
  });
  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);

  // Get the API context
  const ctx = api.useContext();

  // Edit candidate info mutation
  const editCondidateInfo = api.candidate.editCondidateInfo.useMutation({
    onSuccess: async () => {
      await ctx.candidate.invalidate();
      setUpdatedSuccess(true);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });

  // Submit the form
  const onSubmit = async (data: EditCondidateInfoType) => {
    await editCondidateInfo.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {/* Section title */}
      <h1 className="rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
        Condidate Info
      </h1>
      <div className="divider"></div>
      <div className="space-y-2 py-2">
        {/* Full name */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Full Name: </span>
          <input
            type="text"
            placeholder={candidate?.fullName}
            className="input-bordered input-primary input max-w-xs"
            {...register("fullName")}
          />
        </div>
        {/* Expertise */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Field of expertise: </span>
          <input
            type="text"
            placeholder={candidate?.expertise}
            className="input-bordered input-primary input max-w-xs"
            {...register("expertise")}
          />
        </div>
        {/* Phone */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Phone: </span>
          <input
            type="text"
            placeholder={candidate?.phone}
            className="input-bordered input-primary input max-w-xs"
            {...register("phone")}
          />
        </div>
        {/* E-mail */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">E-mail: </span>
          <input
            type="text"
            placeholder={candidate?.email}
            className="input-bordered input-primary input max-w-xs"
            {...register("email")}
          />
        </div>
        {/* City */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">City: </span>
          <input
            type="text"
            placeholder={candidate?.city}
            className="input-bordered input-primary input max-w-xs"
            {...register("city")}
          />
        </div>
        {/* Address */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Address: </span>
          <input
            type="text"
            placeholder={candidate?.address}
            className="input-bordered input-primary input max-w-xs"
            {...register("address")}
          />
        </div>
        {/* Postal Code */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Postal Code: </span>
          <input
            type="text"
            placeholder={candidate?.postalCode}
            className="input-bordered input-primary input max-w-xs"
            {...register("postalCode")}
          />
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <button type="submit" className="btn-primary btn-sm btn">
          submit
        </button>
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className="flex justify-center">
          {editCondidateInfo.isLoading && <Spinner />}
        </div>
        {updatedSuccess && (
          <span className="text-green-500">Updated successfully</span>
        )}
        <div>
          {errors.fullName?.message}
          {errors.expertise?.message}
          {errors.phone?.message}
          {errors.email?.message}
          {errors.city?.message}
          {errors.address?.message}
          {errors.postalCode?.message}
        </div>
      </div>
    </form>
  );
};

export default EditCondidateInfo;
