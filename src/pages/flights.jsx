import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import FlightService from "../services/filghtServices";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserService from "../services/userService";

const columns = [
  { id: "flight_no", label: "Flight Number", minWidth: 100 },
  { id: "airline", label: "Airline", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "departure_gate", label: "Departure Gate", minWidth: 100 },
  { id: "arrival_gate", label: "Arrival Gate", minWidth: 100 },
  {
    id: "scheduled_departure",
    label: "Scheduled Departure",
    minWidth: 100,
    align: "right",
    format: (value) => new Date(value).toLocaleString(),
  },
  {
    id: "scheduled_arrival",
    label: "Scheduled Arrival",
    minWidth: 100,
    align: "right",
    format: (value) => new Date(value).toLocaleString(),
  },
  {
    id: "actual_departure",
    label: "Actual Departure",
    minWidth: 100,
    align: "right",
    format: (value) => new Date(value).toLocaleString(),
  },
  {
    id: "actual_arrival",
    label: "Actual Arrival",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "right",
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [flights, setFlights] = useState([]);
  const [user, setUser] = useState(null);
  const [disableNotification, setDisableNotification] = useState(false);
  let intervalId;

  const fetchAllFlights = () => {
    FlightService.all()
      .then((res) => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const isAction = columns[columns.length - 1].id === "action";
          if (isAction) {
            columns.splice(-1);
          }
        }
        setFlights(res.data);
      })
      .catch((err) => {
        toast.error("An error occurred while fetching flights");
        if (intervalId) clearInterval(intervalId);
      });
  };

  const addOrRemoveNotification = (id) => {
    setDisableNotification(true);
    UserService.addOrRemoveNotification({
      token: user.token,
      flight_id: id,
      method: "text",
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
        setDisableNotification(false);
      });
  };

  useEffect(() => {
    fetchAllFlights();
    const intervalIdd = setInterval(fetchAllFlights, 5000);
    intervalId = intervalIdd;

    return () => {
      clearInterval(intervalIdd);
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = [
                        "scheduled_departure",
                        "scheduled_arrival",
                        "actual_departure",
                        "actual_arrival",
                      ].includes(column.id)
                        ? formatDate(row[column.id])
                        : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            user?.email === "admin@indigowithme.com" ? (
                              <Button
                                color="primary"
                                component={Link}
                                to={`/update-flight/${row?.id}`}
                              >
                                update
                              </Button>
                            ) : (
                              <Button
                                color="primary"
                                onClick={() => addOrRemoveNotification(row.id)}
                                disabled={disableNotification}
                              >
                                <NotificationsIcon />
                              </Button>
                            )
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={flights.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
