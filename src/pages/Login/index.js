import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Login.module.scss'
import icons from "~/assets/icon";
import images from "~/assets/images";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const handleLoginClick = () => {
        setErrors({
            username: '',
            password: '',
        });

        let valid = true;

        if (!username) {
            setErrors(prev => ({ ...prev, username: 'Username is required.' }));
            valid = false;
        }

        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required.' }));
            valid = false;
        }
        
        if (valid) {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
            }, 2000); 
        }
    };

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={cx('wrapper', 'container')}>
            <div className={cx('login-card', 'row')}>

                <div className={cx('right-card', 'col-md-6')}>
                    <img className={cx('logo')} src={images.logo} alt="NOAH Quiz"/>
                    <div className={cx('title-right')}>
                        <h2>Hi Welcome Back! </h2><img className={cx('icon-hand')} src={icons.hand} alt="welcome"/>
                    </div>
                    <div className={cx('title-des')}>
                        <h4>Hello again you have been missed!</h4>
                        <img className={cx('draw')} src={images.drawLogin} alt="Management"/>
                        <h4>Log in now to manage your projects easily!</h4>
                    </div>
                </div>

                <div className={cx('left-card', 'col-md-6')}>
                    <form className={cx('login-form')}>
                        <h1 className={cx('title-form')}>Log In</h1>
                        <div className={cx('input-container')}>
                            <div className={cx('input-wrapper', { 'error': errors.username })}>
                                <FontAwesomeIcon icon={faUser} className={cx('input-icon')} />
                                <input
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleChangeUsername}
                                    className={cx({ 'input-error': errors.username })}
                                />
                                 {errors.username && <div className={cx('error-message')}>{errors.username}</div>}
                            </div>
                            <div className={cx('input-wrapper', { 'error': errors.password })}>
                                <FontAwesomeIcon icon={faLock} className={cx('input-icon')} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChangePassword}
                                    className={cx({ 'input-error': errors.password })}
                                />
                                 {errors.password && <div className={cx('error-message')}>{errors.password}</div>}
                            </div>
                        </div>
                        <div className={cx('check-remember')}>
                            <input
                                type="checkbox"
                            />
                            <label>Remember me</label>
                        </div>
                        <button
                            type="button"
                            className={cx('btn-login')}
                            onClick={handleLoginClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                                'Login'
                            )}
                        </button>
                        <div className={cx('login-more')}>
                            <h5>Or Login With</h5>
                            <button className={cx('btn__login-google')}> 
                                <img className={cx('goole-icon')} src={icons.google} alt="google"/>
                                Login With Google
                            </button>
                        </div>
                        <div className={cx('forgot-password')}>
                            <Button
                                text
                                className={cx('btn-forgot')}
                            >
                                Forgot Your Password?
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
