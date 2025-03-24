import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/users');
            setUsers(response.data.allUser);
        } catch (error) {
            console.error("Axios error: ", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await Axios.post('http://localhost:5000/api/deleteUser', { _id: id });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            console.log('user deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 5, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
            <Table>
                {/* Table Head */}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#D2691E" }}>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>User ID</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Username</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
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
                                    <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </Button>
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
    )
}

export default AllUsers
