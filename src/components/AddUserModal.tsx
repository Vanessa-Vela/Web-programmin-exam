import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export interface UserData {
  name: string;
  age: number;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserData) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: '', age: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.age) return;
    onSave({ name: formData.name, age: Number(formData.age) });
    setFormData({ name: '', age: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField 
          autoFocus margin="dense" label="Name" fullWidth 
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField 
          margin="dense" label="Age" type="number" fullWidth 
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};