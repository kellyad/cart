export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const DATA_COUNT = 'DATA_COUNT';
export const ADD_MIN_CART = 'ADD_MIN_CART';
export const CALCULATEANDPRICE = 'CALCULATEANDPRICE';
export const CHECK_ITEM = 'CHECK_ITEM';
export const CHECK_SHOP = 'CHECK_SHOP';
export const CHECK_ALL_SHOP = 'CHECK_ALL_SHOP';
export const DELETE_ITEM = 'DELETE_ITEM';

export function setCount(count){
    let action = {
        type: DATA_COUNT,
        count: count,
    };
    return (dispatch) => {
        dispatch(action);
    }
}


export function deleteItem(obj){
    let action = {
        type: DELETE_ITEM,
        sectionIndex: obj.sectionIndexes,
        index: obj.indexes
    }
    return (dispatch) => {
        dispatch(action);
    }
}

export function CalculateandPrice(){
    let action = {
        type: CALCULATEANDPRICE
    }
    return (dispatch) => {
        dispatch(action);
    }
}

export function checkShop(obj){
    let action = {
        type: CHECK_SHOP,
        index: obj.indexes
    }
    return (dispatch) => {
        dispatch(action);
    }
}

export function checkAllShop(){
    let action = {
        type: CHECK_ALL_SHOP
    }
    return (dispatch) => {
        dispatch(action);
    }
}

export function addMinCart(obj){
    let action = {
        type: ADD_MIN_CART,
        sectionIndex: obj.sectionIndexes,
        index: obj.indexes,
        counter: obj.counter
    }
    return (dispatch) => {
        dispatch(action);
    }
}

export function checkItem(obj){
    let action = {
        type: CHECK_ITEM,
        sectionIndex: obj.sectionIndexes,
        index: obj.indexes
    }
    return (dispatch) => {
        dispatch(action);
    }
}