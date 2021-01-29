import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "bootstrap/dist/css/bootstrap.css"
import { authenticateUser } from './LoginCtrl'
import { Redirect, Link } from "react-router-dom";

function Login() {
    const { register, handleSubmit, errors } = useForm();
    const [isNextView, setNextView] = useState(false);

    const onSubmit = data => {
        authenticateUser(data);
        setNextView(true);
    }
    return (
        <div className="container">
            {isNextView ? (< Redirect to="/work" />) :
                (<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">User Name :</label>
                        </div>
                        <div className="col">
                            <input
                                name="name"
                                placeholder="Enter user name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                ref={register({
                                    required: "Enter user name.!"
                                    // pattern: {
                                    //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    //     message: "Invalid email address format"
                                    // }
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="name" as="div" errors={errors} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="password">Password :</label>
                        </div>
                        <div className="col">
                            <input
                                name="password"
                                placeholder="Enter password"
                                className={`form-control ${errors.password ? "is-invalid" : ""
                                    }`}
                                ref={register({
                                    required: "Password is required.!",
                                    validate: value => value.length > 3 
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="password" as="div" errors={errors} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <button className="btn btn-primary" type="submit">Submit</button>
                            <div>
                                <Link to="/register">Create User</Link>
                            </div>
                        </div>
                    </div>
                </form>
                )}
        </div>
    );
}

export default Login;