import type { contact } from "@prisma/client";
import ContactMessage from "./contact-message";
import ContactDelete from "./contact-delete";

interface ContactRowProps {
  contact: contact;
}

const ContactRow: React.FC<ContactRowProps> = ({ contact }) => {
  return (
    <>
      <tr>
        <td>{contact.fullName}</td>
        <td>{contact.email}</td>
        <td>{contact.subject}</td>
        <td>
          <ContactMessage message={contact.message} id={contact.id} />
        </td>
        <td>
          <ContactDelete id={contact.id} />
        </td>
      </tr>
    </>
  );
};

export default ContactRow;
