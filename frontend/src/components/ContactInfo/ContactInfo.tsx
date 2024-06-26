import * as React from "react";
import { Contact, ENDPOINT_URL } from "../ContactList/ContactList";
import {
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import ContactForm from "../ContactForm/ContactForm";

export interface ContactProps {
  contact: Contact;
  contactData: Contact[] | null;
  setContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export const ContactInfo: React.FC<ContactProps> = ({
  contact,
  isEditing,
  contactData,
  setIsEditing,
  setContact,
  setIsFormVisible,
  refetch,
}) => {
  // Improvement Fetch histories here
  const {
    data: entireContact,
    loading,
    error,
  } = useFetch<Contact>(`${ENDPOINT_URL}/${contact.id}`);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }
  if (!contactData || !contact)
    return <Typography variant="h6">Contact not found</Typography>;

  function ContactHistoryRow({
    history,
    contact,
  }: {
    history: Contact;
    contact: Contact;
  }) {
    const renderCell = (historyValue: string, contactValue: string) =>
      historyValue !== contactValue ? historyValue : "";

    const firstNameCell = renderCell(history.first_name, contact.first_name);
    const lastNameCell = renderCell(history.last_name, contact.last_name);
    const phoneCell = renderCell(history.phone, contact.phone);
    const emailCell = renderCell(history.email, contact.email);

    if (!firstNameCell && !lastNameCell && !phoneCell && !emailCell) {
      return null;
    }
    return (
      <TableRow key={history.id}>
        <TableCell>{firstNameCell}</TableCell>
        <TableCell>{lastNameCell}</TableCell>
        <TableCell>{phoneCell}</TableCell>
        <TableCell>{emailCell}</TableCell>
        {history.changed_at && (
          <TableCell>{new Date(history.changed_at).toLocaleString()}</TableCell>
        )}
      </TableRow>
    );
  }
  console.log(contact);
  return (
    <div className="flex-col w-1/2 m-3">
      <ContactForm
        contactInfo={contact}
        formType="ContactInfo"
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setContact={setContact}
        onSuccess={refetch}
        setIsFormVisible={setIsFormVisible}
      />

      {entireContact &&
        entireContact.histories &&
        entireContact.histories.length > 0 && (
          <TableContainer component={Paper} elevation={7} className="my-4">
            <Typography
              variant="h4"
              fontWeight={700}
              component="div"
              style={{ padding: 16 }}
            >
              History
            </Typography>
            <Divider />
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Last Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entireContact.histories.map((history) => (
                  <ContactHistoryRow
                    key={history.id}
                    history={history}
                    contact={contact}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </div>
  );
};

export default ContactInfo;
