import * as React from "react";
import useFetch from "../../hooks/useFetch";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import "../../App.css";

export interface ContactListProps {
  setContactId: React.Dispatch<React.SetStateAction<string | undefined>>;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  created_at: string;
  changed_at: string;
  histories: Contact[];
}

export const ENDPOINT_URL = "api/contacts";

const ContactList: React.FC<ContactListProps> = ({
  setContactId,
  isFormVisible,
  setIsFormVisible,
}) => {
  const { data: contacts, loading, error } = useFetch<Contact[]>(ENDPOINT_URL);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-night">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-night">
        <h1>Error fetching data</h1>
      </div>
    );
  }
  return (
    <div className="w-1/4 mx-5 my-1  overflow-y-auto scrollable-element ">
      <List className="max-h-full">
        {contacts &&
          contacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem
                alignItems="flex-start"
                className="text-zenith border-solid   bg-dusk hover:bg-night cursor-pointer"
                onClick={() => {
                  setContactId(contact.id.toString());
                  setIsFormVisible(false);
                }}
              >
                <ListItemText
                  primary={`${contact.first_name} ${contact.last_name}`}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
      </List>
    </div>
  );
};

export default ContactList;
