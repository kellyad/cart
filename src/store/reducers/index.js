import {combineReducers} from 'redux';

import {DATA_AVAILABLE, DATA_COUNT} from '../actions/';

const shoppingCartData = require('../../../ShoppingCartData.json')
    let dataState = {
          status: [],
          isSelectedAllItem: false,
          totalNum: 0,
          totalPrice: 0.00,
          cart : []
    };
    let dataArr = shoppingCartData.data
    let tempStatusArr = []
    for (let i = 0; i < dataArr.length; i++) {
      let items = dataArr[i].shopItems
      let shopObj = {}
      shopObj.checked = false
      let tempItems = []
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        item.checked = false
        item.quantity = item.minQuantity
        tempItems.push(item)
      }
      shopObj.items = tempItems
      tempStatusArr.push(shopObj)
    }
    dataState.status = tempStatusArr
function cloneJSON(json){return JSON.parse(JSON.stringify(json))}

const dataReducer = (state = dataState, action) => {
    console.log(action);
    let tempStatus = state.status
    let tempSelectedAllItem = state.isSelectedAllItem
                    
    switch (action.type) {
        case 'DATA_COUNT':
            console.log("DATA_COUNT", state);
            return Object.assign({}, state, {count: (action.count+1)});
        break;
        case 'GET_DATA_COUNT':
            return state;
        break;

        case 'CALCULATEANDPRICE':
            console.log("ADD CART", action);
            let tempTotalNum = 0
            let tempTotalPrice = 0
            for (let i = 0; i < tempStatus.length; i ++) {
              let shop = tempStatus[i]
              let items = shop.items
              for (let j = 0; j < items.length; j++) {
                let item = items[j]
                if (item.checked) {
                  tempTotalNum += 1
                  tempTotalPrice += item.itemPrice * item.quantity
                }
              }
            }
            state.totalNum= tempTotalNum
            state.totalPrice= tempTotalPrice
            console.log(state.totalNum);
            return Object.assign({}, state, {totalNum: (tempTotalNum), totalPrice: tempTotalPrice});
        break;
        //Cart
        case 'ADD_MIN_CART':
            console.log("ADD CART", action);
            let sectionIndex =  action.sectionIndex
            let index =  action.index
            if (tempStatus[sectionIndex].items[index].quantity >= tempStatus[sectionIndex].items[index].maxQuantity) {
              alert('max quantity:'+tempStatus[sectionIndex].items[index].maxQuantity)
            } else {
              tempStatus[sectionIndex].items[index].quantity += action.counter
            }
            if (tempStatus[sectionIndex].items[index].checked) {
             state.totalPrice += (tempStatus[sectionIndex].items[index].itemPrice*action.counter)
            }
            state.status= tempStatus
         
            return Object.assign({}, state, {status: (tempStatus)});
        break;

        case 'CHECK_ITEM':

            let tempShop1 = tempStatus[action.sectionIndex]
            let tempShopItems = tempStatus[action.sectionIndex].items
            let item1 = tempShopItems[action.index]
            item1.checked = !item1.checked

            let isSelectedAllShopItem = true
            for (let j = 0; j < tempShopItems.length; j++) {
              let item1 = tempShopItems[j]
              if (!item1.checked) {
                isSelectedAllShopItem = false
                break
              }
            }

            tempShop1.checked = isSelectedAllShopItem

            let isSelectedAllShop = true
            for (let k = 0; k < tempStatus.length; k ++) {
              let shop1 = tempStatus[k]
              if (!shop1.checked) {
                isSelectedAllShop = false
                break
              }
            }
            state.isSelectedAllItem = isSelectedAllShop
            state.status  = tempStatus
            console.log(state.status)
            return Object.assign({}, state, {status: (tempStatus),isSelectedAllItem : isSelectedAllShop});
        break;


        case 'CHECK_ALL_SHOP':
            for (let i = 0; i < tempStatus.length; i++) {
              let shop2 = tempStatus[i]
              shop2.checked = tempSelectedAllItem
              let items2 = shop.items
              for (let j = 0; j < items2.length; j++) {
                let item2 = items2[j]
                item2.checked = tempSelectedAllItem
              }
            }

            state.isSelectedAllItem = tempSelectedAllItem
            state.status = tempStatus

            return Object.assign({}, state, {status: (tempStatus),isSelectedAllItem : tempSelectedAllItem});
        break;

        case 'CHECK_SHOP':
              for (let i = 0; i < tempStatus.length; i++) {
              let shop3 = tempStatus[i]
              shop3.checked = tempSelectedAllItem
              let items3 = shop3.items
              for (let j = 0; j < items3.length; j++) {
                let item3 = items3[j]
                item3.checked = tempSelectedAllItem
              }
            }

            state.isSelectedAllItem = tempSelectedAllItem
            state.status = tempStatus

            return Object.assign({}, state, {status: (tempStatus),isSelectedAllItem : tempSelectedAllItem});
        break;
        
        default:
            return state;
            break;
    }
}

const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;