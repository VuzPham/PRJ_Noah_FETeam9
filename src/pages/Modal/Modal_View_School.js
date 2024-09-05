import React from 'react';
import { Button, Modal } from 'antd';

function ModalViewSchool({ open, onOk, onCancel, school }) {
    return (
        <Modal
            title="View School"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Cancel"
            cancelButtonProps={{ type: "info" }}
        >
            {school && (
                <div>
                    <h3>{school.name}</h3>
                    <p>{school.description}</p>
                    <img src={school.image} alt="School" style={{ width: '100%', height: 'auto' }} />
                    <br />
                    <div>
                        <h5>Thông tin liên hệ</h5>
                        <ul>
                            <li>Email: a@gmail.com</li>
                            <li>Địa chỉ: Tân Bình, TPHCM</li>
                        </ul>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default ModalViewSchool;
