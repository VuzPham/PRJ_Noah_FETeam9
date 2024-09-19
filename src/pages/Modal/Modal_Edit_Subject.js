import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import 'react-markdown-editor-lite/lib/index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

function ModalEditSubject({ open, onClose, onSave, initialData }) {
    console.log('Check giá trị của modal edit subject: ', initialData);
    const [form] = Form.useForm();

    // useEffect(() => {
    //     if (initialData) {
    //         const [start, end] = initialData.semester.split('-');
    //         const startDate = moment(`${start}`, 'DD-MM-YYYY');
    //         const endDate = moment(`${end}`, 'DD-MM-YYYY');

    //         form.setFieldsValue({
    //             'Subject name': initialData.name,
    //             'Major Name': initialData.majorName,
    //             'Semester': [startDate, endDate],
    //         });
    //     }
    // }, [form, initialData]);
    useEffect(() => {
        if (initialData) {
            const [start, end] = initialData.semester.split('-');
            const startDate = moment(`${start}`, 'YYYY/MM/DD');
            const endDate = moment(`${end}`, 'YYYY/MM/DD');

            form.setFieldsValue({
                'Subject name': initialData.name,
                'Major Name': initialData.majorName,
                'Semester': [startDate, endDate],
            });
        }
    }, [form, initialData]);

    const handleSave = (values) => {
        const [startDate, endDate] = values['Semester'] || [];

        const newSubject = {
            id: initialData.id,
            name: values['Subject name'],
            majorName: values['Major Name'],
            semester: `${startDate.format('YYYY/MM/DD')}-${endDate.format('YYYY/MM/DD')}`,
        };

        onSave(newSubject);
    };

    const handleDateChange = (dates) => {
        console.log('Check date: ', dates)
        const [startDate, endDate] = dates || [];

        if (startDate && endDate) {
            console.log(`Start Date: ${startDate.format('DD-MM-YYYY')}`);
            console.log(`End Date: ${endDate.format('DD-MM-YYYY')}`);
        } else if (startDate) {
            console.log(`Start Date: ${startDate.format('DD-MM-YYYY')}`);
        } else if (endDate) {
            console.log(`End Date: ${endDate.format('DD-MM-YYYY')}`);
        }
    };

    const handleReset = () => {
        form.resetFields();
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
                <Form.Item
                    label="Range Picker"
                    name="Semester"
                    rules={[{ required: true, message: 'Please select a date range!' }]}
                >
                    <RangePicker onChange={handleDateChange} />
                </Form.Item>
                <Form.Item>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleReset} style={{ marginRight: 8 }}>Reset</Button>
                        <Button className='btn btn-warning' type="white" htmlType="submit">Save changes</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalEditSubject;

