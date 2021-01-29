import React, { } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "bootstrap/dist/css/bootstrap.css"
import { saveUser } from '../user/UserCtrl'
export default function User() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log('Submitting form.!', data);
        saveUser(data);
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
                                name="pwd"
                                placeholder="Enter password"
                                className={`form-control ${errors.pwd ? "is-invalid" : ""}`}
                                ref={register({
                                    required: "Enter password"
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="pwd" as="div" errors={errors} />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}