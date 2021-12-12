import { Button } from '@mui/material';
import React from 'react';
import FormModal from '../FormModal/FormModal';

// form data add button declare here
const DataAdd = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    }
    const handleModalClose = () => setOpenModal(false);
    return (
        <div>
            <Button onClick={handleModalOpen} style={{ backgroundImage: 'linear-gradient(to right, #3CD3AD 15%, #4CB8C4 120%)' }} type='submit' variant="contained">Add</Button>

            <FormModal
                openModal={openModal}
                handleModalClose={handleModalClose}
            ></FormModal>
        </div>
    );
};

export default DataAdd;