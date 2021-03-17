export const customerAction = (data) => {
    console.log('customer action', data)
    return {
        type: "CREATE",
        payload: data
       
    }
};