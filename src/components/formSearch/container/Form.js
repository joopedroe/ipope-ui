import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button as ButtonAntd } from 'antd';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Box,
    TextField,
    IconButton,
    Divider,
    FormControlLabel,
    Radio,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import Icon from '../../iconify';
import { setFormSearch, getSearchById } from '../config/actions'
import DialogSection from '../components/dialogs/DialogSection';
import DialogTypeField from '../components/dialogs/DialogTypeField';
import { InputActions } from './style';
import { useParams } from 'react-router-dom';


export const Form = (props) => {
    const [openDialogSection, setOpenDialogSection] = useState(false);
    const [openDialogTypeField, setOpenDialogTypeField] = useState(false);
    const [sectionIdSelected, setSectionId] = useState(null);
    const [fieldEdit, setFieldEdit] = useState(null);

    const search = useSelector(state => state.formSearch.search);
    const dispatch = useDispatch()
    const { id } = useParams();

    const onSetFormSearch = (searchUpdated) => {
        console.log(searchUpdated);
        dispatch(setFormSearch(searchUpdated))
    }

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    const addSection = (sectionName) => {
        const newSection = {
            id: uuidv4(),
            name: sectionName,
            fields: []
        };
        const searchUpdated = { ...search, sections: [...search.sections, newSection] };
        onSetFormSearch(searchUpdated);
    };

    const removeSection = (sectionId) => {
        const updatedSections = search.sections.filter((section) => section.id !== sectionId);
        const searchUpdated = { ...search, sections: updatedSections };
        onSetFormSearch(searchUpdated);
    };

    const removeField = (sectionId, fieldId) => {
        const sectionIndex = search.sections.findIndex((section) => section.id === sectionId);
        const updatedFields = search.sections[sectionIndex].fields.filter((field) => field.id !== fieldId);
        const searchUpdated = { ...search };
        searchUpdated.sections[sectionIndex].fields = updatedFields;
        onSetFormSearch(searchUpdated);
    };

    const addField = (data) => {
        const searchUpdated = { ...search };
        if(data.id) {
            const sectionIndex = searchUpdated.sections.findIndex((section) => section.id === data.sectionId);
            const newSearch = {
                ...searchUpdated,
                sections: searchUpdated.sections.map((section) => {
                    if (section.id === data.sectionId) {
                        return {
                            ...section,
                            fields: searchUpdated.sections[sectionIndex].fields.map((field) => {
                                if (field.id === data.id) {
                                    console.log('field edit', data);
                                    return {
                                        ...field,
                                        ...data
                                    }
                                }
                                return field;
                            })
                        }
                    }
                    return section;
                })
            }
            onSetFormSearch(newSearch);
            setFieldEdit(null);
            return;
        }
        const newField = {
            id: uuidv4(),
            sectionId: sectionIdSelected,
            ...data
        };
        const sectionIndex = searchUpdated.sections.findIndex((section) => section.id === sectionIdSelected);
        if (sectionIndex >= 0) {
            console.log('add field');
            const newSearch = {
                ...searchUpdated,
                sections: searchUpdated.sections.map((section) => {
                    if (section.id === sectionIdSelected) {
                        return {
                            ...section,
                            fields: [...section.fields, newField]
                        }
                    }
                    return section;
                })

            }
            onSetFormSearch(newSearch);
        }
    };

    useEffect(() => {
        if(id){
            console.log('id', id);
            dispatch(getSearchById(id));
        }
    }, [])


    const onOpenDialogSection = () => {
        setOpenDialogSection(true);
    };

    const handleCloseSection = () => {
        setOpenDialogSection(false);
    };

    const onOpenDialogTypeField = (sectionId) => {
        setSectionId(sectionId);
        setOpenDialogTypeField(true);
    };

    const onOpenDialogEditField = (field) => {
        setFieldEdit(field);
        setOpenDialogTypeField(true);
    };

    const handleCloseTypeField = () => {
        setOpenDialogTypeField(false);
    };

    const CheckboxRadioField = (field) => {
        return (
            <>
                <Typography variant="body1" gutterBottom>
                    {field.question}
                </Typography>
                {
                    field.options.map((option, index) => (
                        <div key={option.id}>
                            <FormControlLabel
                                sx={{ width: '100%' }}
                                value={option.value}
                                control={field.dataType == 1 ? <Checkbox size='small' disabled sx={{ padding: '4px', marginLeft: '15px' }} /> : <Radio size='small' disabled sx={{ padding: '4px', marginLeft: '15px' }} />}
                                label={
                                    <div style={{ display: 'flex', width: '600px', alignItems: 'center' }}>
                                        <Typography variant="body1" >
                                            {option.value}
                                        </Typography>
                                    </div>
                                }
                            />
                        </div>
                    ))
                }
                {
                    field.dataType == 4 && (
                        <TextField
                            size='small'
                            label="Campo de resposta adicional"
                            disabled={true}
                            fullWidth
                            margin="normal"
                        />
                    )
                }

            </>)
    }

    const TextFieldInput = (field) => {
        return (
            <>
                <Typography variant="body1" gutterBottom>
                    {field.question}
                </Typography>
                <TextField
                    size='small'
                    label="Resposta"
                    disabled={true}
                    fullWidth
                    sx={{marginTop: '2px'}}
                    margin="normal"
                />

            </>)
    }

    const renderField = (field) => {
        switch (field.dataType) {
            case 1:
            case 2:
            case 4:
            return CheckboxRadioField(field);
            case 3:
            return TextFieldInput(field);

            }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader
                        subheader={`${search.city} - ${search.state}`}
                        title={search.name}
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={6}
                            wrap="wrap"
                        >
                            <div style={{ width: '100%' }}>


                                {search.sections.map((section) => (
                                    <Box component="div" key={section.id} sx={{ border: '1px dashed #8080807d', borderRadius: '15px', margin: '10px 10px' }}>
                                        <Grid container alignItems="center" >
                                            <Grid item xs={11}>
                                                <Typography variant="h6" gutterBottom>
                                                    {section.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton onClick={() => removeSection(section.id)} size="small">
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12} sx={{ padding: '0px 24px' }}>
                                                {
                                                    section.fields.map((field) => (
                                                        <Box key={field.id} component="div" sx={{ position: 'relative', width: '100%', marginBottom: '20px', border: '1px dashed #8080807d', borderRadius: '10px', flexDirection: 'column', display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                                            <InputActions>
                                                                <ButtonAntd
                                                                    shape='circle'
                                                                    onClick={() => onOpenDialogEditField(field)}
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </ButtonAntd>
                                                                <ButtonAntd 
                                                                    shape='circle'
                                                                    onClick={() => removeField(section.id, field.id)}
                                                                     >
                                                                    <FontAwesomeIcon icon={faXmark} />
                                                                </ButtonAntd>
                                                            </InputActions>
                                                            {
                                                                renderField(field)
                                                            }
                                                            </Box >                                                          
                                                        )
                                                    )
                                                }
                                                        
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box component="div" sx={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                                                    <Button size="small" variant="outlined" color="inherit" onClick={() => onOpenDialogTypeField(section.id)}>
                                                        <SvgIcon fontSize="small">
                                                            <Icon icon="ic:outline-plus" />
                                                        </SvgIcon>
                                                        Adicionar Campo
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </div>
                        </Grid>
                    </CardContent>
                    <Box component="div" sx={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                        <Button variant="outlined" color="inherit" onClick={onOpenDialogSection}>
                            <SvgIcon fontSize="small">
                                <Icon icon="ic:outline-plus" />
                            </SvgIcon>
                            Adicionar Seção
                        </Button>
                    </Box>

                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained">
                            Salvar
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <DialogSection open={openDialogSection}
                handleClose={handleCloseSection}
                addSection={addSection}
            />
            <DialogTypeField
                open={openDialogTypeField}
                fieldEdit={fieldEdit}
                handleClose={handleCloseTypeField}
                addField={addField}
            />
        </Box>
    );
};
