import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';


export const LoginView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        if (isFormValid()) {
            var TOKEN = localStorage.getItem("TOKEN")
            const inputData = Object.fromEntries(new FormData(event.target));
            console.log(inputData)
            actions.fetchLogin(inputData).then((user) => {
                if (TOKEN) {
                    navigate("/private")
                } else {
                    navigate("/login")
                }
            })
        }
    };

    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = () => password.length >= 8;

    const isFormValid = () => isEmailValid() && isPasswordValid();

    return (
        <div className="sign-in-body testlogin">
            <section className="sign-in">
                <div className="login-container">
                    <div className="signin-content">
                        <div className="signin-form">
                            <h2 className="form-title">Inicio de sesión</h2>
                            <form onSubmit={handleLogin} className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="your_email">
                                        <i className="logib-label zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="your_email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E-mail"
                                        className={isEmailValid() ? '' : 'invalid-input'}
                                    />
                                    {!isEmailValid() && <span className="warning-message">Email no valido</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass">
                                        <i className="logib-label zmdi zmdi-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="your_pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className={isPasswordValid() ? '' : 'invalid-input'}
                                    />
                                    {!isPasswordValid() && <span className="warning-message">Contraseña debe tener mínimo 8 caracteres</span>}
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


