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
    Stack,
} from '@mui/material';

export default function FormDialog({ open, handleClose, addSection  }) {

    const [values, setValues] = useState('');

    const handleChange = (event) => {
            console.log(event.target.value);
            setValues(event.target.value);
        }

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    const handleAddSection = (event) => {
            event.preventDefault();
            addSection(values);
            console.log(values);
            handleClose();
        }


    return (
        <div>
            <Dialog open={open}
                onClose={handleClose}>
                <DialogTitle>Criar seção</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={3}
                            sx={{ maxWidth: 400, padding: 2 }}
                        >
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nameSection"
                                onChange={handleChange}
                                type="text"
                                value={values.nameSection}
                            />
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleAddSection}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
