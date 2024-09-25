import React, { useEffect, useState } from 'react';
import {
    DeleteOutlined, PlusOutlined, ProfileOutlined,
    DoubleRightOutlined, DoubleLeftOutlined, FormOutlined,
    BarsOutlined, CloseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../Modal/Modal_Delete';
import styles from './School.module.scss';
import ModalAddSchool from '../Modal/Modal_Add_School';
import ModalViewSchool from '../Modal/Modal_View_School';
import ModalEditSchool from '../Modal/Modal_Edit_School';
import axios from 'axios';


function School({ onSelectSchool }) {
    const [allSchools, setAllSchools] = useState([]);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [editingSchool, setEditingSchool] = useState(null);
    const [viewingSchool, setViewingSchool] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchoolIndex, setSelectedSchoolIndex] = useState(null);
    const [isAddSchoolModalVisible, setIsAddSchoolModalVisible] = useState(false);
    const [isViewSchoolModalVisible, setIsViewSchoolModalVisible] = useState(false);
    const [isEditSchoolModalVisible, setIsEditSchoolModalVisible] = useState(false);

    const navigate = useNavigate();


    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < allSchools.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleMore = () => {
        setShowAll(!showAll);
        setCurrentPage(0);
    };



    const handleDeleteClick = (index) => {
        setSelectedSchoolIndex(index);
        setIsModalOpen(true);
    };

    const handleEditClick = (school) => {
        console.log('Check ')
        setEditingSchool(school);
        setIsEditSchoolModalVisible(true);
    };
    const handleViewClick = (school) => {
        setViewingSchool(school);
        setIsViewSchoolModalVisible(true);
    };

    const handleModalOk = async () => {
        if (selectedSchoolIndex !== null) {
            const schoolToDelete = allSchools[selectedSchoolIndex];
            const idSchoolDelete = schoolToDelete.id;
            console.log('Check id school delete: ', idSchoolDelete);
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/${idSchoolDelete}`);
            console.log('Check res  axios.delete: ', res);
            const updatedSchools = allSchools.filter((_, index) => index !== selectedSchoolIndex);
            setAllSchools(updatedSchools);
            setCurrentPage(Math.max(0, Math.min(currentPage, Math.ceil(updatedSchools.length / itemsPerPage) - 1)));
            setSelectedSchoolIndex(null);
        }
        setIsModalOpen(false);
    };




    const handleModalCancel = () => {
        setSelectedSchoolIndex(null);
        setIsModalOpen(false);
    };


    const handleSaveChanges = async (updatedSchool) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/${updatedSchool.id}`, updatedSchool);
            console.log('Check res edit school: ', res);

            const updatedSchools = allSchools.map(school =>
                school.id === updatedSchool.id ? updatedSchool : school
            );

            //update
            setAllSchools(updatedSchools);
            setIsEditSchoolModalVisible(false);
        } catch (e) {
            console.log('Error updating school: ', e);
        }
    };

    const handleAddSchool = async (newSchool) => {
        // await axios.post(`${process.env.REACT_APP_API_URL}`, newSchool);
        // setAllSchools(prevSchools => [...prevSchools, newSchool]);
        // setIsAddSchoolModalVisible(false);

        try {

            //set Automatic increment of id
            const maxId = Math.max(...allSchools.map(school => parseInt(school.id)), 0);
            const newId = maxId + 1;
            newSchool.id = newId.toString();
            await axios.post(`${process.env.REACT_APP_API_URL}`, newSchool);
            setAllSchools(prevSchools => [...prevSchools, newSchool]);
            setIsAddSchoolModalVisible(false);
        } catch (error) {
            console.error('Error adding school:', error);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = showAll ? allSchools.length : startIndex + itemsPerPage;
    const currentSchools = allSchools.slice(startIndex, endIndex);
    const [sliderVisibilities, setSliderVisibilities] = useState([false]);
    const handleBtnClick = (index) => {
        const newSliderVisibilities = [...sliderVisibilities];
        newSliderVisibilities[index] = !newSliderVisibilities[index];
        setSliderVisibilities(newSliderVisibilities);
    };

    const handleRedirect = () => {
        navigate('/subject');
    };

    // Fetch data schools

    useEffect(() => {
        fetchSchools();
    }, [])

    const [schools, setSchools] = useState([]);

    const fetchSchools = async () => {
        // const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
        // console.log('Check data after fetching dataa schools: ', res.data);
        // setAllSchools(res.data);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
            setAllSchools(res.data);
        } catch (error) {
            console.error('Error fetching schools: ', error);
        }
    }

    const handleSchoolClick = (schoolID) => {
        localStorage.setItem('selectedSchoolId', schoolID);
        navigate(`/subject/${schoolID}`)
    }

    return (
        <>
            <ModalDelete
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            />

            <ModalAddSchool
                open={isAddSchoolModalVisible}
                onClose={() => setIsAddSchoolModalVisible(false)}
                onSave={handleAddSchool}
            />
            <ModalEditSchool
                open={isEditSchoolModalVisible}
                onClose={() => setIsEditSchoolModalVisible(false)}
                onSave={handleSaveChanges}
                school={editingSchool}
            />
            <ModalViewSchool
                open={isViewSchoolModalVisible}
                onOk={() => setIsViewSchoolModalVisible(false)}
                onCancel={() => setIsViewSchoolModalVisible(false)}
                school={viewingSchool}
            />
            <h2>School page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']}>
                <div className={styles['crud']}>
                    <button type='button' className='btn btn-primary' onClick={() => setIsAddSchoolModalVisible(true)}>
                        <PlusOutlined />&nbsp;Add school
                    </button>
                </div>
                <div className={styles['other-action']}>
                    <button
                        className='btn btn-danger'
                        onClick={handleMore}
                    >
                        {showAll ? 'Less' : 'More'}
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handlePrevious}
                        disabled={currentPage === 0 || showAll}
                    >
                        <DoubleLeftOutlined />&nbsp;Previous
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleNext}
                        disabled={(currentPage + 1) * itemsPerPage >= allSchools.length || showAll}
                    >
                        Next&nbsp;<DoubleRightOutlined />
                    </button>
                </div>
            </div>

            <div className={`container ${styles['card-container']}`}>
                <div className={`row row-cols-2 row-cols-lg-5 g-2 g-lg-3`}>
                    {currentSchools.map((school, index) => (
                        <div className={`col ${styles['col-card']}`} key={startIndex + index}>
                            <div className={`card ${styles.card}`}>
                                <div className={styles['fit-image']}

                                    onClick={() => handleSchoolClick(school.id)}>
                                    <img
                                        src={school.image}
                                        className={`card-img-top ${styles['card-img-top']} ${sliderVisibilities[startIndex + index] ? styles['slider-visible'] : ''}`}
                                        alt="School Image"
                                        height={120}
                                    />
                                </div>

                                {/* Cách 2 */}
                                <div className={styles['icons-slider']}>
                                    <input type='checkbox' id={`${styles['check']}-${index}`} style={{ display: 'none' }} />
                                    <label htmlFor={`${styles['check']}-${index}`}>
                                        <span id={styles['btn']} onClick={() => handleBtnClick(startIndex + index)}>
                                            {sliderVisibilities[startIndex + index] ? <CloseOutlined /> : <BarsOutlined />}
                                        </span>
                                    </label>
                                    <div className={`${styles['slider-container']} ${sliderVisibilities[startIndex + index] ? styles['visible'] : ''}`} >
                                        <a>
                                            <span><FormOutlined onClick={() => handleEditClick(school)} /></span>
                                        </a>
                                        <a>
                                            <span><DeleteOutlined onClick={() => handleDeleteClick(startIndex + index)} /></span>
                                        </a>
                                        <a>
                                            <span> <ProfileOutlined onClick={() => handleViewClick(school)} /></span>
                                        </a>
                                    </div>
                                </div>
                                <div className={`card-body ${styles['card-body']}`}>
                                    <h3
                                        className={`card-title ${styles['card-title']}`}
                                        onClick={handleRedirect}
                                    >
                                        {school.name}
                                    </h3>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
}
export default School;
