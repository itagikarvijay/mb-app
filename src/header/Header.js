import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'

function Header() {
    const [title, setTitle] = useState('');

    useEffect(() => {
        loadHeaderDataOnlyOnce();
    }, []);

    const loadHeaderDataOnlyOnce = () => {
        axios.get('http://localhost:8000/api/product')
            .then(function (response) {
                console.log(response);
               // setTitle(response.data[1]);
            })
    }

    return (
        <div>
            <h1>{title}</h1>
        </div>
    );

}

export default Header;

