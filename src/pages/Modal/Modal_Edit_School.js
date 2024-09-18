import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, DatePicker, Form, Input, Upload, Modal } from 'antd';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import moment from 'moment';

const mdParser = new MarkdownIt();
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function ModalEditSchool({ open, onClose, onSave, school }) {
    console.log('Check modal edit school: ', school)
    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState('');
    // fix
    useEffect(() => {
        if (school) {
            form.setFieldsValue({
                'Name school': school.name,
                'Image': [{ thumbUrl: school.image }],
                'Address': [school.address],
                'Date': school.date ? moment(school.date, 'DD-MM-YYYY') : null,
                'Description': school.description
            });
            setEditorContent(school.description);
        }
    }, [school, form]);

    //fix
    const handleSave = async (values) => {
        const date = values['Date'];
        const formattedDate = date ? date.format('DD-MM-YYYY') : null;
        console.log('Check values in hàm handleSave ở modal edit school: ', values)
        const updatedSchool = {
            id: school.id,
            name: values['Name school'],
            image: values['Image'][0]?.thumbUrl,
            address: values['Address'],
            date: formattedDate,
            description: editorContent
        };

        onSave(updatedSchool);
        console.log('Check handle Save ở modal edit school: ', updatedSchool);
    };


    const handleEditorChange = ({ html, text }) => {
        console.log('check text in medit: html: , text:  ', html, text)
        setEditorContent(text);
    };
    return (
        <Modal
            title="Edit School"
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            width={'50%'}
            centered
        >
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                style={{ maxWidth: '100%' }}
                onFinish={handleSave}
            >
                <Form.Item
                    label="Name school"
                    name="Name school"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of the school!',
                        },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Upload image"
                    name="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: 'Please upload an image!',
                        },
                    ]}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <PlusOutlined /> Upload
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name='Address'
                    rules={[
                        {
                            required: true,
                            message: 'Please select an address!',
                        },
                    ]}
                >
                    <Cascader
                        options={[
                            {
                                value: 'TanPhu',
                                label: 'Quận Tân Phú',
                                children: [
                                    {
                                        value: '114 Lê Trọng Tấn',
                                        label: '114 Lê Trọng Tấn',
                                    },
                                ],
                            },
                            {
                                value: 'TanBinh',
                                label: 'Quận Tân Bình',
                                children: [
                                    {
                                        value: '236B Lê Văn Sỹ',
                                        label: '236B Lê Văn Sỹ',
                                    },
                                ],
                            }
                        ]}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="DatePicker"
                    name="Date"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a date!',
                        },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <h4 style={{ fontWeight: 'normal' }}>General information</h4>

                <MdEditor
                    name='Description'
                    style={{ height: '300px', width: '100%' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={editorContent}
                />

                <Form.Item>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <Button className='btn btn-white' onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
                        <Button className='btn btn-warning' type='white' htmlType="submit">Save changes</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalEditSchool;

