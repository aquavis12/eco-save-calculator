import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
const ProfilePage = () => {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   address: '',
   items: '',
 });
 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 };
 const handleSubmit = (e) => {
   e.preventDefault();
   alert('Donation Form Submitted!');
 };
 return (
<Box>
<Typography variant="h4" gutterBottom>
       Donate Your E-Waste
</Typography>
<form onSubmit={handleSubmit}>
<TextField
         label="Full Name"
         name="name"
         value={formData.name}
         onChange={handleChange}
         fullWidth
         required
         sx={{ mb: 2 }}
       />
<TextField
         label="Email Address"
         name="email"
         value={formData.email}
         onChange={handleChange}
         fullWidth
         required
         sx={{ mb: 2 }}
       />
<TextField
         label="Phone Number"
         name="phone"
         value={formData.phone}
         onChange={handleChange}
         fullWidth
         required
         sx={{ mb: 2 }}
       />
<TextField
         label="Address"
         name="address"
         value={formData.address}
         onChange={handleChange}
         fullWidth
         required
         sx={{ mb: 2 }}
       />
<TextField
         label="Items to Donate"
         name="items"
         value={formData.items}
         onChange={handleChange}
         fullWidth
         required
         sx={{ mb: 2 }}
       />
<Button variant="contained" color="primary" type="submit">
         Submit Donation
</Button>
</form>
</Box>
 );
};
export default ProfilePage;