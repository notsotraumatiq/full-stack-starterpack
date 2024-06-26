import * as React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import "../../App.css";

export interface ContactListProps {
  contacts: Contact[] | null;
  setContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
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
  contacts,
  setContact,
  setIsFormVisible,
}) => {
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
                  setContact(contact);
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
