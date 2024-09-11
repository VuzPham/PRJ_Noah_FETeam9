//c3

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Modal } from 'antd';
import { EditOutlined, PlusOutlined, SearchOutlined, CloseCircleFilled, EyeOutlined } from '@ant-design/icons';
import styles from './Subject.module.scss';
import ModalDelete from '../Modal/Modal_Delete';
import ModalAddSubject from '../Modal/Modal_Add_Subject';
import ModalEditSubject from '../Modal/Modal_Edit_Subject';




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
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            width: '20%',
        },
        {
            title: 'Total Questions',
            dataIndex: 'totalQuestions',
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
                    // onClick={() => handleViewQuestions(record)}
                    >
                        View Questions
                    </Button>
                </>
            ),
            width: '20%',
        },
    ];

    // const initialData = [
    //     { id: 1, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 2, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 3, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 4, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 5, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 6, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 7, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 8, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 9, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 10, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 11, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 12, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 13, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 14, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 15, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 16, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 17, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 },
    //     { id: 18, name: 'Subject 3', majorName: 'Major A', semester: '2021-2022', totalQuestions: 30 },
    //     { id: 19, name: 'Subject 1', majorName: 'Major A', semester: '2021-2022', totalQuestions: 20 },
    //     { id: 20, name: 'Subject 2', majorName: 'Major B', semester: '2021-2022', totalQuestions: 25 }
    // ];
    // const [dataSource, setDataSource] = useState(initialData);
    const [dataSource, setDataSource] = useState([]);
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

    // useEffect(() => {
    //     if (temporarySearchValue) {
    //         const filteredData = dataSource.filter(entry =>
    //             `${entry.name}`.toLowerCase().includes(temporarySearchValue.toLowerCase())
    //         );
    //         setDataSource(filteredData);
    //     } else {
    //         setDataSource(initialData);
    //     }
    // }, [temporarySearchValue]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://66daa7d5f47a05d55be574f4.mockapi.io/api/v1/subjects'); 
                setDataSource(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (temporarySearchValue) {
            const filteredData = dataSource.filter(entry =>
                `${entry.name}`.toLowerCase().includes(temporarySearchValue.toLowerCase())
            );
            setDataSource(filteredData);
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://66daa7d5f47a05d55be574f4.mockapi.io/api/v1/subjects');
                    setDataSource(response.data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };
            fetchData();
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

    // const handleDeleteConfirm = () => {
    //     console.log('View handleDeleteConfirm: ', selectedRowKeys)
    //     const newData = dataSource.filter(item => !selectedRowKeys.includes(item.id));
    //     setDataSource(newData);
    //     setSelectedRowKeys([]);
    //     setIsDeleteModalVisible(false);
    // };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`https://66daa7d5f47a05d55be574f4.mockapi.io/api/v1/subjects/${selectedRowKeys[0]}`); 
            setDataSource(dataSource.filter(item => !selectedRowKeys.includes(item.id)));
            setSelectedRowKeys([]);
        } catch (error) {
            console.error('Delete failed: ', error);
        }
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

    // const handleAddSubjectSave = (newSubject) => {
    //     setDataSource([newSubject, ...dataSource]);
    //     handleAddSubjectModalClose();
    // };

    const handleAddSubjectSave = async (newSubject) => {
        try {
            const response = await axios.post('https://66daa7d5f47a05d55be574f4.mockapi.io/api/v1/subjects', newSubject);
            setDataSource([response.data, ...dataSource]);
        } catch (error) {
            console.error('Error adding subject: ', error);
        }
        handleAddSubjectModalClose();
    };

    const handleEditSubjectSave = async (updatedSubject) => {
        try {
            const response = await axios.put(`https://66daa7d5f47a05d55be574f4.mockapi.io/api/v1/subjects/${updatedSubject.id}`, updatedSubject);
            const updatedDataSource = dataSource.map(item =>
                item.id === updatedSubject.id ? { ...item, ...response.data } : item
            );
            setDataSource(updatedDataSource);
        } catch (error) {
            console.error('Error updating subject: ', error);
        }
        handleEditSubjectModalClose();
    };

    //add subject has range date
    // const handleAddSubjectSave = (newSubject) => {
    //     //Convert range date
    //     const newData = {
    //         ...newSubject,
    //          semester: formatSemester(newSubject.semester),
    //     };
    //     setDataSource([newData, ...dataSource]);
    //     handleAddSubjectModalClose();
    // };

    // const formatSemester = (semester) => {
    //     if (!semester) return null;
    //     const [startYear, endYear] = semester.split('-');
    //     return `${startYear}-${endYear}`;
    // };

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

    // const handleEditSubjectSave = (updatedSubject) => {
    //     const updatedDataSource = dataSource.map(item =>
    //         item.id === updatedSubject.id ? { ...item, ...updatedSubject } : item
    //     );
    //     setDataSource(updatedDataSource);
    //     handleEditSubjectModalClose();
    // };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <h2>Subject page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']} style={{ textAlign: 'center' }}>
                <div className={styles['crud']}>
                    <Button type="primary" onClick={handleAddSubjectClick}>
                        <PlusOutlined /> Add subject
                    </Button>
                    <Button
                        type="danger"
                        className={`btn btn-danger ${hasSelected ? '' : styles['disable-choose']}`}
                        onClick={handleDelete}
                        disabled={!hasSelected}
                    >
                        Delete
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
            />
        </>
    );
}

export default Subject;


