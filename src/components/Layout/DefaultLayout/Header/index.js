import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleQuestion, faGraduationCap, faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null); 
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const schoolId = localStorage.getItem('selectedSchoolId');
        setSelectedSubjectId(schoolId);
    }, []);

    const handleSubjectClick = () => {
        const selectedSchoolId = localStorage.getItem('selectedSchoolId');
        if (selectedSchoolId) {
            navigate(`/subject/${selectedSchoolId}`);
        } else {
            console.log("No school selected");
        }
    };

    const handleQuestionClick = (e) => {
        if (!selectedSubjectId) {
            e.preventDefault();
        } else {
            closeMenu();
            navigate(`/question/${selectedSubjectId}`);
        }
    };

    const isOnSchoolPage = location.pathname === '/school';
    const isOnQuestionPage = location.pathname.startsWith('/question'); // Kiểm tra nếu đang ở trang Question
    const isSubjectPage = location.pathname.startsWith('/subject');
    const isProfilePage = location.pathname.startsWith('/profile');

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <nav>
                    <div className={cx('menu-icon')} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </div>
                    <ul className={cx('nav-list', { 'open': isMenuOpen })}>
                        <li className={cx('nav-item')}>
                            <NavLink
                                to="/school"
                                className={({ isActive }) => cx('nav-link', { active: isActive })}
                                onClick={() => {
                                    closeMenu();
                                    localStorage.removeItem('selectedSchoolId'); 
                                    setSelectedSubjectId(null);
                                }}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGraduationCap} /> School
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', { disabled: isOnSchoolPage || isProfilePage })}>
                            <NavLink
                                to={`/subject/${localStorage.getItem('selectedSchoolId')}`} 
                                className={({ isActive }) => cx('nav-link', { active: isActive })}
                                onClick={handleSubjectClick}>
                                <FontAwesomeIcon className={cx('icon')} icon={faBook} /> Subject
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', { disabled: isOnSchoolPage || isSubjectPage || isProfilePage  })}>
                            <NavLink
                                to={`/question/${selectedSubjectId}`}
                                className={({ isActive }) => cx('nav-link', { active: isActive || isOnQuestionPage })} 
                                onClick={handleQuestionClick}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCircleQuestion} /> Question
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', 'profile')}>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) => cx('nav-link', { active: isActive })}
                                onClick={closeMenu}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} /> Profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;
