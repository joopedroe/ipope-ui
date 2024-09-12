
import {filter} from 'lodash';
import {sentenceCase} from 'change-case';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { format } from 'date-fns';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../../../label';
import Iconify from '../../../iconify';
import Scrollbar from '../../../scrollbar';
// sections
import {SearchListHead, SearchListToolbar} from '../../../../sections/@dashboard/searches';
// mock
import DialogNewSearch from "../../components/dialogs/DialogNewSearch";
import { getSearches, duplicateSearch } from '../../config/actions';
import {useSelector, useDispatch} from "react-redux";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'created_at', label: 'Criado', alignRight: false},
    {id: 'name', label: 'Nome', alignRight: false},
    {id: 'company', label: 'Código', alignRight: false},
    {id: 'role', label: 'Cidade', alignRight: false},
    {id: 'isVerified', label: 'Estado', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: ''},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function SearchesList() {
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('created_at');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDialogNewSearch, setOpenDialogNewSearch] = useState(false);

    const [dataEdit, setDataEdit] = useState({});

    const [idSearch, setIdSearch] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleOpenMenu = (event, data) => {
        setOpen(event.currentTarget);
        setIdSearch(data.id);
        setDataEdit(data)
    };

    const searches = useSelector(state => state.formSearch.searches);

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = searches.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleCloseDialogNewSearch = () => {
        setOpenDialogNewSearch(false);
    }

    const handleOpenDialogEditSearch = () => {
        setOpenDialogNewSearch(true);
        setDataEdit({isEdit: true, ...dataEdit})
    }

    const editSearch = () => {
        navigate(`/dashboard/searches/edit/${idSearch}`);
    }

    const getResultSearch = () => {
        navigate(`/dashboard/results/search/${idSearch}`);
    }

    const getResultSearchMaps = () => {
        navigate(`/dashboard/resultsMaps/search/${idSearch}`);
    }

    const setDuplicateSearch = () => {
        dispatch(duplicateSearch(idSearch));
        handleCloseMenu();
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searches.length) : 0;

    const filteredSearches = applySortFilter(searches, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredSearches.length && !!filterName;

    useEffect(() => {
        dispatch(getSearches());
    }, []);

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Pesquisas
                    </Typography>
                    <Button onClick={() => {
                        setOpenDialogNewSearch(true)
                    }} variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}>
                        Nova pesquisa
                    </Button>
                </Stack>

                <Card>
                    <SearchListToolbar numSelected={selected.length} filterName={filterName}
                                       onFilterName={handleFilterByName}/>

                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <SearchListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={searches.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredSearches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const {id, name, code, city, state, status, created_at} = row;
                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox"
                                                      selected={selectedUser}>
                                                <TableCell >
                                                    {format(new Date(created_at), 'dd/MM/yyyy')}
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{code || '***'}</TableCell>

                                                <TableCell align="left">{city}</TableCell>

                                                <TableCell align="left">{state}</TableCell>

                                                <TableCell align="left">
                                                    <Label
                                                        color={(status === 1 && 'error') || 'success'}>{sentenceCase(status === 1 ? 'Rascunho' : 'Publicado')}</Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(event) => {
                                                        handleOpenMenu(event, {id, name, code, city, state, status})
                                                    }}>
                                                        <Iconify icon={'eva:more-vertical-fill'}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br/> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={searches.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={editSearch}>
                    <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
                    Editar
                </MenuItem>

                <MenuItem onClick={handleOpenDialogEditSearch}>
                    <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
                    Editar Nome
                </MenuItem>

                <MenuItem onClick={getResultSearch}>
                    <Iconify icon={"material-symbols:bar-chart"} sx={{mr: 2}}/>
                    Resultados
                </MenuItem>

                <MenuItem onClick={setDuplicateSearch}>
                    <Iconify icon="ion:duplicate-outline" sx={{mr: 2}}/>
                    Duplicar
                </MenuItem>

                <MenuItem onClick={getResultSearchMaps}>
                    <Iconify icon={"pepicons-pop:map"} sx={{mr: 2}}/>
                    Mapa
                </MenuItem>

                <MenuItem sx={{color: 'error.main'}}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{mr: 2}}/>
                    Excluir
                </MenuItem>
            </Popover>

            <DialogNewSearch
                open={openDialogNewSearch}
                handleClose={handleCloseDialogNewSearch}
                dataEdit={dataEdit}
            />
        </>
    );
}
