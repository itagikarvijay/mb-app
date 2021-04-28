import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import LoadingOverlay from 'react-loading-overlay';
import {
    fetchAllProducts, fetchAllProductCategories,
    updateProducts, deleteProducts,
    searchAllProducts, enableReadOnly,
    disableReadOnly, setDelete,
    undoDelete, searchProductsCount
} from './ProductCtrl'
import '../css/Work.css'
import ReactPaginate from 'react-paginate';
import { ErrorBoundary } from 'react-error-boundary'
import  ErrorFallback  from '../error/error'

function Product() {
    const [message, setMessage] = useState('Loading content...');
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalNoOfPages, setTotalNoOfPages] = useState(0);
    const [totalProductsSearched, setTotalProductsSearched] = useState(0);

    let [toggleEdit, setToggleEdit] = useState(true);
    let [products, setProducts] = useState([]);
    let [nextPage, setNextPage] = useState(0);

    const refSearch = useRef('');

    useEffect(() => {
        let values = [];
        fetchAllProductCategories().then(response => {
            for (let val of response.data) {
                values.push(<option key={val.id} value={val.id}>{val.name}</option>)
            }
            setCategories(values);
        });
        fetchAllProducts({}).then(response => {
            console.log("Total length", response.data.length)
            setTotalNoOfPages(response.data.length / pageSize)
            setIsActive(false);
        });
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            console.log('search')
            setIsActive(true);
            searchProductsCount({
                search: search
            }).then(response => {
                console.log(response.data)
                setTotalProductsSearched(response.data);
                setTotalNoOfPages(response.data / pageSize)
                let data = {
                    search: search,
                    page: page,
                    pageSize: pageSize,
                    totalRecords: response.data
                }
                searchAllProducts(data).then(response => {
                    console.log(response.data)
                    setProducts(response.data.list);
                    setNextPage(response.data.page)
                    setIsActive(false);
                })
            });
        }
    }, [search]);

    useEffect(() => {
        console.log('page', page)
        if (search.length > 0) {
            let data = {
                search: search,
                page: page,
                pageSize: pageSize,
                totalRecords: totalProductsSearched
            }
            searchAllProducts(data).then(response => {
                console.log(response.data)
                setTotalProductsSearched(response.data.page)
                setProducts(response.data.list);
                setNextPage(response.data.page)
            })
        } else {
            fetchAllProducts({
                page: page,
                pageSize: pageSize
            }).then(response => {
                console.log(response.data)
                setProducts(response.data);
            });
        }
    }, [page]);

    const { register, handleSubmit, errors, setValue } = useForm();

    function createProduct(child, isDelete) {
        let product = {
            'id': child.childNodes[0].childNodes[0].value,
            'name': child.childNodes[1].childNodes[0].value,
            'prodCategryId': child.childNodes[2].childNodes[0].value,
            'hsnCode': child.childNodes[3].childNodes[0].value,
            'service': child.childNodes[4].childNodes[0].checked,
            'gstPercentage': child.childNodes[5].childNodes[0].value,
            'cgstPercentage': child.childNodes[6].childNodes[0].value,
            'sgstPercentage': child.childNodes[7].childNodes[0].value,
            'inactive': child.childNodes[8].childNodes[0].checked,
            'isDeleted': isDelete
        };
        return product;
    }

    const editUpdateEvent = (event) => {
        let child = document.getElementById(('row' + event.target.attributes['data-rownum'].value))
        console.log('editUpdateEvent', child)
        toggleEdit = !toggleEdit;
        setToggleEdit(toggleEdit);
        enableReadOnly(child)
        child.childNodes[9].childNodes[0].innerHTML = toggleEdit ? "Edit" : "Update";
        child.childNodes[10].childNodes[0].style.display = 'none'
        if (toggleEdit) {
            setIsActive(true)
            setMessage('Updating product.!')
            updateProducts(createProduct(child, false)).then(response => {
                console.log('product updated.!', response)
                disableReadOnly(child)
                setIsActive(false);
                child.childNodes[10].childNodes[0].style.display = 'block'
            })
        }
    }

    const removeUndoEvent = (event) => {
        console.log('number', event.target.attributes['data-rownum'].value)
        console.log(products[event.target.attributes['data-rownum'].value].isDeleted)
        let child = document.getElementById(('row' + event.target.attributes['data-rownum'].value))
        let toggleRemove = !products[event.target.attributes['data-rownum'].value].isDeleted;
        setIsActive(true)
        setMessage('Updating product.!')
        deleteProducts(createProduct(child, toggleRemove)).then(response => {
            console.log('product delete.!', response)
            products[event.target.attributes['data-rownum'].value].isDeleted = toggleRemove;
            toggleRemove ? setDelete(child) : undoDelete(child);
            setIsActive(false);
        })
    }

    const searchEvent = (event) => {
        console.log(event.target.type);
        console.log(event.key);
        if (event.key === 'Enter' || event.target.type === 'button') {
            refSearch.current.focus();
            setSearch(refSearch.current.value);
        }
    }

    const createHeader = () => {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: "5px", backgroundColor: 'black', color: 'whitesmoke' }}>
                    <span style={{ marginLeft: '2px' }} className="col-sm">
                        Product
                 </span>
                    <span style={{ marginLeft: '20px' }} className="col-sm">
                        Category
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        HSN Code
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        Service
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        GST(%)
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        CGST(%)
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        SGST(%)
                </span>
                    <span style={{ marginLeft: '10px' }} className="col-sm">
                        Inactive
                </span>
                </div>
            </div>
        )
    }

    const createRows = () => {
        return products.map((data, index) => {
            return (
                <>
                    <div className="row" id={'row' + index} key={index} style={{ marginTop: '5px', backgroundColor: index % 2 === 0 ? '' : '' }}>
                        <div className="col-sm">
                            <input type='hidden'
                                key={data.id}
                                value={data.id}
                                ref={register()}
                                name="id"
                            ></input>
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                type="text"
                                name="product"
                                autoComplete="off"
                                defaultValue={data.name}
                                readOnly={readOnly}
                                size={25}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                className={`form-control ${errors.product ? "is-invalid" : ""}`}
                                ref={register(
                                    {
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'Name should contain only characters.'
                                        }
                                    })}
                                className={`${errors.product ? 'input-error' : ''}`}
                            />
                            {errors.product && (
                                <p className="errorMsg">{errors.product.message}</p>
                            )}
                        </div>
                        <div className="col-sm">
                            <select
                                readOnly={readOnly}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                defaultValue={data.prodCategryId} ref={register()} name="categoryType">
                                {categories}
                            </select>
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                type="text"
                                defaultValue={data.hsnCode}
                                name="hsn"
                                autoComplete="off"
                                readOnly={readOnly}
                                size={8}
                                maxLength={8}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                className={`form-control ${errors.hsn ? "is-invalid" : ""}`}
                                ref={register({
                                    required: 'Name is required.',
                                    pattern: {
                                        value: /[a-zA-Z]*/,
                                        message: 'HSN should contain only characters.'
                                    }
                                })}
                                className={`${errors.hsn ? 'input-error' : ''}`}
                            />
                            {errors.hsn && (
                                <p className="errorMsg">{errors.hsn.message}</p>
                            )}
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                defaultChecked={data.service}
                                type="checkbox"
                                name="service"
                                ref={register()}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                size={6}
                                maxLength={6}
                                defaultValue={data.gstPercentage}
                                type="text"
                                name="gstPercentage"
                                autoComplete="off"
                                readOnly={readOnly}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                className={`form-control ${errors.gstPercentage ? "is-invalid" : ""}`}
                                ref={register({
                                    required: 'Name is required.',
                                    pattern: {
                                        value: /[a-zA-Z]*/,
                                        message: 'HSN should contain only characters.'
                                    }
                                })}
                                className={`${errors.gstPercentage ? 'input-error' : ''}`}
                            />
                            {errors.gstPercentage && (
                                <p className="errorMsg">{errors.gstPercentage.message}</p>
                            )}
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                defaultValue={data.cgstPercentage}
                                type="text"
                                name="cgstPercentage"
                                autoComplete="off"
                                size={6}
                                maxLength={6}
                                readOnly={readOnly}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                className={`form-control ${errors.cgstPercentage ? "is-invalid" : ""}`}
                                ref={register({
                                    required: 'Name is required.',
                                    pattern: {
                                        value: /[a-zA-Z]*/,
                                        message: 'HSN should contain only characters.'
                                    }
                                })}
                                className={`${errors.cgstPercentage ? 'input-error' : ''}`}
                            />
                            {errors.cgstPercentage && (
                                <p className="errorMsg">{errors.cgstPercentage.message}</p>
                            )}
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                defaultValue={data.sgstPercentage}
                                type="text"
                                name="sgstPercentage"
                                autoComplete="off"
                                readOnly={readOnly}
                                size={6}
                                maxLength={6}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                className={`form-control ${errors.sgstPercentage ? "is-invalid" : ""}`}
                                ref={register({
                                    required: 'Name is required.',
                                    pattern: {
                                        value: /[a-zA-Z]*/,
                                        message: 'HSN should contain only characters.'
                                    }
                                })}
                                className={`${errors.sgstPercentage ? 'input-error' : ''}`}
                            />
                            {errors.sgstPercentage && (
                                <p className="errorMsg">{errors.sgstPercentage.message}</p>
                            )}
                        </div>
                        <div className="col-sm">
                            <input
                                key={data.id}
                                style={{ textDecoration: data.isDeleted ? 'line-through' : '', color: data.isDeleted ? 'red' : '' }}
                                defaultChecked={data.inactive}
                                type="checkbox"
                                name="inActive"
                                ref={register(
                                )}
                            />
                        </div>
                        <div className="col-sm">
                            <button id="btn-edit" style={{ display: data.isDeleted ? 'none' : 'block' }} data-rownum={index} className="btn btn-primary" type="button" onClick={editUpdateEvent} >
                                Edit
                            </button>
                        </div>
                        <div className="col-sm">
                            <button id="btn-remove" data-rownum={index} className="btn btn-danger" type="button" onClick={removeUndoEvent} >
                                {data.isDeleted ? 'Undo' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </>
            )
        })
    }

    const onSubmit = (data, e) => {
        console.log('Data submitted.!');
        let product = {
            'id': e.target.childNodes[2].childNodes[0].childNodes[0].value,
            'name': e.target.childNodes[2].childNodes[1].childNodes[0].value,
            'prodCategryId': e.target.childNodes[2].childNodes[2].childNodes[0].value,
            'hsnCode': e.target.childNodes[2].childNodes[3].childNodes[0].value,
            'service': e.target.childNodes[2].childNodes[4].childNodes[0].checked,
            'gstPercentage': e.target.childNodes[2].childNodes[5].childNodes[0].value,
            'cgstPercentage': e.target.childNodes[2].childNodes[6].childNodes[0].value,
            'sgstPercentage': e.target.childNodes[2].childNodes[7].childNodes[0].value,
            'inactive': e.target.childNodes[2].childNodes[8].childNodes[0].checked,
            'isDeleted': false
        };
        updateProducts(product).then(response => {
            console.log('Inserted', response.data);
            products.push(response.data)
            console.log('Changed', products);
            let form = document.getElementById("newProduct");
            let productTable = document.getElementById("parent");
            productTable.style.display = 'block'
            form.style.display = 'none';
            setProducts(products);
        })
    }

    const newProductEvent = (event) => {
        let form = document.getElementById("newProduct");
        let productTable = document.getElementById("parent");
        console.log(productTable)
        productTable.style.display = 'none'
        form.style.display = 'inline-flex';
    }

    const newProductCancelEvent = (event) => {
        let form = document.getElementById("newProduct");
        let productTable = document.getElementById("parent");
        productTable.style.display = 'block'
        form.style.display = 'none';
    }

    const handlePageClick = (data) => {
        console.log(data.selected);
        setPage(data.selected)
    };

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <div class="container">
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text={message}
                >
                    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3">
                                    <button class="btn btn-primary" onClick={newProductEvent} type="button">Add new product</button>
                                </div>
                                <div className="col-sm-6">
                                    <input ref={refSearch} onKeyDown={searchEvent} class="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                                </div>
                                <div className="col-sm-3">
                                    <button class="btn btn-outline-success" onClick={searchEvent} type="button">Search</button>
                                </div>
                            </div>
                        </div>
                        {createHeader()}
                        <div id="newProduct" style={{ display: 'none' }} className="row">
                            <div className="col-sm">
                                <input type='hidden'
                                    value="0"
                                    name="id_0"
                                ></input>
                            </div>
                            <div className="col-sm">
                                <input
                                    type="text"
                                    name="product_0"
                                    autoComplete="off"
                                    size={25}
                                    className={`form-control ${errors.product_0 ? "is-invalid" : ""}`}
                                    ref={register(
                                        {
                                            required: 'Name is required.',
                                            pattern: {
                                                value: /[a-zA-Z]*/,
                                                message: 'Name should contain only characters.'
                                            }
                                        })}
                                    className={`${errors.product_0 ? 'input-error' : ''}`}
                                />
                                {errors.product_0 && (
                                    <p className="errorMsg">{errors.product_0.message}</p>
                                )}
                            </div>
                            <div className="col-sm">
                                <select
                                    ref={register()} name="categoryType_0">
                                    {categories}
                                </select>
                            </div>
                            <div className="col-sm">
                                <input
                                    type="text"
                                    name="hsn_0"
                                    autoComplete="off"
                                    size={8}
                                    maxLength={8}
                                    className={`form-control ${errors.hsn_0 ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'HSN should contain only characters.'
                                        }
                                    })}
                                    className={`${errors.hsn_0 ? 'input-error' : ''}`}
                                />
                                {errors.hsn_0 && (
                                    <p className="errorMsg">{errors.hsn_0.message}</p>
                                )}
                            </div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name="service_0"
                                    ref={register()}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className="col-sm">
                                <input
                                    size={6}
                                    maxLength={6}
                                    type="text"
                                    name="gstPercentage_0"
                                    autoComplete="off"
                                    className={`form-control ${errors.gstPercentage_0 ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'HSN should contain only characters.'
                                        }
                                    })}
                                    className={`${errors.gstPercentage_0 ? 'input-error' : ''}`}
                                />
                                {errors.gstPercentage_0 && (
                                    <p className="errorMsg">{errors.gstPercentage_0.message}</p>
                                )}
                            </div>
                            <div className="col-sm">
                                <input
                                    type="text"
                                    name="cgstPercentage_0"
                                    autoComplete="off"
                                    size={6}
                                    maxLength={6}
                                    className={`form-control ${errors.cgstPercentage_0 ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'HSN should contain only characters.'
                                        }
                                    })}
                                    className={`${errors.cgstPercentage_0 ? 'input-error' : ''}`}
                                />
                                {errors.cgstPercentage_0 && (
                                    <p className="errorMsg">{errors.cgstPercentage_0.message}</p>
                                )}
                            </div>
                            <div className="col-sm">
                                <input
                                    type="text"
                                    name="sgstPercentage_0"
                                    autoComplete="off"
                                    size={6}
                                    maxLength={6}
                                    className={`form-control ${errors.sgstPercentage_0 ? "is-invalid" : ""}`}
                                    ref={register({
                                        required: 'Name is required.',
                                        pattern: {
                                            value: /[a-zA-Z]*/,
                                            message: 'HSN should contain only characters.'
                                        }
                                    })}
                                    className={`${errors.sgstPercentage_0 ? 'input-error' : ''}`}
                                />
                                {errors.sgstPercentage_0 && (
                                    <p className="errorMsg">{errors.sgstPercentage_0.message}</p>
                                )}
                            </div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name="inActive_0"
                                    ref={register(
                                    )}
                                />
                            </div>
                            <div className="col-sm">
                                <button class="btn btn-primary" type="submit">Save</button>
                            </div>
                            <div className="col-sm">
                                <button class="btn btn-danger" onClick={newProductCancelEvent} type="button">Cancel</button>
                            </div>
                        </div>
                    </Form>
                    <div id="parent">
                        {createRows()}
                        <div className="row justify-content-md-center">
                            <div className="col-sm">
                                <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={totalNoOfPages}
                                    marginPagesDisplayed={0}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'pagination'}
                                />
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </div>
        </ErrorBoundary>
    )
}

export default Product