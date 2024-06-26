import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../api/axios-config";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { ENDPOINT_URL } from "../ContactList/ContactList";

export interface ContactFormProps {
  contactInfo?: any;
  formType: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setContactId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  refetch: () => void;
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
  setContactId,
  refetch,
}) => {
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (contactInfo) {
      setContact({
        first_name: contactInfo.first_name || "",
        last_name: contactInfo.last_name || "",
        email: contactInfo.email || "",
        phone: contactInfo.phone || "",
      });
    }
  }, [contactInfo]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`${ENDPOINT_URL}/${contactInfo?.id}`);
      setIsEditing(false);
      setContactId && setContactId(undefined);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"flex flex-col"}>
      {!isEditing ? (
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
              <Typography variant="h6">{contact.first_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Last Name:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{contact.last_name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Email:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{contact.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                <strong>Phone:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{contact.phone}</Typography>
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

            try {
              const response = await axiosInstance[method](endpoint, values);
              console.log("Response:", response);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
              setIsEditing(false);
            }
          }}
        >
          {({ isSubmitting, resetForm, errors, touched }) => (
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
                  Submit
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
      helperText={errorText}
    />
  );
};

export default ContactForm;
