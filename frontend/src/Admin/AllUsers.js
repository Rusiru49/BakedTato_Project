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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa";
import autoTable from "jspdf-autotable";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
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
      console.log("user deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const genpdf = (user) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("User Details Report", 20, 20);

    // Divider Line
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // User Details
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);

    doc.text(`User ID:`, 20, 40);
    doc.text(user._id, 60, 40);

    doc.text(`Username:`, 20, 50);
    doc.text(user.username, 60, 50);

    doc.text(`Email:`, 20, 60);
    doc.text(user.email, 60, 60);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);

    // Save the PDF
    doc.save(`User_${user.username}.pdf`);
  };

  const genAllpdf = (users) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("All Users Report", 14, 22);

    // Call autoTable correctly
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

    // Footer
    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      pageHeight - 10,
    );

    doc.save("All_Users_Report.pdf");
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
      {/* Total Users Card */}
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Users
            </Typography>
            <Typography variant="h4" color="text.secondary" sx={{ fontWeight: "bold" }}>
              {users.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Export PDF Button */}
      <Grid item xs={12} sm={8} md={6}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<FaFilePdf />}
          onClick={() => genAllpdf(users)}
          sx={{
            width: "100%",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "0.8rem",
            px: 2,
            py: 0.5,
            marginTop: "20px",
          }}
        >
          Export All as PDF
        </Button>
      </Grid>

      {/* Users Table */}
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1000,
            margin: "auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D2691E" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  User ID
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Username
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="error"
                        startIcon={<FaFilePdf />}
                        style={{ marginLeft: "5px" }}
                        onClick={() => genpdf(user)}
                      />
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
