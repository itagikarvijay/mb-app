import React, { useEffect, useState } from 'react'
import { fetchAllCustomerDetails, saveCustomer, fetchAllCustomerType } from './CustomerCtrl'
import { useDispatch, useStore } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { customerAction } from "../app-store/actions/customerAction";
import LoadingOverlay from 'react-loading-overlay';

function Customer() {
    const [customer, setCustomer] = useState('');
    const [message, setMessage] = useState('Loading content...');
    const [errorMessage, setErrorMessage] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [partyTypes, setPartyTypes] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        Object.keys(customerFromStore).map((item, index) => {
            if (customer === customerFromStore[item].name) {
                setValue("id", customerFromStore[item].id)
                setValue("name", customerFromStore[item].name)
                setValue("mobileNo", customerFromStore[item].mobileNo)
                setValue("email", customerFromStore[item].email)
                setValue("addr1", customerFromStore[item].addr1)
                setValue("addr2", customerFromStore[item].addr2)
                setValue("city", customerFromStore[item].city)
                setValue("pinCode", customerFromStore[item].pinCode)
                setValue("gstin", customerFromStore[item].gstin)
                setValue("stateid", customerFromStore[item].stateId)
                setValue("startDate", customerFromStore[item].startDate)
                setValue("obAmount", customerFromStore[item].obAmount)
                setValue("createDate", customerFromStore[item].createDate)
                setValue("createByUser", customerFromStore[item].id)
                setValue("updatedByUser", customerFromStore[item].updatedByUser)
                setValue("inactive", customerFromStore[item].inactive)
                setValue("partyType", customerFromStore[item].partyType.id)
            }
        });
    }, [customer]);

    useEffect(() => {
        fetchAllCustomerDetails().then(response => {
            for (const value of response.data) {
                dispatch(customerAction(value));
            }
            setIsActive(false);
        }).catch(error => {
            setIsActive(false);
            setErrorMessage(error.response.data.message)
        });
        fetchAllCustomerType().then(response => {
            console.log(response);
            let values = [];
            for (const val of response.data) {
                values.push(<option key={val.id} value={val.id}>{val.name}</option>)
            }
            setPartyTypes(values);
        });
    }, []);
    const customerFromStore = useStore().getState().customerReducer.customerList;
    const { register, handleSubmit, errors, setValue } = useForm();

    const onSubmit = (data) => {
        setIsActive(true);
        setErrorMessage('');
        setMessage('Saving content...')
        saveCustomer(data).then(response => {
            dispatch(customerAction(response.data));
            setIsActive(false);
        }).catch(error => {
            setIsActive(false);
            setErrorMessage(error.response.data.message)
        });
    };
    return (
        <div class="container">
            <LoadingOverlay
                active={isActive}
                spinner
                text={message}
            >
                <div className="row" style={{ paddingTop: '25px' }}>
                    <div className="col-sm-4">Customers&nbsp;
                        <input onChange={clicked} list="customerList" name="customerLst" id="customerLst"></input>
                        <datalist id="customerList">
                            {
                                Object.keys(customerFromStore).map((item, index) => {
                                    let name = customerFromStore[item].name;
                                    let id = customerFromStore[item].id;
                                    return (
                                        <option value={name} key={index}>{name}</option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                </div>
                <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="hidden"
                            name="id"
                            ref={register()}
                        />
                        <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                            <div className="p-2" style={{ fontWeight: 'bold' }}>
                                <label>Name</label>
                            </div>
                            <div className="p-2">
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'Name should contain only characters.'
                                        }
                                    })}
                                    className={`${errors.name ? 'input-error' : ''}`}
                                />
                                {errors.name && (
                                    <p className="errorMsg">{errors.name.message}</p>
                                )}
                            </div>
                        </div>
                        {/* Party Type */}
                        <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                            <div className="p-2" style={{ fontWeight: 'bold' }}>
                                <label>Party Type</label>
                            </div>
                            <div className="p-2">
                                <select ref={register()} name="partyType">
                                    {partyTypes}
                                </select>
                            </div>
                        </div>
                        {/* Mobile No */}
                        <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                            <div className="p-2" style={{ fontWeight: 'bold' }}>
                                <label for="mobileNo" >Mobile No</label>
                            </div>
                            <div className="p-2">
                                <input
                                    type="text"
                                    name="mobileNo"
                                    autoComplete="off"
                                    className={`form-control ${errors.mobileNo ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Mobile number is required.',
                                        pattern: {
                                            value: /^([+]\d{2})?\d{10}$/,
                                            message: 'Mobile should contain only 10 numbers .'
                                        }
                                    })}
                                    className={`${errors.mobileNo ? 'input-error' : ''}`}
                                />
                                {errors.mobileNo && (
                                    <p className="errorMsg">{errors.mobileNo.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold' }}>
                            <label>Email Id</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                ref={register({
                                    required: 'Email is required.',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                        message: 'Enter valid email.!'
                                    }
                                })}
                                className={`${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && (
                                <p className="errorMsg">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    {/* Addr 1 */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold' }}>
                            <label>Address(1)</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="addr1"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* Addr 2 */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold' }}>
                            <label>Address(2)</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="addr2"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* City */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>City</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="city"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* Pin code */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>Pin code</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="pinCode"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* GSTIN */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>GSTIN</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="gstin"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* STATE ID */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2">
                            <label style={{ fontWeight: 'bold', textAlign: 'right' }}>State Id</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="stateid"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* START DATE */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>Start Date</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="date"
                                name="startDate"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* OB AMT */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2">
                            <label style={{ fontWeight: 'bold', textAlign: 'right' }}>Ob/Amt.</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="obAmount"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* CREATE DATE */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>Crated Date</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="date"
                                name="createDate"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* CREATE BY USER*/}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavender', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>Created By</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="createByUser"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* UPDATED BY USER*/}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ paddingLeft: "5px", backgroundColor: 'lavenderblush', marginTop: '10px' }}>
                        <div className="p-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                            <label>Updated By</label>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                name="updatedByUser"
                                className="form-control"
                                ref={register()}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* ACTIVE */}
                    <div className="d-flex flex-row text-black justify-content-around" style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>
                        <div className="p-2">
                            <label for="inactive">Active</label>&nbsp;
                        </div>
                        <div className="p-2">
                            <input style={{ size: '20px' }}
                                type="checkbox"
                                name="inactive"
                                ref={register()}
                            />
                        </div>
                    </div>
                    <Button variant="primary" type="submit">Save</Button>
                    <span style={{ color: 'red' }}>{errorMessage}</span>
                </Form>
            </LoadingOverlay>
        </div>
    )

    function clicked(eve) {
        setCustomer(eve.target.value)
        setErrorMessage('');
        setValue("id", 0);
    }
}

export default Customer