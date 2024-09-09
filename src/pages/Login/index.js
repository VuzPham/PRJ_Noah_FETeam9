import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faSpinner, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Login.module.scss'
import icons from "~/assets/icon";
import images from "~/assets/images";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        loginInput: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigator = useNavigate();

    const handleLoginClick = () => {
        setErrors({
            loginInput: '',
            password: '',
        });

        let valid = true;

        if (!loginInput) {
            setErrors(prev => ({ ...prev,  loginInput: 'Username is required.' }));
            valid = false;
        }

        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required.' }));
            valid = false;
        }
        
        if (valid) {
            setIsLoading(true);

            fetch("https://66da8eb4f47a05d55be5216b.mockapi.io/user/users")
                .then(reponse => reponse.json())
                .then(data => {
                        const user = data.find(
                        user =>
                            (user.username === loginInput || user.email === loginInput) && user.password === password
                    );

                    if(user){
                        navigator('/school');
                        
                    }else{
                        const userExist = data.find(
                            user => user.username === loginInput || user.email === loginInput
                        );

                        if(!userExist){
                            setErrors(prev => ({...prev, loginInput: 'Username or Email not fund.'}));
                        }else{
                            setErrors(prev => ({...prev, password: 'Password is incorrect.'}));
                        }
                    }
                })

                .catch(error => {
                    setIsLoading(false);
                })

            setTimeout(() => {
                setIsLoading(false);
            }, 1000); 
        }
    };

    const handleChangeLoginInput = (e) => {
        setLoginInput(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
                            <div className={cx('input-wrapper', { 'error': errors.loginInput })}>
                                <FontAwesomeIcon icon={faUser} className={cx('input-icon')} />
                                <input
                                    placeholder="Username or Email"
                                    value={loginInput}
                                    onChange={handleChangeLoginInput}
                                    className={cx({ 'input-error': errors.loginInput })}
                                />
                                 {errors.loginInput && <div className={cx('error-message')}>{errors.loginInput}</div>}
                            </div>
                            <div className={cx('input-wrapper', { 'error': errors.password })}>
                                <FontAwesomeIcon icon={faLock} className={cx('input-icon')} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChangePassword}
                                    className={cx({ 'input-error': errors.password })}
                                />
                                {password && (
                                    <span className={cx('toggle-password')} onClick={toggleShowPassword}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash: faEye}/>
                                    </span>
                                )}
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
