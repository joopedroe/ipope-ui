import React, {useEffect} from 'react';
import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FieldsType from '../fields/index';
import { useSelector } from 'react-redux';
//import iconListCheck from '.assets/fields/icon_list_check.png';

import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';


 const FormDialog = ({ open, handleClose, addField, fieldEdit }) => {

    const [values, setValues] = useState('');
    const [fieldState, setNewField] = useState({});



    const [fieldType, setFieldType] = useState('');
    const [label, setLabel] = useState('');
    const [options, setOptions] = useState('');
    const [typeSelected, setTypeSelected] = useState('');
    const [statusTypeSelected, setStatusTypeSelected] = useState(false);

    const modalTypeField = [
        { label: 'Seleção única', dataType: 2, image: '/assets/images/fields/icon_list_radio.png'},
        { label: 'Lista de opções', dataType: 1, image: '/assets/images/fields/icon_list_check.png' },
        { label: 'Texto', dataType: 3, image: '/assets/images/fields/icon_text.png' },
        { label: 'Seleção única com texto', dataType: 4, image: '/assets/images/fields/icon_select.png' },
    ];

    const field = useSelector(state => state);
    console.log('field', field);

    const handleFieldTypeChange = (event) => {
        setFieldType(event.target.value);
    };

    const handleLabelChange = (event) => {
        setLabel(event.target.value);
    };

    const handleOptionsChange = (event) => {
        setOptions(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode realizar a lógica para processar os dados do formulário
        console.log('Tipo de campo:', fieldType);
        console.log('Rótulo:', label);
        console.log('Opções:', options);
    };


    const handleAddSection = (event) => {
        event.preventDefault();
        //addSection(values);
        console.log(values);
        handleClose();
    }

    const selectedType = (type) => {
        setTypeSelected(type);
        setStatusTypeSelected(true);
    }

    const handleAddFields = (event) => {
        event.preventDefault(); 
        console.log('fieldState', fieldState);
        addField({dataType: typeSelected.dataType, ...fieldState});
        handleClose();
    }

    const handleFieldChange = (data) => {
        console.log('data', data);
        setNewField(data);
    }

    useEffect(() => {
        setStatusTypeSelected(false);
        setNewField({});
    }, [open]);

    useEffect(() => {
        if(fieldEdit){
            setNewField({...fieldEdit});
            setTypeSelected({dataType: fieldEdit.dataType});
            setStatusTypeSelected(true);
        }
    }, [fieldEdit]);


    return (
        <div>
            <Dialog 
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}>
                <DialogTitle>Selecionar Campo</DialogTitle>
                <DialogContent>
                    {
                    !statusTypeSelected
                    ?
                    (
                        <Grid container>
                        {modalTypeField.map((type, index) => (
                            <Grid item xs={3} key={index}>
                                <Card sx={{margin:'10px'}}>
                                    <CardActionArea onClick={()=>{selectedType(type)}} >
                                        <CardMedia
                                            component={'img'}
                                            alt={`Tipo de Field: ${type.label}`}
                                            height={'70'}
                                            width={'80'}
                                            image={type.image || null}
                                            title={`Tipo de Field: ${type.label}`}
                                            sx={{ objectFit: 'contain'}}
                                        />
                                        <CardContent sx={{padding:'10px 5px'}} >
                                            <Typography
                                                sx={{fontSize:'12px', fontWeight:'500', textAlign:'center', color: '#676d76'}}
                                            >
                                                {type.label}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    ):
                    (
                        <Grid container>
                        <FieldsType dataType={typeSelected.dataType} setNewField={handleFieldChange} fieldState={fieldState} />
                    </Grid>
                    )
                    }
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleAddFields}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;