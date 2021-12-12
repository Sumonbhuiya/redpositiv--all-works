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
const FormModal = ({ openModal, handleModalClose }) => {
    const [usersInfo, setUsersInfo] = React.useState([])

    // take all input data
    const handelOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...usersInfo };
        newInfo[field] = value;
        setUsersInfo(newInfo);
    }
    // post data in database
    const handelSubmit = () => {
        const getUser = {
            ...usersInfo,
        }
        fetch('https://glacial-crag-78279.herokuapp.com/user_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(getUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Data added successfully');
                    handleModalClose();
                }
            });
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style}>
                        <Typography sx={{ color: '#3d3d3d', textAlign: 'center', mb: 2 }} id="transition-modal-title" variant="h6" component="h2">
                            Enter Your Information
                        </Typography>
                        {/* input form */}
                        <form onSubmit={handelSubmit}>
                            <TextField
                                sx={{ width: '90%', m: 1 }}
                                id="outlined-size-small"
                                name="name"
                                type="text"
                                placeholder='Your Name'
                                onBlur={handelOnBlur}
                                size="small"
                                required
                            />
                            <TextField
                                sx={{ width: '90%', m: 1 }}
                                id="outlined-size-small"
                                name="phone"
                                type="number"
                                placeholder='Phone Number'
                                onBlur={handelOnBlur}
                                size="small"
                                required
                            />
                            <TextField
                                sx={{ width: '90%', m: 1 }}
                                id="outlined-size-small"
                                name="email"
                                type="email"
                                placeholder='Your Email'
                                onBlur={handelOnBlur}
                                size="small"
                                required
                            />
                            <TextField
                                sx={{ width: '90%', m: 1 }}
                                id="outlined-size-small"
                                name="hobbies"
                                type="text"
                                placeholder="Your Hobbies"
                                onBlur={handelOnBlur}
                                size="small"
                                required
                            />
                            <Box sx={{ width: '92%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button style={{ backgroundImage: 'linear-gradient(to right, #3CD3AD 15%, #4CB8C4 120%)' }} type='submit' variant="contained">Save</Button>
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default FormModal;