import React, { useState } from "react";
import Modal from "react-modal";
import { MenuItem, Button, Box, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import UserService from "../services/userService";

const NotificationModal = ({
  isModalOpen,
  setIsModalOpen,
  flight_id,
  userToken,
}) => {
  const [selectedNotification, setSelectedNotification] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const notificationList = ["Text", "Email", "App", "None"];

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification("");
  };

  const addOrRemoveNotification = () => {
    setIsSaveDisabled(true);
    UserService.addOrRemoveNotification({
      flight_id,
      token: userToken,
      method: selectedNotification,
    })
      .then((res) => {
        toast.success(
          res.data ? "Added for Notification." : "Removed from Notification."
        );
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setIsSaveDisabled(false);
        closeModal();
      });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={() => console.log("Modal opened")}
      style={{
        content: {
          top: "40%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        },
      }}
      contentLabel="Notification"
      appElement={document.getElementById("root")}
    >
      <button
        onClick={() => closeModal()}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "1.5em",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
      <Box mt={3} position="relative">
        <Typography variant="h4" align="center">
          Opt Notification
        </Typography>
        <Box mt={3}>
          <TextField
            select
            label="Notification Type"
            name="notificationType"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedNotification}
            onChange={(e) => {
              setSelectedNotification(e.target.value);
            }}
          >
            {notificationList.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box mt={2} display="flex" justifyContent="space-evenly">
            <Button
              variant="contained"
              color="primary"
              onClick={() => addOrRemoveNotification()}
              disabled={isSaveDisabled || !selectedNotification.length}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => closeModal()}
              disabled={isSaveDisabled}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
