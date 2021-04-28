import {
    loadAll,
    findAll,
    findAllProductCategories,
    updateProduct,
    deleteProduct,
    searchAll,
    searchProductCount
} from './ProductAPI'

function fetchAllProductCategories() {
    return findAllProductCategories()
}

function fetchAllProducts(data) {
    if (Object.keys(data).length === 0) {
        console.log('Data zero ',data)
        return loadAll()
    } else {
        console.log('Data not zero ',data)
        return findAll(data)
    }
}

function searchAllProducts(data) {
    return searchAll(data)
}

function updateProducts(data) {
    return updateProduct(data);
}

function deleteProducts(data) {
    return deleteProduct(data);
}

function searchProductsCount(data) {
    return searchProductCount(data)
}

function enableReadOnly(child) {
    child.childNodes[0].childNodes[0].style.color = 'skyblue';
    child.childNodes[0].childNodes[0].readOnly = false;
    child.childNodes[1].childNodes[0].style.color = 'red';
    child.childNodes[1].childNodes[0].readOnly = false;
    child.childNodes[2].childNodes[0].style.color = 'skyblue';
    child.childNodes[2].childNodes[0].readOnly = false;
    child.childNodes[3].childNodes[0].style.color = 'skyblue';
    child.childNodes[3].childNodes[0].readOnly = false;
    child.childNodes[4].childNodes[0].style.color = 'skyblue';
    child.childNodes[4].childNodes[0].readOnly = false;
    child.childNodes[5].childNodes[0].style.color = 'skyblue';
    child.childNodes[5].childNodes[0].readOnly = false;
    child.childNodes[6].childNodes[0].style.color = 'skyblue';
    child.childNodes[6].childNodes[0].readOnly = false;
    child.childNodes[7].childNodes[0].style.color = 'skyblue';
    child.childNodes[7].childNodes[0].readOnly = false;
}

function disableReadOnly(child) {
    child.childNodes[0].childNodes[0].style.color = 'black';
    child.childNodes[0].childNodes[0].readOnly = true;
    child.childNodes[1].childNodes[0].style.color = 'black';
    child.childNodes[1].childNodes[0].readOnly = true;
    child.childNodes[2].childNodes[0].style.color = 'black';
    child.childNodes[2].childNodes[0].readOnly = true;
    child.childNodes[3].childNodes[0].style.color = 'black';
    child.childNodes[3].childNodes[0].readOnly = true;
    child.childNodes[4].childNodes[0].style.color = 'black';
    child.childNodes[4].childNodes[0].readOnly = false;
    child.childNodes[5].childNodes[0].style.color = 'black';
    child.childNodes[5].childNodes[0].readOnly = true;
    child.childNodes[6].childNodes[0].style.color = 'black';
    child.childNodes[6].childNodes[0].readOnly = true;
    child.childNodes[7].childNodes[0].style.color = 'black';
    child.childNodes[7].childNodes[0].readOnly = true;
}

function setDelete(child) {
    child.childNodes[1].childNodes[0].style.color = 'red';
    child.childNodes[1].childNodes[0].style.textDecoration = 'line-through';
    child.childNodes[1].childNodes[0].readOnly = true;
    child.childNodes[1].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].style.color = 'red';
    child.childNodes[2].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].readOnly = true;
    child.childNodes[3].childNodes[0].style.color = 'red';
    child.childNodes[3].childNodes[0].style.textDecoration = 'line-through';
    child.childNodes[3].childNodes[0].pointerEvents = 'none';
    child.childNodes[3].childNodes[0].readOnly = true;
    child.childNodes[5].childNodes[0].style.color = 'red';
    child.childNodes[5].childNodes[0].style.textDecoration = 'line-through';
    child.childNodes[5].childNodes[0].pointerEvents = 'none';
    child.childNodes[5].childNodes[0].readOnly = true;
    child.childNodes[6].childNodes[0].style.color = 'red';
    child.childNodes[6].childNodes[0].style.textDecoration = 'line-through';
    child.childNodes[6].childNodes[0].pointerEvents = 'none';
    child.childNodes[6].childNodes[0].readOnly = true;
    child.childNodes[7].childNodes[0].style.color = 'red';
    child.childNodes[7].childNodes[0].style.textDecoration = 'line-through';
    child.childNodes[7].childNodes[0].pointerEvents = 'none';
    child.childNodes[7].childNodes[0].readOnly = true;
    child.childNodes[9].childNodes[0].style.display = "none";
    child.childNodes[10].childNodes[0].innerHTML = "Undo";
}

function undoDelete(child) {
    child.childNodes[1].childNodes[0].style.color = 'black';
    child.childNodes[1].childNodes[0].style.textDecoration = 'none';
    child.childNodes[1].childNodes[0].readOnly = true;
    child.childNodes[1].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].style.color = 'black';
    child.childNodes[2].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].pointerEvents = 'none';
    child.childNodes[2].childNodes[0].readOnly = true;
    child.childNodes[3].childNodes[0].style.color = 'black';
    child.childNodes[3].childNodes[0].style.textDecoration = 'none';
    child.childNodes[3].childNodes[0].pointerEvents = 'none';
    child.childNodes[3].childNodes[0].readOnly = true;
    child.childNodes[5].childNodes[0].style.color = 'black';
    child.childNodes[5].childNodes[0].style.textDecoration = 'none';
    child.childNodes[5].childNodes[0].pointerEvents = 'none';
    child.childNodes[5].childNodes[0].readOnly = true;
    child.childNodes[6].childNodes[0].style.color = 'black';
    child.childNodes[6].childNodes[0].style.textDecoration = 'none';
    child.childNodes[6].childNodes[0].pointerEvents = 'none';
    child.childNodes[6].childNodes[0].readOnly = true;
    child.childNodes[7].childNodes[0].style.color = 'black';
    child.childNodes[7].childNodes[0].style.textDecoration = 'none';
    child.childNodes[7].childNodes[0].pointerEvents = 'none';
    child.childNodes[7].childNodes[0].readOnly = true;
    child.childNodes[9].childNodes[0].style.display = "block";
    child.childNodes[10].childNodes[0].innerHTML = "Remove";
}

// function createElement(data, index) {
//     let ele = React.createElement('input', {
//         key: index,
//         readOnly: true,
//         defaultValue: data.name,
//         name: `product${index}`,
//         type: 'text',
//         ref: register({
//             required: 'Name is required.',
//             pattern: {
//                 value: /[a-zA-Z]*/,
//                 message: 'Name should contain only characters.'
//             }
//         })
//     });
//     return ele;
// }

export {
    fetchAllProducts,
    fetchAllProductCategories,
    updateProducts,
    deleteProducts,
    searchAllProducts,
    enableReadOnly,
    disableReadOnly,
    setDelete,
    undoDelete, 
    searchProductsCount
}