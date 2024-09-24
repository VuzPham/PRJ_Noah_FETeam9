import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faEnvelope, faFloppyDisk, faPenToSquare, faPhone, faUser, faSpinner  } from "@fortawesome/free-solid-svg-icons";

import styles from './Profile.module.scss';
import icons from "~/assets/icon";
import { useAuth } from "~/auth/AuthContext";

const cx = classNames.bind(styles);

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        phoneConfirmed: '',
        emailConfirmed: '',
        avatar: icons.defaultAvatar 
    });

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const{user, updateUser} = useAuth();
    const navigator = useNavigate();

    const firstInputRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if(!user){
            navigator('/login');
        }else{
            // Cập nhật thông tin người dùng từ AuthContext
            setUserInfo({
                name: user.name || '',
                username: user.username || '',
                phone: user.phone || '',
                email: user.email || '',
                phoneConfirmed: user.phoneconfirm || '',
                emailConfirmed: user.emailconfirm || '',
                avatar: user.avatar || icons.defaultAvatar,
            });
        }
    }, [user, navigator]);

    const handleEditClick = (e) => {
        e.preventDefault()
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
            setIsLoading(true);
    
            const updateUserInfo = {
                ...user,  // Giữ nguyên các thông tin cũ không thay đổi
                name: userInfo.name,
                username: userInfo.username,
                phone: userInfo.phone,
                email: userInfo.email,
                avatar: userInfo.avatar,  
            };
    
            saveUserInfo(updateUserInfo);
        }
    };

    const saveUserInfo = (updateUserInfo) => {
        axios.put(`http://localhost:3001/user/${user.id}`, updateUserInfo)
            .then((response) => {
                const data = response.data;
                console.log("Profile updated successfully:", data);
                setIsEditing(false);
                setIsLoading(false);
                updateUser(data);  // Cập nhật lại user trong context
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                setIsLoading(false);
            });
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
            
            // Đọc file ảnh và hiển thị tạm thời
            reader.onloadend = () => {
                setUserInfo(prevState => ({
                    ...prevState,
                    avatar: reader.result // URL tạm thời của ảnh
                }));
            };
            
            reader.readAsDataURL(file); 
    
            // Cập nhật thông tin người dùng với avatar mới
            const updateUserInfo = {
                ...userInfo,
                avatar: reader.result // Lưu trữ URL base64
            };
    
            setIsLoading(true);
    
            // Gửi request lên server để cập nhật avatar
            fetch(`http://localhost:3001/users/${user.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUserInfo),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Avatar updated successfully:", data);
                setUserInfo(data); // Cập nhật userInfo với dữ liệu mới
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error updating avatar:', error);
                setIsLoading(false);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEditing){
            handleSaveClick();
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
                    <form onSubmit={handleSubmit}>
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
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon className={cx('icon-btn')} icon={faSpinner} spin />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            Save Profile
                                            <FontAwesomeIcon className={cx('icon-btn')} icon={faFloppyDisk} />
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button type="button" onClick={handleEditClick}>
                                    Edit Profile 
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPenToSquare} />
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
