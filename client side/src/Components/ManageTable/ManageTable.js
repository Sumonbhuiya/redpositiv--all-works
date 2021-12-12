import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import './ManageTable.css'
import UpdateModal from '../UpdateModal/UpdateModal';
import DataAdd from '../DataAdd/DataAdd';
import emailjs from 'emailjs-com';

// declare header name
const headCells = [
    {
        id: 'serial_number',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'Phone number',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'hobbies',
        numeric: true,
        disablePadding: false,
        label: 'Hobbies',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

// header methodology
function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// Table header and all button position set
const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '8%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : ''}
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 87%' }} variant="h6" id="tableTitle" component="div">
                    User Information
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 90%' }} variant="h6" id="tableTitle" component="div">
                    User Information
                </Typography>
            )}
            <DataAdd sx={{ flex: '1 1 10%' }} />
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

// main function
const ManageTable = () => {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
    const [update, setUpdate] = useState([]);
    // load database data
    useEffect(() => {
        const url = `https://glacial-crag-78279.herokuapp.com/user_data`
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    // update Modal process
    const handleUpdateModalOpen = (id) => {
        setOpenUpdateModal(true);
        setUpdate(id)
    }
    const handleUpdateModalClose = () => {
        setOpenUpdateModal(false);
    }

    // delete an row data
    const handelDelete = id => {
        const permission = window.confirm('Are you sure you want to delete this order ???')
        if (permission) {
            const url = `https://glacial-crag-78279.herokuapp.com/user_data/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const remaining = users.filter(row => row._id !== id);
                        setUsers(remaining)
                    }
                })
        }
    }

    // send email Not work
    /*const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_3clcma', selected.current, 'user_o9SzaWXmr6zM5gws1Bt')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        console.log(selected)
    }*/

    // checkbox property
    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelecteds = users.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (e, _id, row) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    return (
        <div style={{ paddingTop: '2%' }}>
            <Container sx={{ pt: 2 }}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        {/* table declare */}
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={users.length}
                                />
                                <TableBody>

                                    {
                                        users.map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced - table - checkbox - ${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        {/* table checkbox */}
                                                        <Checkbox
                                                            onClick={(e) => handleClick(e, row._id, row)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    {/* table data */}
                                                    <TableCell component="th" id={labelId} scope="row" padding="none" >
                                                        {row._id}
                                                    </TableCell>
                                                    <TableCell align="left">{row.name}</TableCell>
                                                    <TableCell align="left">{row.phone}</TableCell>
                                                    <TableCell align="left">{row.email}</TableCell>
                                                    <TableCell align="left">{row.hobbies}</TableCell>
                                                    <TableCell align="left">
                                                        <Button onClick={() => handleUpdateModalOpen(row._id)} sx={{ backgroundColor: '#00bfff', color: '#ffffff', mr: .5 }} id="update-button">Update</Button>
                                                        <Button onClick={() => handelDelete(row._id)} sx={{ backgroundColor: '#ff4500', color: '#ffffff', mr: .5 }} id="delete-button">Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            <Typography sx={{ textAlign: 'end' }} variant="h6" component="h2">
                                <Button sx={{ backgroundColor: '#4169e1', color: '#ffffff' }} id="send-button">Send</Button>
                            </Typography>
                        </TableContainer>
                    </Paper>
                </Box>
            </Container>
            {/* Modal call and pass data */}
            <UpdateModal
                update={update}
                openUpdateModal={openUpdateModal}
                handleUpdateModalClose={handleUpdateModalClose}
            ></UpdateModal>
        </div>
    );
};

export default ManageTable;