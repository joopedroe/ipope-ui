import * as React from 'react';
import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Stack,
} from '@mui/material';

export default function FormDialog({ open, handleClose }) {

    const [values, setValues] = useState({
        nameSearch: '',
        state: '',
        city: ''
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <div>
            <Dialog open={open}
                onClose={handleClose}>
                <DialogTitle>Criar pesquisa</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={3}
                            sx={{ maxWidth: 400 }}
                        >
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nameSearch"
                                onChange={handleChange}
                                type="text"
                                value={values.nameSearch}
                            />
                            <TextField
                                fullWidth
                                label="Cidade"
                                name="city"
                                onChange={handleChange}
                                type="text"
                                value={values.city}
                            />
                            <TextField
                                fullWidth
                                label="Estado"
                                name="state"
                                onChange={handleChange}
                                type="text"
                                value={values.state}
                            />
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
