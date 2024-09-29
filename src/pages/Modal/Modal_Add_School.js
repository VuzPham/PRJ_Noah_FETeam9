import React, { useState } from 'react';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
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

function ModalAddSchool({ open, onClose, onSave }) {
    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setEditorContent(text);
    };

    const handleSave = async (values) => {
        const newSchool = {
            name: values['Name school'],
            image: values['Image'][0]?.thumbUrl,
            address: values['Address'],
            date: values['Date']?.format('DD-MM-YYYY'),
            description: editorContent
        };

        onSave(newSchool);
    };

    const handleReset = () => {
        form.resetFields();
        setEditorContent('');
    };

    return (
        <Modal
            title="Add School"
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
                            },
                            {
                                value: 'GoVap',
                                label: 'Quận Gò Vấp',
                                children: [
                                    {
                                        value: '12 Nguyễn Văn Bảo, phường 4',
                                        label: '12 Nguyễn Văn Bảo, phường 4',
                                    },
                                ],
                            },
                            {
                                value: 'Quan 1',
                                label: 'Quận 1',
                                
                            },
                            {
                                value: 'Quan 2',
                                label: 'Quận 2',
                                
                            },
                            {
                                value: 'Quan 3',
                                label: 'Quận 3',
                                
                            },
                            {
                                value: 'Quan 4',
                                label: 'Quận 4',
                                
                            },
                            {
                                value: 'Quan 5',
                                label: 'Quận 5',
                                
                            },
                            {
                                value: 'Quan 6',
                                label: 'Quận 6',
                                
                            },
                            {
                                value: 'Quan 7',
                                label: 'Quận 7',
                                
                            },
                            {
                                value: 'Quan 8',
                                label: 'Quận 8',
                                
                            },
                            {
                                value: 'Thu Duc',
                                label: 'Thủ Đức',
                                
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
                    style={{ height: '300px', width: '100%' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={editorContent}
                />

                <Form.Item>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleReset} style={{ marginRight: 8 }}>Reset</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalAddSchool;

