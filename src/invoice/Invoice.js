import React, { useEffect, useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { Form, Button } from 'react-bootstrap';
import { fetchAllCustomers } from '../customer/CustomerAPI'
import { useStore } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';
import { loadAll } from '../products/ProductAPI'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

function Invoice() {

    const { register, handleSubmit, errors, setValue } = useForm();
    const [message, setMessage] = useState('Loading content...');
    const [modalMessage, setModalMessage] = useState('');
    const [type, setType] = useState('Invoice');
    const [isActive, setIsActive] = useState(true);
    const [customerFromStore, setCustomerFromStore] = useState([])
    const [productList, setProductList] = useState([])
    const [smShow, setSmShow] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [rate, setRate] = useState(0);
    const [amount, setAmount] = useState(0.00);
    const [stock, setStock] = useState(0);

    let [cartList, setCartList] = useState([])
    let [productSelected, setProductSelected] = useState({})

    const refQty = useRef('');
    const productRef = useRef('')
    const customerRef = useRef('')

    useEffect(() => {
        fetchAllCustomers().then(response => {
            console.log('Invoice All Customer ', response)
            setCustomerFromStore(response.data)
            loadAll().then(response => {
                console.log(response.data)
                setProductList(response.data)
                setIsActive(false);
            })
        })
    }, []);

    const onProductChangeEvent = (event) => {
        console.log('Event', event.target.value)
        let data = productList.find(element => element.name === event.target.value);
        console.log('DATA', data)
        if (data !== undefined) {
            setProductSelected(data);
            setStock(data.stock);
            setRate(data.productRates[0].rate);
        }
    }

    const onAddEvent = (event) => {
        console.log('Add Event', productSelected)
        console.log('cartList', cartList)
        console.log('Qty', refQty.current.value);
        console.log('product', productRef.current.value)
        let temp = [];
        if ((productRef.current.value.length == 0 || productRef.current.value === undefined)) {
            setModalMessage('Please select product before adding to the cart.!')
            setSmShow(true);
        } else if ((refQty.current.value.length == 0 || refQty.current.value === undefined)) {
            setModalMessage('Please enter quantity before adding to the cart.!')
            setSmShow(true);
        } else {
            let check = cartList.find(element => element.id === productSelected.id ? true : false)
            if (check) {
                console.log('Product added');
                setModalMessage('Product ' + productSelected.name + ' is present in the cart.!');
                setSmShow(true)
            } else {
                let amt = amount + parseFloat(refQty.current.value) * rate
                setAmount(amt);
                temp.push(...cartList, { id: productSelected.id, name: productSelected.name, qty: refQty.current.value, amt: amount });
                setCartList(temp);
                document.getElementById('btnSave').style.display = 'block';
                document.getElementById('btnCancel').style.display = 'block';
            }

        }
        console.log('cartList', cartList);
    }
    const removeElement = (event) => {
        let deductAmt = 0;
        let index = parseInt(event.target.attributes['data-rownum'].value);
        cartList.map((val, idx) => {
            if (val.id === index) {
                console.log('Got it')
                deductAmt = deductAmt + (parseFloat(val.qty) * rate)
                cartList.splice(idx, 1)
            }
        })
        setAmount(amount - deductAmt);
        setCartList([...cartList]);
        if (cartList.length === 0) {
            document.getElementById('btnSave').style.display = 'none';
            document.getElementById('btnCancel').style.display = 'none';
        }
        console.log(cartList)
    }

    const cancelEvent = (event) => {
        setCartList([]);
        setAmount(0);
        document.getElementById('btnSave').style.display = 'none';
        document.getElementById('btnCancel').style.display = 'none';
    }

    const checkOutEvent = (event) => {
        if (customerRef.current.value.length == 0 || customerRef.current.value === undefined) {
            setModalMessage('Please select customer before checking out the cart.!')
            setSmShow(true);
        } else {
            setShowCheckOut(true)
        }
    }

    const handleClose = () => setShowCheckOut(false);

    const typeEvent = (event) => {
        setType(event.target.value);
        document.getElementById('idNumber').style.display = event.target.value === 'DC' ? 'inline-block' : 'none';
    }

    const onSubmit = (data, e) => {
        console.log('Data', data)
    }

    return (
        <div class="container-fluid">
            <LoadingOverlay
                active={isActive}
                spinner
                text={message}
            >
                <div style={{ backgroundColor: 'red', color: 'white' }}>Invoice</div>
                <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                    <div class="d-flex flex-column bg-secondary text-white">
                        <div className="p-2">
                            Customer&nbsp;<input ref={customerRef} list="customerList"
                                name="customerLst" id="customerLst">
                            </input>
                            <datalist id="customerList">
                                {
                                    Object.keys(customerFromStore).map((item, index) => {
                                        let name = customerFromStore[item].name;
                                        let id = customerFromStore[item].id;
                                        return (
                                            <option value={name} key={index}></option>
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                    </div>
                    <div class="d-flex flex-row bg-primary text-white"  >
                        <div className="p-2">
                            Product
                        </div>
                        <div style={{ marginLeft: '120px' }} className="p-2">
                            Qty
                        </div>
                    </div>
                    <div class="d-flex flex-row bg-primary text-white"  >
                        <div className="p-2">
                            <input ref={productRef} onChange={onProductChangeEvent} list="productList" name="productLst" id="productLst"></input>
                            <datalist id="productList">
                                {
                                    Object.keys(productList).map((item, index) => {
                                        let name = productList[item].name;
                                        let id = productList[item].id;
                                        return (
                                            <option value={name} key={index}></option>
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                        <div className="p-2">
                            <input ref={refQty} size={5} name="qty" id="qty"></input>
                        </div>
                        <div className="p-2">
                            <input onClick={onAddEvent} type="button" className="btn btn-dark btn-sm" value="Add"></input>
                        </div>
                    </div>
                    <div class="d-flex flex-row text-white" style={{ backgroundColor: 'darkblue' }} >
                        <div className="p-2 justify-content-start">
                            <span>Stock:&nbsp;{stock}</span>
                            <span>Rate:&nbsp;{rate}&nbsp;per Nos</span>
                        </div>
                    </div>
                    <div style={{ overflow: 'scroll' }}>
                        <Table responsive striped bordered hover >
                            <thead>
                                <tr className="darkblue">
                                    <th>Sl.No</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(cartList).map((item, index) => {
                                        let name = cartList[item].name;
                                        let id = cartList[item].id;
                                        let qty = cartList[item].qty;
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td >{index + 1}</td>
                                                    <td >{name}</td>
                                                    <td >{qty}</td>
                                                    <td >
                                                        <button className="btn btn-danger" id='removeId' type="button" onClick={removeElement} data-rownum={id} >
                                                            Delete
                                                    </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <div className="p-2">
                            Amount&nbsp;:&nbsp;<span>{amount}</span>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="p-2">
                            <button onClick={checkOutEvent} id="btnSave" style={{ display: 'none' }} type='button' className="btn btn-primary">Checkout</button>
                        </div>
                        <div className="p-2">
                            <button onClick={cancelEvent} id="btnCancel" style={{ display: 'none' }} type='button' className="btn btn-danger ">Cancel</button>
                        </div>
                    </div>
                    <Modal
                        size="sm"
                        show={smShow}
                        onHide={() => setSmShow(false)}
                        aria-labelledby="productAlert"
                    >
                        <Modal.Header className="modal-header" closeButton>
                            <Modal.Title id="productAlert">
                                Alert
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalMessage}</Modal.Body>
                    </Modal>
                    <Modal show={showCheckOut} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Check out summary...</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="d-flex flex-row text-white" style={{ backgroundColor: 'darkblue' }}>
                                <div className="p-2">
                                    <input checked={true} type="radio" name="paymentType" value={1} ref={register} />Cash
                                 </div>
                                <div className="p-2">
                                    <input type="radio" name="paymentType" value={2} ref={register} />Credit
                                </div>
                            </div>
                            <div class="d-flex flex-row text-white" style={{ backgroundColor: 'yellowgreen' }}>
                                <div className="p-2">
                                    Type&nbsp;
                                    <select id="type" onChange={typeEvent}>
                                        <option value="Invoice" >Invoice</option>
                                        <option value="DC" >DC</option>
                                    </select>
                                </div>
                                <div className="p-2">
                                    <input style={{ display: 'none' }} id="idNumber" type="text" size="10"></input>
                                </div>
                            </div>
                            <div>
                                <Table responsive striped bordered hover >
                                    <thead>
                                        <tr className="darkblue">
                                            <th>Product</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(cartList).map((item, index) => {
                                                let name = cartList[item].name;
                                                let id = cartList[item].id;
                                                let qty = cartList[item].qty;
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td >{name}</td>
                                                            <td >{qty}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <div className="d-flex flex-column text-white" style={{ backgroundColor: 'blueviolet' }}>
                                    <div className="p-2">
                                        GST&nbsp;:&nbsp;<span>0.00</span>
                                    </div>
                                    <div className="p-2">
                                        CGST&nbsp;:&nbsp;<span>0.00</span>
                                    </div>
                                    <div className="p-2">
                                        SGST&nbsp;:&nbsp;<span>0.00</span>
                                    </div>
                                    <div className="p-2">
                                        Amount&nbsp;:&nbsp;<span>{amount}</span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={checkOutEvent}>
                                Create {type}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </LoadingOverlay>
        </div>
    )
}

export default Invoice