import axios from '../config/AxiosConfig'

const findAllProductCategories = async () => {
    console.log('fetchAllProductCategories ')
    return await axios.getDataWithTokenAndRequestParams('categoryType/product', { category: 'PRODUCT_CATEGORY' })
}

const findAll = async (data) => {
    console.log('fetchAllProducts with pagination ')
    return await axios.getDataWithTokenAndRequestParams('product/findAllWithPagination', {
        page: data.page,
        pageSize: data.pageSize
    });
}

const loadAll = async () => {
    console.log('loadAllProducts')
    return await axios.getDataWithTokenAndRequestParams('product/findAll');
}

const searchAll = async (data) => {
    console.log('SearchAllProducts ', data)
    return await axios.getDataWithTokenAndRequestParams('product/searchAllWithPagination', {
        ...data
    });
}

const updateProduct = async (data) => {
    console.log('update Product', data)
    return await axios.putDataWithToken('product/update', data);
}

const deleteProduct = async (data) => {
    console.log('delete Product', data)
    return await axios.patchDataWithToken('product/delete', data);
}

const searchProductCount = async (data) => {
    console.log('search product count.!', data)
    return await axios.getDataWithTokenAndRequestParams('product/searchProductCount', {
        search: data.search
    });
}

export {
    findAll,
    findAllProductCategories,
    updateProduct,
    deleteProduct,
    searchAll,
    loadAll,
    searchProductCount
}