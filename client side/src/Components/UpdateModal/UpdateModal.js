import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #3CD3AD',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

// modal function
const UpdateModal = ({ openUpdateModal, handleUpdateModalClose, update }) => {
    const [users, setUsers] = React.useState([]);
    const [bookingInfo, setBookingInfo] = React.useState([])

    // load data
    React.useEffect(() => {
        fetch(`https://glacial-crag-78279.herokuapp.com/user_data`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])
    // filter data
    const rowDetails = users.filter(details => (details._id === update));

    // take data from input
    const handelOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }
    const handelUpdate = () => {
        //collect all data
        const updateData = {
            ...bookingInfo,
        }
        const url = `https://glacial-crag-78279.herokuapp.com/user_data/${update}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated successfully')
                    handleUpdateModalClose();
                }
            })
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openUpdateModal}
                onClose={handleUpdateModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openUpdateModal}>
                    <Box sx={style}>
                        <Typography sx={{ color: '#3d3d3d', textAlign: 'center', mb: 2 }} id="transition-modal-title" variant="h6" component="h2">
                            Update Your Information
                        </Typography>
                        {
                            rowDetails.map(row =>
                                // modal form
                                <form onSubmit={handelUpdate} key={row._id}>
                                    <TextField
                                        sx={{ width: '90%', m: 1 }}
                                        id="outlined-size-small"
                                        name="name"
                                        type="text"
                                        defaultValue={row.name}
                                        onBlur={handelOnBlur}
                                        size="small"
                                        required
                                    />
                                    <TextField
                                        sx={{ width: '90%', m: 1 }}
                                        id="outlined-size-small"
                                        name="phone"
                                        type="number"
                                        defaultValue={row.phone}
                                        onBlur={handelOnBlur}
                                        size="small"
                                        required
                                    />
                                    <TextField
                                        sx={{ width: '90%', m: 1 }}
                                        id="outlined-size-small"
                                        name="email"
                                        type="email"
                                        defaultValue={row.email}
                                        onBlur={handelOnBlur}
                                        size="small"
                                        required
                                    />
                                    <TextField
                                        sx={{ width: '90%', m: 1 }}
                                        id="outlined-size-small"
                                        name="hobbies"
                                        type="text"
                                        defaultValue={row.hobbies}
                                        onBlur={handelOnBlur}
                                        size="small"
                                        required
                                    />
                                    <Box sx={{ width: '92%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button style={{ backgroundImage: 'linear-gradient(to right, #3CD3AD 15%, #4CB8C4 120%)' }} type='submit' variant="contained">Update</Button>
                                    </Box>
                                </form>
                            )}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default UpdateModal;