import React from 'react';
import { Button, Modal } from 'antd';

function ModalDelete({ open, onOk, onCancel }) {
    return (
        <Modal
            title="Confirm Delete"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
            cancelButtonProps={{ type: "info" }}
        >
            <p>Are you sure you want to delete this item?</p>
        </Modal>
    );
}

export default ModalDelete;

