import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";
import {
  type EditRecruiterInfoType,
  editRecruiterInfoSchema,
} from "~/validation/recruter";

/**
 * Edit recruiter info
 * @returns Edit recruiter info
 */
const EditRecruiterInfo = () => {
  // Get recruter info
  const { data: recruter } = api.recruter.getUserRecruter.useQuery();
  // Initialize the form hook for editing the recruter info.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRecruiterInfoType>({
    resolver: zodResolver(editRecruiterInfoSchema),
    defaultValues: {
      fullName: recruter?.fullName || undefined,
      orgName: recruter?.orgName || undefined,
      phone: recruter?.phone,
      email: recruter?.email,
      city: recruter?.city,
      address: recruter?.address,
      postalCode: recruter?.postalCode,
    },
  });
  // Update success state
  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);
  // Get the API context
  const ctx = api.useContext();
  // Edit recruter info mutation
  const editRecruiterInfo = api.recruter.editRecruiterInfo.useMutation({
    onSuccess: async () => {
      await ctx.recruter.invalidate();
      setUpdatedSuccess(true);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });
  // Submit the form
  const onSubmit = async (data: EditRecruiterInfoType) => {
    await editRecruiterInfo.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {/* Section title */}
      <h1 className="rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
        Recruiter Info
      </h1>
      <div className="divider"></div>
      <div className="space-y-2 py-2">
        {/* Full name or Organization name */}
        {(recruter?.isOrganization === true && (
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold">Full Name: </span>
            <input
              type="text"
              placeholder={recruter?.orgName || undefined}
              className="input-bordered input-primary input max-w-xs"
              {...register("orgName")}
            />
          </div>
        )) || (
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold">Full Name: </span>
            <input
              type="text"
              placeholder={recruter?.fullName || undefined}
              className="input-bordered input-primary input max-w-xs"
              {...register("fullName")}
            />
          </div>
        )}
        {/* Phone */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Phone: </span>
          <input
            type="text"
            placeholder={recruter?.phone}
            className="input-bordered input-primary input max-w-xs"
            {...register("phone")}
          />
        </div>
        {/* E-mail */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">E-mail: </span>
          <input
            type="text"
            placeholder={recruter?.email}
            className="input-bordered input-primary input max-w-xs"
            {...register("email")}
          />
        </div>
        {/* City */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">City: </span>
          <input
            type="text"
            placeholder={recruter?.city}
            className="input-bordered input-primary input max-w-xs"
            {...register("city")}
          />
        </div>
        {/* Address */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Address: </span>
          <input
            type="text"
            placeholder={recruter?.address}
            className="input-bordered input-primary input max-w-xs"
            {...register("address")}
          />
        </div>
        {/* Postal Code */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Postal Code: </span>
          <input
            type="text"
            placeholder={recruter?.postalCode}
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
          {editRecruiterInfo.isLoading && <Spinner />}
        </div>
        {updatedSuccess && (
          <span className="text-green-500">Updated successfully</span>
        )}
        <div>
          {errors.fullName?.message}
          {errors.orgName?.message}
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

export default EditRecruiterInfo;
