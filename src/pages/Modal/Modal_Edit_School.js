import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, DatePicker, Form, Input, Upload, Modal } from 'antd';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function ModalEditSchool({ open, onClose, onSave, school }) {
    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        if (school) {
            form.setFieldsValue({
                'Name school': school.name,
                'Image': [{ url: school.image }],
                'Address': [school.address],
                'Date': school.date ? (school.date) : null,
                'Description': school.description
            });
            setEditorContent(school.generalInfo);
        }
    }, [school, form]);

    const handleEditorChange = ({ html, text }) => {
        setEditorContent(text);
    };

    const handleSave = async (values) => {
        const updatedSchool = {
            name: values['Name school'],
            image: values['Image'][0]?.url, // Changed to url from thumbUrl
            address: values['Address'],
            date: values['Date']?.format('YYYY-MM-DD'),
            generalInfo: editorContent
        };

        onSave(updatedSchool);
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
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={editorContent}
                />

                <Form.Item>
                    <div style={{ textAlign: 'right' }}>
                        <Button className='btn btn-white' onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
                        <Button className='btn btn-warning' type="primary" htmlType="submit">Save changes</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalEditSchool;
