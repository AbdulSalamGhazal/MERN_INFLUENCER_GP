import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const typeOptions = ['nothing'];

const BusinessSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registry, setRegistry] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO: complete submit functionality

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* TODO: the title needs some styles */}
            <Typography component="h1" variant="h4" align="center">
                Business Sign Up
            </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="registery"
                        type="number"
                        id="registry"
                        value={registry}
                        onChange={e => setRegistry(e.target.value)}
                    />
                    
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="type">select your type</InputLabel>
                        <Select
                        labelId="type"
                        id="type"
                        value={type}
                        label="select your type"
                        onChange={e => setType(e.target.value)}
                        >
                            {typeOptions.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        label="Description"
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
        </Container>
    );
}

export default BusinessSignup;