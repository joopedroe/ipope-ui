import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { setSearchs } from '../../config/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const CreateSurveyDialog = ({open, handleClose}) => {

    const dispatch = useDispatch();

    const searchs = useSelector(state => state.formSearch.searchs);

    const [states] = useState([
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        state: '',
        type: '',
    });



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateSurvey = () => {
        const id = (searchs.length + 1).toString();
        const searchList = [
            ...searchs,
            {
                ...formData,
                id,
                sections: [],
            }
        ]
        dispatch(setSearchs(searchList));
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar Pesquisa</DialogTitle>
                <DialogContent>
                    <DialogContentText>Preencha os detalhes da pesquisa:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Cidade"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {states.map((state) => (
                                <MenuItem key={state.value} value={state.value}>
                                    {state.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Tipo"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCreateSurvey}>Criar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateSurveyDialog;
