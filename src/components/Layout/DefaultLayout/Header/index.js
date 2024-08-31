import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleQuestion, faGraduationCap, faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

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
                                onClick={closeMenu}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGraduationCap} /> School
                            </NavLink>
                        </li>
                        <li className={cx('nav-item')}>
                            <NavLink
                                to="/subject"
                                className={({ isActive }) => cx('nav-link', { active: isActive })}
                                onClick={closeMenu}>
                                <FontAwesomeIcon className={cx('icon')} icon={faBook} /> Subject
                            </NavLink>
                        </li>
                        <li className={cx('nav-item')}>
                            <NavLink
                                to="/question"
                                className={({ isActive }) => cx('nav-link', { active: isActive })}
                                onClick={closeMenu}>
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
