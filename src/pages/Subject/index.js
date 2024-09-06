import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import qs from 'qs';
import styles from './Subject.module.scss';
import ModalDelete from '../Modal/Modal_Delete';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name) => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {
                text: 'Male',
                value: 'male',
            },
            {
                text: 'Female',
                value: 'female',
            },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        render: (_, record) => (
            <Button
                icon={<EditOutlined />}
                size="small"
                type="link"
            // onClick={() => handleEdit(record)}
            >
                Edit
            </Button>
        ),
        width: '20%',
    },
];

const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

function Subject() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleDelete = () => {
        if (selectedRowKeys.length === 0) return;

        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        console.log('Deleting items with keys:', selectedRowKeys);

        setIsDeleteModalVisible(false);
        setSelectedRowKeys([]);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <h2>Subject page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']}>
                <div className={styles['crud']}>
                    <Button type="primary"><PlusOutlined />&nbsp;Add subject</Button>
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
            <ModalDelete
                open={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
            <Table
                columns={columns}
                rowKey={(record) => record.login.uuid}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={rowSelection}
            />
        </>
    );
}

export default Subject;
