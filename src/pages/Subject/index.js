//c3
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal } from 'antd';
import { EditOutlined, PlusOutlined, SearchOutlined, CloseCircleFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Subject.module.scss';
import ModalDelete from '../Modal/Modal_Delete';
import ModalAddSubject from '../Modal/Modal_Add_Subject';
import ModalEditSubject from '../Modal/Modal_Edit_Subject';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Subject() {

    const columns = [
        {
            title: 'Subject Name',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: 'Major Name',
            dataIndex: 'majorName',
            width: '20%',
            filters: [
                { text: 'KHTN', value: 'KHTN' },
                { text: 'KHXH', value: 'KHXH' },
                { text: 'Đại Cương', value: 'Đại Cương' },
                { text: 'Môn học bắt buộc', value: 'Môn học bắt buộc' },
                { text: 'Môn học tự chọn', value: 'Môn học tự chọn' }
            ],
            onFilter: (value, record) => record.majorName.includes(value),
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            width: '20%',
            render: semester => {
                console.log('Check semester bên file subject: ', semester)
                const [start, end] = semester.split('-');
                if (start && end) {
                    const startMonthYear = moment(start, 'YYYY/MM/DD').format('MM/YYYY');
                    const endMonthYear = moment(end, 'YYYY/MM/DD').format('MM/YYYY');

                    return `${startMonthYear} - ${endMonthYear}`;
                }
            }
        },
        {
            title: 'Total Questions',
            dataIndex: 'question',

            render: question => {
                console.log('Check total question: ', question)
                return question ? question.length : 0;
            }

        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        style={{ borderRight: '1px solid gray' }}
                        icon={<EditOutlined />}
                        size="small"
                        type="link"
                        onClick={() => handleEditSubjectClick(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        type="link"
                        onClick={() => handleViewQuestions(record.id)}
                    >
                        View Questions
                    </Button>
                </>
            ),
            width: '20%',
        },
    ];

    //handle view question
    const handleViewQuestions = (id) => {
        navigate(`/question/${id}`)
    }


    const { id } = useParams();
    const fetSubjectFromSchool = async (id) => {
        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
            if (res) {
                const subjects = await res.data;
                const schoolId = id;
                const schoolIds = subjects.find(u => u.id == schoolId);
                console.log('Check subjects from school id: ', schoolIds.subjects)
                setInitialData(schoolIds.subjects);
                // setDataSource(schoolIds.subjects);
            } else {
                console.log('Not found!!!!');
            }

        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }

    useEffect(() => {
        console.log('Lấy id từ param: ', id);
        fetSubjectFromSchool(id);
    }, [id])

    const [initialData, setInitialData] = useState([]);
    useEffect(() => {
        setDataSource(initialData);
    }, [initialData]);

    const [dataSource, setDataSource] = useState(initialData);
    const [searchValue, setSearchValue] = useState('');
    const [temporarySearchValue, setTemporarySearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAddSubjectModalVisible, setIsAddSubjectModalVisible] = useState(false);

    const [isEditSubjectModalVisible, setIsEditSubjectModalVisible] = useState(false);
    const [editSubjectData, setEditSubjectData] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);


    useEffect(() => {
        if (temporarySearchValue) {
            const filteredData = dataSource.filter(entry =>
                `${entry.name}`.toLowerCase().includes(temporarySearchValue.toLowerCase())
            );
            setDataSource(filteredData);
        } else {
            setDataSource(initialData);
        }
    }, [temporarySearchValue]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleDelete = () => {
        console.log('View handleDelete: ', selectedRowKeys)
        if (selectedRowKeys.length === 0) return;
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        console.log('View handleDeleteConfirm: ', selectedRowKeys)
        const newData = dataSource.filter(item => !selectedRowKeys.includes(item.id));
        setDataSource(newData);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleSearchClick = () => {
        setTemporarySearchValue(searchValue);
    };

    const handleClearSearch = () => {
        setSearchValue('');
        setTemporarySearchValue('');
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const handleAddSubjectClick = () => {
        setIsAddSubjectModalVisible(true);
    };

    const handleAddSubjectModalClose = () => {
        setIsAddSubjectModalVisible(false);
    };



    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleEditSubjectClick = (record) => {
        setEditSubjectData(record);
        setIsEditSubjectModalVisible(true);
    };

    const handleEditSubjectModalClose = () => {
        setIsEditSubjectModalVisible(false);
        setEditSubjectData(null);
    };

    const navigate = useNavigate();



    //add subject has range date
    const handleAddSubjectSave = (newSubject) => {
        console.log('Check value before saving: ', newSubject)
        //Convert range date
        const newData = {
            ...newSubject,
        };
        setDataSource([newData, ...dataSource]);
        console.log('Check value after saving: ', newData)
        handleAddSubjectModalClose();
    };

    const handleEditSubjectSave = (updatedSubject) => {
        const updatedDataSource = dataSource.map(item =>
            item.id === updatedSubject.id ? { ...item, ...updatedSubject } : item,
        );
        setDataSource(updatedDataSource);
        handleEditSubjectModalClose();
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <h2>Subject page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']} style={{ textAlign: 'center' }}>
                <div className={styles['crud']}>
                    <Button type="primary" onClick={handleAddSubjectClick}>
                        <PlusOutlined />&nbsp;Add subject
                    </Button>
                    <Button
                        type="danger"
                        className={`btn btn-danger ${hasSelected ? '' : styles['disable-choose']}`}
                        onClick={handleDelete}
                        disabled={!hasSelected}
                        style={{ display: 'flex' }}
                    >
                        <DeleteOutlined />&nbsp;Delete
                    </Button>
                </div>
                <div style={{ marginTop: 16 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </div>
            </div>
            <div style={{ textAlign: 'center', margin: '16px' }}>
                <Input
                    placeholder="Search Name"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    suffix={
                        searchValue ? (
                            <>
                                <CloseCircleFilled onClick={handleClearSearch} style={{ marginRight: 10 }} />
                                <SearchOutlined onClick={handleSearchClick} />
                            </>
                        ) : (
                            <SearchOutlined onClick={handleSearchClick} />
                        )
                    }
                    style={{
                        marginBottom: 16,
                        width: inputFocused || searchValue ? '50%' : '40%',
                        transition: 'width 0.3s ease',
                        borderRadius: '20px'
                    }}
                />
            </div>

            <ModalDelete
                open={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />

            <ModalAddSubject
                open={isAddSubjectModalVisible}
                onClose={handleAddSubjectModalClose}
                onSave={handleAddSubjectSave}
            />

            <ModalEditSubject
                open={isEditSubjectModalVisible}
                onClose={handleEditSubjectModalClose}
                onSave={handleEditSubjectSave}
                initialData={editSubjectData}
            />
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={rowSelection}
                scroll={{ y: 400 }}
            />

        </>
    );
}

export default Subject;

