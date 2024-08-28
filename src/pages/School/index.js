import React, { useState } from 'react';
import styles from './School.module.scss';
import img from '../../assets/images/bg2.jpg';
import img1 from '../../assets/images/bg1.jpg';
import { EditOutlined, DeleteOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


function School() {
    const allSchools = [
        { name: 'School 1', image: img },
        { name: 'School 2', image: img1 },
        { name: 'School 3', image: img },
        { name: 'School 4', image: img1 },
        { name: 'School 5', image: img },
        { name: 'School 6', image: img1 },
        { name: 'School 7', image: img },
        { name: 'School 8', image: img1 },
        { name: 'School 9', image: img },
        { name: 'School 10', image: img },
        { name: 'School 11', image: img1 },
        { name: 'School 12', image: img },
        { name: 'School 13', image: img },
        { name: 'School 14', image: img },
        { name: 'School 15', image: img1 },
        { name: 'School 16', image: img },
        { name: 'School 17', image: img },
        { name: 'School 18aaaaaaaaaaaaaaaaaaaaaaaaaa', image: img },
        { name: 'School 19aaaa', image: img },
        { name: 'School 20aaaaaaaaaaaaaaaa', image: img1 }
    ];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [showAll, setShowAll] = useState(false);

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
        if (showAll) {
            setShowAll(false);
            setCurrentPage(0);
        } else {
            setShowAll(true);
            setCurrentPage(0);
        }
    };


    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/subject')
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = showAll ? allSchools.length : startIndex + itemsPerPage;
    const currentSchools = allSchools.slice(startIndex, endIndex);

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog ${styles['modal-dialog-centered']}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                            </form> */}


                            {/* <form>
                                <div className="mb-3">
                                    <label htmlFor="school-name" className="form-label">Tên trường:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="school-name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="establishment-date" className="form-label">Ngày thành lập:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="establishment-date"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fields-of-study" className="form-label">Các ngành:</label>
                                    <textarea
                                        className="form-control"
                                        id="fields-of-study"
                                        placeholder="Nhập các ngành học, phân cách bởi dấu phẩy"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="school-image" className="form-label">Hình ảnh:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="school-image"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Gửi</button>
                            </form> */}

                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="inputPassword4" />
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress2" class="form-label">Address 2</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">City</label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">State</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" />
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck" />
                                        <label class="form-check-label" for="gridCheck">
                                            Check me out
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Sign in</button>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>School page</h2>
            <hr className={styles.line} />
            <div className={styles['button-actions']}>
                <div className={styles['crud']}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <PlusOutlined type="plus" />Add school
                    </button>
                    <button type="button" className="btn btn-success"><EditOutlined key="edit" />Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
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
                        Previous
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleNext}
                        disabled={(currentPage + 1) * itemsPerPage >= allSchools.length || showAll}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className={`container ${styles['card-container']}`}>
                <div className={`row row-cols-2 row-cols-lg-5 g-2 g-lg-3 `}>
                    {currentSchools.map((school, index) => (
                        <div className={`col ${styles['col-card']}`} key={index} >
                            <div className={`card ${styles.card}`}>
                                <img src={school.image} className={`card-img-top ${styles['card-img-top']}`} alt="School Image" height={120}
                                    onClick={handleRedirect}
                                />
                                <div className={`card-body ${styles['card-body']}`}>
                                    <h3 className={`card-title ${styles['card-title']}`}
                                        onClick={handleRedirect}
                                    >{school.name}</h3>
                                    <div className={styles['card-actions']}>
                                        <h5>Actions</h5>
                                        <ProfileOutlined type="profile" />
                                        <EditOutlined key="edit" />
                                        <DeleteOutlined key="delete" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default School;

