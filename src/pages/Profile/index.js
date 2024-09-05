import { useState, useRef } from "react";
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Profile.module.scss';
import icons from "~/assets/icon";
import { faEnvelope, faFloppyDisk, faPenToSquare, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'Nguyễn Xuân Bính',
        username: 'xuanbinhne',
        phone: '0123455678',
        email: 'xuanbinh@gmail.com',
        phoneConfirmed: 'Yes',
        emailConfirmed: 'No',
        avatar: icons.defaultAvatar 
    });

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
    });

    const firstInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
        }, 0);
    };

    const handleSaveClick = () => {
        setErrors({
            name: '',
            username: '',
            phone: '',
            email: '',
        });

        let valid = true;

        if (!userInfo.name) {
            setErrors(prev => ({ ...prev, name: "Full Name is required." }));
            valid = false;
        }
        if (!userInfo.username) {
            setErrors(prev => ({ ...prev, username: "Username is required." }));
            valid = false;
        }
        if (!userInfo.phone) {
            setErrors(prev => ({ ...prev, phone: "Phone Number is required." }));
            valid = false;
        } else if (userInfo.phone.length < 10) {
            setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number." }));
            valid = false;
        }
        if (!userInfo.email) {
            setErrors(prev => ({ ...prev, email: "Email is required." }));
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userInfo.email)) {
                setErrors(prev => ({ ...prev, email: "Please enter a valid email address." }));
                valid = false;
            }
        }

        if (valid) {
            setIsEditing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
            return;
        }

        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserInfo((prevState) => ({
                    ...prevState,
                    avatar: reader.result || icons.defaultAvatar,
                }));
            };
            reader.readAsDataURL(file);
        }else{
            setUserInfo((prevState) => ({
                ...prevState,
                avatar: icons.defaultAvatar,
            }));
        }
    };

    return (
        <div className={cx('wrapper', 'container')}>
            <div className={cx('row', 'profile-card')}>
                <div className={cx('avatar', 'col-md-4', 'col-12')}>
                    <img 
                        className={cx('default-avatar')} 
                        src={userInfo.avatar || icons.defaultAvatar} 
                        alt="avatar" 
                    />
                    {isEditing && (
                        <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <button
                                className={cx('btn_avatar')}
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Change Avatar
                            </button>
                        </>
                    )}
                </div>
                <div className={cx('info', 'col-md-8', 'col-12')}>
                    <form>
                        <div className={cx('input-info')}>
                            <input
                                ref={firstInputRef}
                                className={cx('name', { 'read-only': !isEditing, 'error': errors.name })}
                                name="name"
                                value={userInfo.name}
                                readOnly={!isEditing}
                                onChange={handleChange}
                                placeholder="Full Name"
                            />
                            {errors.name && <div className={cx('error-message')}>{errors.name}</div>}
                        </div>
                        <div className={cx('input-info')}>
                            <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                            <input
                                className={cx('input-des', { 'read-only': !isEditing, 'error': errors.username })}
                                name="username"
                                value={userInfo.username}
                                readOnly={!isEditing}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            {errors.username && <div className={cx('error-message')}>{errors.username}</div>}
                        </div>
                        <div className={cx('input-info')}>
                            <FontAwesomeIcon icon={faPhone} className={cx('icon')} />
                            <input
                                className={cx('input-des', { 'read-only': !isEditing, 'error': errors.phone })}
                                name="phone"
                                value={userInfo.phone}
                                readOnly={!isEditing}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                inputMode="numeric"
                            />
                            {errors.phone && <div className={cx('error-message')}>{errors.phone}</div>}
                        </div>
                        <div className={cx('input-info')}>
                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                            <input
                                className={cx('input-des', { 'read-only': !isEditing, 'error': errors.email })}
                                name="email"
                                value={userInfo.email}
                                readOnly={!isEditing}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            {errors.email && <div className={cx('error-message')}>{errors.email}</div>}
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col-md-3', 'col-5', 'label-confirm')}>
                                <label>Phone confirmed:</label>
                                <label>Email confirmed:</label>
                            </div>
                            <div className={cx('col-md-9', 'col-7', 'right-confirm')}>
                                <input
                                    className={cx('input-confirm', 'read-only')}
                                    name="phoneConfirmed"
                                    value={userInfo.phoneConfirmed}
                                    readOnly
                                />
                                <input
                                    className={cx('input-confirm', 'read-only')}
                                    name="emailConfirmed"
                                    value={userInfo.emailConfirmed}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={cx('btn_edit')}>
                            {isEditing ? (
                                <button type="button" onClick={handleSaveClick}>
                                    Save Profile
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faFloppyDisk}/>
                                </button>
                            ) : (
                                <button type="button" onClick={handleEditClick}>
                                    Edit Profile 
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPenToSquare}/>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
