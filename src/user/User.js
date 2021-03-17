import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "bootstrap/dist/css/bootstrap.css"
import { saveUser, userRoles } from '../user/UserCtrl'
import {
} from 'react-redux'
import { Label } from 'reactstrap';

export default function User() {

    const { register, handleSubmit, errors } = useForm();
    const [valid, setValid] = useState('');
    const [roles, setRoles] = useState({});

    useEffect(() => {
        console.log('valid updated.!');
    }, [valid]);

    useEffect(() => {
        console.log('fecthing user roles!');
        userRoles().then(response => {
            console.log("ROLES", response);
            setRoles(response.data)
        });
    }, []);

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
            <div style={{
                backgroundColor: "white", width: "60%", marginLeft: "20%", marginRight: "5%", marginTop: "2%"
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <Label for="name">Name</Label>
                        </div>
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
                            <Label for="password">Passord</Label>
                        </div>
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
                    <div className="row">
                        {
                            Object.keys(roles).map((item, index) => {
                                let rName = roles[item].role;
                                let roleId = roles[item].id;
                                return (
                                    <div  className="col" key={index}>
                                        <div>{rName}</div>
                                        <div> <input value={roleId} type="checkbox" key={index} ref={register}  name="roles" /></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                    <p>{valid}</p>
                </form>
            </div>
        </div>
    );
}