import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3} from "native-base";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from '../../store/actions/index';
import {Text, TouchableOpacity, Image, StyleSheet, SectionList} from 'react-native'
import {commonStyle} from '../../../commonStyle'
const shoppingCartData = require('../../../ShoppingCartData.json')


class Home extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.state = {
      status: [],
      isSelectedAllItem: false,
      totalNum: 0,
      totalPrice: 0.00
    }
  }

  componentWillMount() {
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
    this.state.status = tempStatusArr
    console.log(this.state.status)
  }

  componentDidMount() {
  }

  checkItem(sectionIndex, index) {
    let tempStatus = this.state.status
    let tempShop = tempStatus[sectionIndex]
    let tempShopItems = tempStatus[sectionIndex].items
    let item = tempShopItems[index]
    item.checked = !item.checked

    let isSelectedAllShopItem = true
    for (let j = 0; j < tempShopItems.length; j++) {
      let item = tempShopItems[j]
      if (!item.checked) {
        isSelectedAllShopItem = false
        break
      }
    }

    tempShop.checked = isSelectedAllShopItem

    let isSelectedAllShop = true
    for (let k = 0; k < tempStatus.length; k ++) {
      let shop = tempStatus[k]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkedShop(index) {
    let tempStatus = this.state.status
    let shop = tempStatus[index]
    shop.checked = !shop.checked
    let items = shop.items
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      item.checked = shop.checked
    }

    let isSelectedAllShop = true
    for (let j = 0; j < tempStatus.length; j++) {
      let shop = tempStatus[j]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkAllShop() {
    let tempSelectedAllItem = !this.state.isSelectedAllItem
    let tempStatus = this.state.status
    for (let i = 0; i < tempStatus.length; i++) {
      let shop = tempStatus[i]
      shop.checked = tempSelectedAllItem
      let items = shop.items
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        item.checked = tempSelectedAllItem
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus})
  }

  minus(sectionIndex, index) {
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    if (item.quantity <= item.minQuantity) {
      alert('min quantity:'+item.minQuantity)
    } else {
      item.quantity -= 1
    }

    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
  }

  add(sectionIndex, index) {
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    if (item.quantity >= item.maxQuantity) {
      alert('max quantity:'+item.maxQuantity)
    } else {
      item.quantity += 1
    }
    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
  }

  calculateCountAndPrice() {
    let tempTotalNum = 0
    let tempTotalPrice = 0
    let tempStatus = this.state.status
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
    this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice})
  }

  renderItem = info => {
    let item = info.item
    let index = info.index
    let sectionIndex = info.section.index
    let shop = this.state.status[sectionIndex]
    let statusItem = shop.items[index]
    return (
      <View style={styles.cellStyle}>
        <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index)}>
          <Image style={styles.checkBox} source={statusItem.checked ? require('../../../assets/ic_selected.png') : require('../../../assets/ic_defult.png')} resizeMode={'center'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetail", {items : item})}>
        <Image style={{width: 80, height: 80}} source={{uri: item.itemimg}} 
              />
              </TouchableOpacity>
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{item.itemName}</Text>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{`Rp.${item.itemPrice}`}</Text>
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
            <Image source={require('../../../assets/Group.png')}/>
          </TouchableOpacity>
          <Text style={{width: 30, textAlign: 'center'}}>{statusItem.quantity}</Text>
          <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
            <Image source={require('../../../assets/Group5.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSectionHeader = info => {
    let section = info.section.key
    let index = info.section.index
    let shop = this.state.status[index]
    return (
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => this.checkedShop(index)}>
          <Image style={styles.checkBox} source={shop.checked ? require('../../../assets/ic_selected.png') : require('../../../assets/ic_defult.png')} resizeMode={'center'}/>
        </TouchableOpacity>
        <Text style={{color: commonStyle.gray, fontSize: 12}}>{section}</Text>
      </View>
    )
  }

  render() {
    let tempArr = shoppingCartData.data.map((item, index) => {
      let tempData = {}
      tempData.key = item.shopName
      tempData.index = index
      tempData.data = item.shopItems
      return tempData
    })
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={{marginTop: 15, fontSize: 17}}>All Product</Text>
        </View>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={tempArr}
          ItemSeparatorComponent={() => <View/>}
          ListHeaderComponent={() => <View/>}
          ListFooterComponent={() => <View/>}
        />
        <View style={styles.toolBar}>
          <View style={{flex: 1, flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
            <TouchableOpacity onPress={() => this.checkAllShop()}>
              <Image style={styles.checkBox}  source={this.state.isSelectedAllItem ? require('../../../assets/ic_selected.png') : require('../../../assets/ic_defult.png')} resizeMode={'center'}/>
            </TouchableOpacity>
            <Text>TOTAL</Text>
          </View>
          <Text style={{marginHorizontal: 10}}>Total:
            <Text style={{color: commonStyle.red}}>Rp.{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
          </Text>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Cart", {items : this.state.status})}>
          <Text style={{color: commonStyle.white}}>Pay({this.state.totalNum})</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        /*username: state.dataReducer.username,
        password: state.dataReducer.password,
        count: state.dataReducer.count*/
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsRedux, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  navBar: {
    height: commonStyle.navHeight,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor
  },
  cellStyle: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  sectionHeader: {
    height: 40,
    flexDirection: commonStyle.row,
    backgroundColor: commonStyle.bgColor,
    alignItems: commonStyle.center,
  },
  checkBox: {
    width: 40,
    height: 40,
  },
  toolBar: {
    height: commonStyle.cellHeight,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center
  }
})
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);