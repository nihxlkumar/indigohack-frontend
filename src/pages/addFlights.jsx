import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FlightService from "../services/filghtServices";

const AddFlight = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [flightData, setFlightData] = useState({
    id: "",
    flight_no: "",
    airline: "",
    status: "",
    departure_gate: "",
    arrival_gate: "",
    scheduled_departure: "",
    scheduled_arrival: "",
    actual_departure: "",
    actual_arrival: "",
  });

  const resetFlightData = () => {
    setFlightData({
      id: "",
      flight_no: "",
      airline: "",
      status: "",
      departure_gate: "",
      arrival_gate: "",
      scheduled_departure: "",
      scheduled_arrival: "",
      actual_departure: "",
      actual_arrival: "",
    });
  };

  const airlines = [
    "IndiGo",
    "Air India",
    "SpiceJet",
    "GoAir",
    "AirAsia India",
    "Vistara",
  ];

  const statuses = ["On Time", "Delayed", "Cancelled"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevState) => ({
      ...prevState,
      [name]: name === "flight_no" ? value.toUpperCase() : value,
    }));
  };

  const formatDateToCustomString = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    };
    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const parts = formatter.formatToParts(date);
    const year = parts.find((part) => part.type === "year").value;
    const month = parts.find((part) => part.type === "month").value;
    const day = parts.find((part) => part.type === "day").value;
    const hour = parts.find((part) => part.type === "hour").value;
    const minute = parts.find((part) => part.type === "minute").value;

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const handleSaveFlight = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("User Not Found");
      return;
    }

    const token = JSON.parse(user).token;

    if (params.id) {
      FlightService.updateFlight({ ...flightData, token })
        .then((res) => {
          toast.success("Flight Updated Successfully");
          resetFlightData();
          navigate("/");
        })
        .catch((err) => {
          toast.error("Failed to update flight");
        });
    } else {
      delete flightData.id;
      FlightService.addFlight({ ...flightData, token })
        .then((res) => {
          toast.success("Flight Added Successfully");
          resetFlightData();
          navigate("/");
        })
        .catch((err) => {
          toast.error("Failed to add flight");
        });
    }
  };

  const isFormValid = () => {
    return (
      flightData.flight_no &&
      flightData.airline &&
      flightData.status &&
      flightData.departure_gate &&
      flightData.arrival_gate &&
      flightData.scheduled_departure &&
      flightData.scheduled_arrival
    );
  };

  useEffect(() => {
    if (params.id) {
      FlightService.getFlightDetails(params.id)
        .then((res) => {
          if (res?.data) {
            setFlightData(res.data);
            setFlightData({
              ...res.data,
              scheduled_departure: formatDateToCustomString(
                res.data.scheduled_departure
              ),
              scheduled_arrival: formatDateToCustomString(
                res.data.scheduled_arrival
              ),
              actual_departure: res.data.actual_departure
                ? formatDateToCustomString(res.data.actual_departure)
                : null,
              actual_arrival: res.data.actual_arrival
                ? formatDateToCustomString(res.data.actual_arrival)
                : null,
            });
          }
        })
        .catch((err) => {
          toast.error("Failed to fetch flight");
        });
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Box mt={3}>
          <Typography variant="h4" align="center">
            {params.id ? "Update Flight" : "Add Flight"}
          </Typography>
          <Box mt={3}>
            <TextField
              label="Flight Number"
              name="flight_no"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.flight_no}
              onChange={handleChange}
            />
            <TextField
              select
              label="Airline"
              name="airline"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.airline}
              onChange={handleChange}
            >
              {airlines.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              name="status"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.status}
              onChange={handleChange}
            >
              {statuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Arrival Gate"
              name="arrival_gate"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.arrival_gate}
              onChange={handleChange}
            />
            <TextField
              label="Departure Gate"
              name="departure_gate"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.departure_gate}
              onChange={handleChange}
            />
            <TextField
              label="Scheduled Arrival"
              name="scheduled_arrival"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.scheduled_arrival}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Scheduled Departure"
              name="scheduled_departure"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.scheduled_departure}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Actual Arrival"
              name="actual_arrival"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.actual_arrival}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Actual Departure"
              name="actual_departure"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              value={flightData.actual_departure}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveFlight}
                disabled={!isFormValid()}
              >
                {params.id ? "Update" : "Add"} Flight
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddFlight;
