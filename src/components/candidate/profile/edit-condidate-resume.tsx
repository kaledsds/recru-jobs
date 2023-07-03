import { api } from "~/utils/api";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import { type FormEvent, useState } from "react";
import { uploadPDFService } from "~/services/uploadPDF";
import { Spinner } from "~/components/ui";

// Edit candidate resume
const EditCondidateResume = () => {
  // Get candidate info
  const { data: candidate } = api.candidate.getUserCandidate.useQuery();
  // Get resume
  const resume = candidate?.resume as string;
  // Selected File
  const [selectedFile, setSelectedFile] = useState<File>();
  // Loading State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Update success state
  const [updatedSuccess, setUpdatedSuccess] = useState<boolean>(false);

  // Submit the form
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent Defaults
    e.preventDefault();
    // If File Not Selected
    if (!selectedFile) {
      return;
    }
    // Start Loading
    setIsLoading(true);
    // Upload The File
    const url = await uploadPDFService(selectedFile);
    if (url) {
      // Create Resume
      editResume.mutate({ resume: url });
    }
  };
  // Edit candidate resume mutation
  const editResume = api.candidate.editCondidateResume.useMutation({
    onSuccess: () => {
      setUpdatedSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        setUpdatedSuccess(false);
      }, 2000);
    },
  });

  return (
    <div className="container card rounded-box grid flex-grow border border-primary bg-base-300 py-7">
      <div className="divider"></div>
      <h1 className="flex justify-center rounded-lg bg-primary py-2 text-xl font-bold text-slate-100">
        Resume
      </h1>
      <div className="divider"></div>
      <div className="flex w-full justify-center">
        <div className="flex w-[300px] justify-center">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.js">
            <Viewer fileUrl={resume} />
          </Worker>
        </div>
      </div>
      <div className="divider"></div>
      <form onSubmit={(e) => void onSubmit(e)} className="">
        <label htmlFor="pdf" className="pb-2 font-semibold">
          Select your resume:
        </label>
        <input
          className="file-input-bordered file-input-primary file-input w-full"
          id="pdf"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
        <div className="divider"></div>
        <div className="flex justify-center">
          <button type="submit" className="btn-primary btn-sm btn">
            submit
          </button>
        </div>
        <div className="flex flex-col justify-center p-4">
          <div className="flex justify-center">{isLoading && <Spinner />}</div>
          {updatedSuccess && (
            <span className="flex justify-center text-green-500">
              Updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditCondidateResume;
