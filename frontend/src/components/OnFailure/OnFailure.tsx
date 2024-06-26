import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";

export interface OnFailureProps {
  error: any;
}

const OnFailure = ({ error }: OnFailureProps) => {
  // Assuming error has a message property. Adjust based on your error object structure.
  const [errorMessage, setErrorMessage] = React.useState("");
  const message =
    error.response?.data?.message || "An unexpected error occurred";
  setErrorMessage(message);
  // Open the modal here if you're controlling its open state with a separate state variable
  return (
    // Inside your component's return statement
    <Modal
      open={!!errorMessage} // Assuming you use the presence of errorMessage to control the modal's visibility
      onClose={() => setErrorMessage("")}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
        <Typography
          id="error-modal-title"
          variant="h6"
          component="h2"
          className="font-semibold"
        >
          Error
        </Typography>
        <Typography id="error-modal-description" className="mt-2">
          {errorMessage}
        </Typography>
        <Button onClick={() => setErrorMessage("")} className="mt-5">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default OnFailure;
