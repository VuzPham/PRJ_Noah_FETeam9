// import React, { useEffect, useState } from 'react';
// import { Table } from 'antd';
// import qs from 'qs';

// import styles from './Subject.module.scss';
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         sorter: true,
//         render: (name) => `${name.first} ${name.last}`,
//         width: '20%',
//     },
//     {
//         title: 'Gender',
//         dataIndex: 'gender',
//         filters: [
//             {
//                 text: 'Male',
//                 value: 'male',
//             },
//             {
//                 text: 'Female',
//                 value: 'female',
//             },
//         ],
//         width: '20%',
//     },
//     {
//         title: 'Email',
//         dataIndex: 'email',
//     },
// ];
// const getRandomuserParams = (params) => ({
//     results: params.pagination?.pageSize,
//     page: params.pagination?.current,
//     ...params,
// });

// function Subject() {
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState({
//         pagination: {
//             current: 1,
//             pageSize: 10,
//         },
//     });
//     const fetchData = () => {
//         setLoading(true);
//         fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//             .then((res) => res.json())
//             .then(({ results }) => {
//                 setData(results);
//                 setLoading(false);
//                 setTableParams({
//                     ...tableParams,
//                     pagination: {
//                         ...tableParams.pagination,
//                         total: 200,
//                     },
//                 });
//             });
//     };
//     useEffect(() => {
//         fetchData();
//     }, [
//         tableParams.pagination?.current,
//         tableParams.pagination?.pageSize,
//         tableParams?.sortOrder,
//         tableParams?.sortField,
//         JSON.stringify(tableParams.filters),
//     ]);
//     const handleTableChange = (pagination, filters, sorter) => {
//         setTableParams({
//             pagination,
//             filters,
//             sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
//             sortField: Array.isArray(sorter) ? undefined : sorter.field,
//         });

//         if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//             setData([]);
//         }
//     };

//     return (
//         <>
//             <h2>Subject page</h2>
//             <hr className={styles.line} />
//             <div className={styles['button-actions']}>
//                 <div className={styles['crud']}>
//                     <button type="button" className="btn btn-primary">Add school</button>
//                     <button type="button" className="btn btn-success">Edit</button>
//                     <button type="button" className="btn btn-danger">Delete</button>
//                 </div>
//             </div>
//             <Table
//                 columns={columns}
//                 rowKey={(record) => record.login.uuid}
//                 dataSource={data}
//                 pagination={tableParams.pagination}
//                 loading={loading}
//                 onChange={handleTableChange}
//             />
//         </>


//     )
// }

// export default Subject;


// import React, { useEffect, useState } from 'react';
// import { Table, Button, Space } from 'antd';
// import qs from 'qs';
// import styles from './Subject.module.scss';

// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         sorter: true,
//         render: (name) => `${name.first} ${name.last}`,
//         width: '20%',
//     },
//     {
//         title: 'Gender',
//         dataIndex: 'gender',
//         filters: [
//             {
//                 text: 'Male',
//                 value: 'male',
//             },
//             {
//                 text: 'Female',
//                 value: 'female',
//             },
//         ],
//         width: '20%',
//     },
//     {
//         title: 'Email',
//         dataIndex: 'email',
//     },
//     {
//         title: 'Actions',
//         dataIndex: 'actions',
//     },
// ];

// const getRandomuserParams = (params) => ({
//     results: params.pagination?.pageSize,
//     page: params.pagination?.current,
//     ...params,
// });

// function Subject() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState({
//         pagination: {
//             current: 1,
//             pageSize: 10,
//         },
//     });
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//     const fetchData = () => {
//         setLoading(true);
//         fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//             .then((res) => res.json())
//             .then(({ results }) => {
//                 setData(results);
//                 setLoading(false);
//                 setTableParams({
//                     ...tableParams,
//                     pagination: {
//                         ...tableParams.pagination,
//                         total: 200, // You might want to update this according to the actual total count
//                     },
//                 });
//             });
//     };

//     useEffect(() => {
//         fetchData();
//     }, [
//         tableParams.pagination?.current,
//         tableParams.pagination?.pageSize,
//         tableParams?.sortOrder,
//         tableParams?.sortField,
//         JSON.stringify(tableParams.filters),
//     ]);

//     const handleTableChange = (pagination, filters, sorter) => {
//         setTableParams({
//             pagination,
//             filters,
//             sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
//             sortField: Array.isArray(sorter) ? undefined : sorter.field,
//         });

//         if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//             setData([]);
//         }
//     };

//     const onSelectChange = (newSelectedRowKeys) => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };

//     const hasSelected = selectedRowKeys.length > 0;

//     return (
//         <>
//             <h2>Subject page</h2>
//             <hr className={styles.line} />
//             <div className={styles['button-actions']}>
//                 <div className={styles['crud']}>
//                     <Button type="primary">Add school</Button>
//                     <Button type="default" className="btn btn-success">Edit</Button>
//                     <Button type="danger" className="btn btn-danger">Delete</Button>
//                 </div>
//                 <div style={{ marginTop: 16 }}>
//                     {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//                 </div>
//             </div>
//             <Table
//                 columns={columns}
//                 rowKey={(record) => record.login.uuid}
//                 dataSource={data}
//                 pagination={tableParams.pagination}
//                 loading={loading}
//                 onChange={handleTableChange}
//                 rowSelection={rowSelection}
//             />
//         </>
//     );
// }

// export default Subject;



import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'; // Import biểu tượng
import qs from 'qs';
import styles from './Subject.module.scss';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name) => `${name.first} ${name.last}`, // Sửa lỗi cú pháp ở đây
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
                icon={<EditOutlined type='edit' />}
                // onClick={() => handleEdit(record)}
                size="small"
                type="link"
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
                        total: 200, // Bạn có thể cập nhật giá trị này tùy theo số lượng tổng thực tế
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

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;


    // const handleEdit = (record) => {
    //     console.log('Edit record:', record);
    //     // Thực hiện logic chỉnh sửa ở đây
    // };

    return (
        <>
            <h2>Subject page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']}>
                <div className={styles['crud']}>
                    <Button type="primary">Add school</Button>
                    <Button type="default" className="btn btn-success">Edit</Button>
                    <Button type="danger" className="btn btn-danger">Delete</Button>
                </div>
                <div style={{ marginTop: 16 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </div>
            </div>
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




