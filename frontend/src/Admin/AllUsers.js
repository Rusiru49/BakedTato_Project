import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa";
import autoTable from "jspdf-autotable";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/api/users");
      setUsers(response.data.allUser);
    } catch (error) {
      console.error("Axios error: ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await Axios.post("http://localhost:5000/api/deleteUser", { _id: id });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const genpdf = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("User Details Report", 20, 20);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text(`User ID:`, 20, 40);
    doc.text(user._id, 60, 40);
    doc.text(`Username:`, 20, 50);
    doc.text(user.username, 60, 50);
    doc.text(`Email:`, 20, 60);
    doc.text(user.email, 60, 60);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);
    doc.save(`User_${user.username}.pdf`);
  };

  const genAllpdf = (users) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Users Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["User ID", "Username", "Email"]],
      body: users.map((user) => [user._id, user.username, user.email]),
      theme: "grid",
      headStyles: {
        fillColor: [210, 105, 30],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
    });

    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, pageHeight - 10);
    doc.save("All_Users_Report.pdf");
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
      {/* Total Users Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ textAlign: "center", boxShadow: 3, backgroundColor: "#1E1E1E", color: "#fff" }}>
          <CardContent>
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {users.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Export PDF Button */}
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FaFilePdf />}
          onClick={() => genAllpdf(filteredUsers)}
          sx={{
            width: "100%",
            fontWeight: "bold",
            fontSize: "0.9rem",
            py: 1.5,
            mt: 1,
          }}
        >
          Export All as PDF
        </Button>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username or email..."
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            boxShadow: 1,
          }}
        />
      </Grid>

      {/* Users Table */}
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1000,
            margin: "auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D2691E" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>User ID</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete User">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<Delete />}
                          onClick={() => deleteUser(user._id)}
                          sx={{ mr: 1 }}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                      <Tooltip title="Export PDF">
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          startIcon={<FaFilePdf />}
                          onClick={() => genpdf(user)}
                          sx={{
                            borderColor: "#4CAF50",
                            color: "#4CAF50",
                            "&:hover": {
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                            },
                          }}
                        >
                          PDF
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Users Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AllUsers;
