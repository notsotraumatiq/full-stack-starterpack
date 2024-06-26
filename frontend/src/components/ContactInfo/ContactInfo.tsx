import * as React from "react";
import { Contact, ENDPOINT_URL } from "../ContactList/ContactList";
import axiosInstance from "../../api/axios-config";
import {
  CircularProgress,
  TextField,
  Typography,
  Button,
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
  contactId: string;
  onDeleteSuccess: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactInfo: React.FC<ContactProps> = ({
  contactId,
  onDeleteSuccess,
  isEditing,
  setIsEditing,
}) => {
  const {
    data: contactData,
    loading,
    error,
    refetch,
  } = useFetch<Contact>(`${ENDPOINT_URL}/${contactId}`);
  const [contact, setContact] = React.useState<Contact>();
  React.useEffect(() => {
    if (contactData) setContact(contactData);
  }, [contactData]);

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

  return (
    <div className="flex-col w-1/2 m-3">
      <ContactForm
        contactInfo={contact}
        formType="ContactInfo"
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        refetch={refetch}
      />

      {contact && contact.histories && contact.histories.length > 0 && (
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
          <Table className="" aria-label="simple table">
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
              {contact.histories.map((history) => (
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
