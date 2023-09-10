interface ContactMessageProps {
  message: string;
  id: string;
}

const ContactMessage: React.FC<ContactMessageProps> = ({ message, id }) => {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={`my-modal${id}`} className="link-primary link">
        message
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`my-modal${id}`} className="modal-toggle" />
      <label htmlFor={`my-modal${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Message :</h3>
          <p className="py-4">{message}</p>
        </label>
      </label>
    </>
  );
};

export default ContactMessage;
