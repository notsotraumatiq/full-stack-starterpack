import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../api/axios-config";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { Contact, ENDPOINT_URL } from "../ContactList/ContactList";
import onFailure from "../OnFailure/OnFailure";

export interface ContactFormProps {
  contactInfo?: any;
  formType: string;

  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
  onSuccess: () => void;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the validation schema using Yup
const contactSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+?[0-9]+(\.[0-9]+)?$/,
      "Must be a number and can include '+' or '.'"
    )
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Phone is required"),
});

const ContactForm: React.FC<ContactFormProps> = ({
  contactInfo,
  formType,
  isEditing,
  setIsEditing,
  setContact,
  onSuccess,
  setIsFormVisible,
}) => {
  const [singleContact, setSingleContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (contactInfo) {
      setSingleContact({
        first_name: contactInfo.first_name || "",
        last_name: contactInfo.last_name || "",
        email: contactInfo.email || "",
        phone: contactInfo.phone || "",
      });
    }
  }, [contactInfo]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`${ENDPOINT_URL}/${contactInfo?.id}`);
      setIsEditing(false);
      setSingleContact({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });
      setContact(undefined);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      onFailure(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={"flex flex-col"}>
      {isLoading ? (
        <CircularProgress className="mx-auto" />
      ) : !isEditing ? (
        <Paper elevation={3} className="px-4">
          <Typography
            variant="h4"
            fontWeight={700}
            component="div"
            className="py-2"
          >
            {formType}
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>First Name:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{singleContact.first_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Last Name:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{singleContact.last_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Email:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{singleContact.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Phone:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{singleContact.phone}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            sx={{ my: 2 }}
          >
            Edit
          </Button>
        </Paper>
      ) : (
        <Formik
          initialValues={{
            first_name: contactInfo?.first_name || "",
            last_name: contactInfo?.last_name || "",
            email: contactInfo?.email || "",
            phone: contactInfo?.phone || "",
          }}
          validationSchema={contactSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const endpoint = contactInfo?.id
              ? `${ENDPOINT_URL}/${contactInfo.id}`
              : ENDPOINT_URL;
            const method = contactInfo?.id ? "put" : "post";

            setIsLoading(true);
            try {
              const response = await axiosInstance[method](endpoint, values);
              setContact(response.data);
              onSuccess();
            } catch (error: any) {
              console.error(error);
              onFailure(error);
            } finally {
              setSubmitting(false);
              setIsEditing(false);
              setIsFormVisible(false);
              setIsLoading(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Paper elevation={2} className="p-3 mt-3">
              <Typography
                variant="h4"
                fontWeight={700}
                component="div"
                className="py-2"
              >
                {formType}
              </Typography>
              <Divider />
              <Form>
                <Field
                  component={CustomTextField}
                  name="first_name"
                  type="text"
                  label="First Name"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={CustomTextField}
                  name="last_name"
                  type="text"
                  label="Last Name"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={CustomTextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={CustomTextField}
                  name="phone"
                  type="text"
                  label="Phone"
                  fullWidth
                  margin="normal"
                />
                <Button
                  startIcon={<SendIcon />}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {contactInfo?.id ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Cancel
                </Button>
                {contactInfo?.id && (
                  <Button
                    startIcon={<DeleteIcon />}
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleDelete}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Delete
                  </Button>
                )}
              </Form>
            </Paper>
          )}
        </Formik>
      )}
    </div>
  );
};

const CustomTextField: React.FC<FieldProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorText = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      error={!!errorText}
      helperText={errorText ? errorText.toString() : ""}
    />
  );
};

export default ContactForm;
