import { useState } from "react";
import "./App.css";
import ContactList, {
  Contact,
  ENDPOINT_URL,
} from "./components/ContactList/ContactList";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import { Button, CircularProgress } from "@mui/material";
import ContactForm from "./components/ContactForm/ContactForm";
import AddIcon from "@mui/icons-material/Add"; // Import the AddIcon component
import RemoveIcon from "@mui/icons-material/Remove"; // Import the RemoveIcon component

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useFetch from "./hooks/useFetch";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [contact, setContact] = useState<Contact>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    data: contacts,
    loading,
    error,
    refetch,
  } = useFetch<Contact[]>(ENDPOINT_URL) || [];

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
              setContact(undefined);
              setIsFormVisible(!isFormVisible);
            }}
          >
            {isFormVisible ? "Cancel" : "Create New Contact"}
          </Button>
        </nav>
        <div className="flex-1 flex h-[calc(100vh-112px)]">
          <ContactList
            contacts={contacts}
            setContact={setContact}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
          />
          {contact && (
            <ContactInfo
              contact={contact}
              contactData={contacts}
              refetch={refetch}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setContact={setContact}
              setIsFormVisible={setIsFormVisible}
            />
          )}
          {isFormVisible && (
            <ContactForm
              formType={"Add New Contact"}
              isEditing={true}
              setContact={setContact}
              setIsEditing={setIsEditing}
              setIsFormVisible={setIsFormVisible}
              onSuccess={refetch}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
