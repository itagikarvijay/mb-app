import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "bootstrap/dist/css/bootstrap.css"
import { saveUser } from '../user/UserCtrl'

export default function User() {
    const { register, handleSubmit, errors } = useForm();
    const [valid, setValid] = useState('');

    useEffect(() => {
        console.log('I have been called.!');
    }, [valid]);

    const onSubmit = (data) => {
        console.log('Submitting form.!', data);
        saveUser(data).then(response => {
            console.log('response', response)
            if (response.status === 201) {
                setValid('User created successfully.!');
            }
        }).catch(error => {
            setValid('You are not authorised to create the user.!');
        });
    }

    return (
        <div className="container">
            <h4>Create User</h4>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <input
                                name="name"
                                placeholder="User Name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                ref={register({
                                    required: "Enter user name.!"
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="name" as="div" errors={errors} />
                          
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input
                                name="password"
                                placeholder="Enter password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                ref={register({
                                    required: "Enter password"
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="password" as="div" errors={errors} />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                    <p>{valid}</p>
                </form>
            </div>
        </div>
    );
}