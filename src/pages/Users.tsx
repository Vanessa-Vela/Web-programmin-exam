import { useState } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface SimpleUser {
  id: number;
  name: string;
}

export function Users() {
    const [users, setUsers] = useLocalStorage<SimpleUser[]>('usersList', []);
    const [name, setName] = useState('');

    const handleAdd = () => {
        if (!name) return; 
        const newUser: SimpleUser = { id: Date.now(), name: name };
        setUsers([...users, newUser]);
        setName('');
    }

    const handleDelete = (id: number) => {
        const updateUsers = users.filter(user => user.id !== id);
        setUsers(updateUsers);
    }

    return (
        <Paper sx={{ p: 4 }}>
            <Box sx={{ p: 3, gap: 2, display: 'flex', alignItems: 'center' }}>
                <TextField 
                  label="User Name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  size="small" 
                />
                <Button variant="contained" onClick={handleAdd}>Add</Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> Actions </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                No users found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}