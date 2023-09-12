interface ReportReasonProps {
  reason: string;
  id: string;
}

const ReportReason: React.FC<ReportReasonProps> = ({ reason, id }) => {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={`my-reason${id}`} className="link-primary link">
        reason
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`my-reason${id}`} className="modal-toggle" />
      <label htmlFor={`my-reason${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">reason :</h3>
          <p className="py-4">{reason}</p>
        </label>
      </label>
    </>
  );
};

export default ReportReason;
