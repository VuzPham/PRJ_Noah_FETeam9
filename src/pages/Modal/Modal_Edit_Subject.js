import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import 'react-markdown-editor-lite/lib/index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

function ModalEditSubject({ open, onClose, onSave, initialData }) {
    const [form] = Form.useForm();
    // const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                'Subject name': initialData.name,
                'Major Name': initialData.majorName,
                Semester: initialData.semester,
            });
        }
    }, [form, initialData]);
    const handleSave = (values) => {

        const newSubject = {
            id: initialData.id,
            name: values['Subject name'],
            majorName: values['Major Name'],
            semester: values['Semester'],
        };

        onSave(newSubject);
    };


    const handleReset = () => {
        form.resetFields();
        // setEditorContent('');
    };

    return (
        <Modal
            title="Edit Subject"
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
                    label="Subject Name"
                    name="Subject name"
                    rules={[{ required: true, message: 'Please input the name of the subject!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="Major Name"
                    label="Major Name"
                    rules={[{ required: true }]}
                    initialValue={`Nhập môn lập trình`}
                >
                    <Select
                        defaultValue="Nhập môn lập trình"
                        style={{
                            width: '100%',
                        }}
                        options={[
                            {
                                label: <span>THPT Quốc Gia</span>,
                                title: 'THPT Quốc Gia',
                                options: [
                                    {
                                        label: <span>KHTN</span>,
                                        value: 'KHTN',
                                    },
                                    {
                                        label: <span>KHXH</span>,
                                        value: 'KHXH',
                                    }
                                ],
                            },
                            {
                                label: <span>Đại Học</span>,
                                title: 'Đại Học',
                                options: [
                                    {
                                        label: <span>Đại Cương</span>,
                                        value: 'Đại Cương',
                                    },
                                    {
                                        label: <span>Môn học bắt buộc</span>,
                                        value: 'Môn học bắt buộc',
                                    },
                                    {
                                        label: <span>Môn học tự chọn</span>,
                                        value: 'Môn học tự chọn',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                {/* <Form.Item
                    label="Range Picker"
                    name="RangePicker"
                    rules={[{ required: true, message: 'Please select a date range!' }]}
                >
                    <RangePicker onChange={handleDateChange} />
                </Form.Item> */}
                <Form.Item
                    label="Semester"
                    name="Semester"
                    rules={[{ required: true, message: 'Please input the semester of the subject!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
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

export default ModalEditSubject;
