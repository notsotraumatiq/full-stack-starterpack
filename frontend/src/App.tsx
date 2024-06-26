import { useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import { Button, IconButton } from "@mui/material";
import ContactForm from "./components/ContactForm/ContactForm";
import AddIcon from "@mui/icons-material/Add"; // Import the AddIcon component
import RemoveIcon from "@mui/icons-material/Remove"; // Import the RemoveIcon component

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [contactId, setContactId] = useState<string>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="flex flex-col  w-screen h-screen">
        <nav className="w-full text-start">
          <h1 className="text-4xl font-bold m-3">Welcome to Atiqs Phonebook</h1>
          <Button
            startIcon={isFormVisible ? <RemoveIcon /> : <AddIcon />}
            variant="contained"
            style={{
              margin: "0 1rem",
              display: "inline-block",
              padding: "0.5rem",
            }}
            size="large"
            color="primary"
            onClick={() => {
              setContactId(undefined);
              setIsFormVisible(!isFormVisible);
            }}
          >
            {isFormVisible ? "Cancel" : "Create New Contact"}
          </Button>
        </nav>
        <div className="flex-1 flex h-[calc(100vh-112px)]">
          <ContactList
            setContactId={setContactId}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
          />
          {contactId && (
            <ContactInfo
              contactId={contactId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
          {isFormVisible && (
            <ContactForm
              formType={"Add New Contact"}
              isEditing={true}
              setContactId={setContactId}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
