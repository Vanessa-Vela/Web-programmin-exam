import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AddUserModal, type UserData } from '../components/AddUserModal';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, 
         Button, TextField, Checkbox, Toolbar, Box} from '@mui/material';

interface User extends UserData {
  id: number;
}

export const ComplexTable = () => {
  const [users, setUsers] = useLocalStorage<User[]>('users_db', []);
  const [nextId, setNextId] = useLocalStorage<number>('next_id', 1);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]); 

  const filteredUsers = useMemo(() => {
    return users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const handleAdd = (userData: UserData) => {
    const newUser: User = { 
      id: nextId, 
      name: userData.name, 
      age: userData.age 
    };
    
    setUsers([...users, newUser]);
    setNextId(nextId + 1);
    setOpen(false); 
  };

  const handleDelete = () => {
    setUsers(users.filter(u => !selected.includes(u.id)));
    setSelected([]);
  };

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <TextField 
          label="Search..." size="small" 
          onChange={e => setSearch(e.target.value)} 
        />
        <Box>
          <Button 
            variant="outlined" color="error" 
            disabled={selected.length === 0} 
            onClick={handleDelete} 
            sx={{ mr: 2 }}
          >
            Delete ({selected.length})
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>Add</Button>
        </Box>
      </Toolbar>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox 
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddUserModal open={open} onClose={() => setOpen(false)} onSave={handleAdd} />
    </Paper>
  );
};