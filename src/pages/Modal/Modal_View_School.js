import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt();

function ModalViewSchool({ open, onOk, onCancel, school }) {
    console.log('Check giá trị của school tại modal view school: ', school)
    const [renderedHtml, setRenderedHtml] = useState('');

    useEffect(() => {
        if (school) {
            setRenderedHtml(mdParser.render(school.description));
        }
    }, [school]);

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
                    <span>Ngày thành lập: {school.date}</span>
                    <p dangerouslySetInnerHTML={{ __html: renderedHtml }}></p>
                    <img src={school.image} alt="School" style={{ width: '100%', height: 'auto' }} />

                    <br />
                    <div>
                        <h5>Thông tin liên hệ</h5>
                        <ul>
                            <li>Email: a@gmail.com</li>
                            {school && school.address == '' ?
                                <li>Địa chỉ: Tân Bình, TPHCM</li>
                                :
                                <li>Địa chỉ: {school.address[1]}, {school.address[0]}</li>
                            }
                        </ul>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default ModalViewSchool;
