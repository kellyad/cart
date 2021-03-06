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
    
  }

  componentWillMount() {
    // let dataArr = shoppingCartData.data
    // let tempStatusArr = []
    // for (let i = 0; i < dataArr.length; i++) {
    //   let items = dataArr[i].shopItems
    //   let shopObj = {}
    //   shopObj.checked = false
    //   let tempItems = []
    //   for (let j = 0; j < items.length; j++) {
    //     let item = items[j]
    //     item.checked = false
    //     item.quantity = item.minQuantity
    //     tempItems.push(item)
    //   }
    //   shopObj.items = tempItems
    //   tempStatusArr.push(shopObj)
    // }
    // this.props.status = tempStatusArr
    //console.log(this.props.status)
  }

  componentDidMount() {
  }

  checkItem(sectionIndex, index) {
    console.log(sectionIndex);
        this.props.checkItem({sectionIndexes: sectionIndex, indexes: index});

    this.calculateCountAndPrice()
  }

  checkedShop(index) {
        this.props.checkShop({ indexes: index});
    this.calculateCountAndPrice()
  }

  checkAllShop() {
        this.props.checkAllShop();
    this.calculateCountAndPrice()
  }
  minus(sectionIndex, index) {
        this.props.addMinCart({sectionIndexes: sectionIndex, indexes: index, counter : -1});
  }

  add(sectionIndex, index) { 
        this.props.addMinCart({sectionIndexes: sectionIndex, indexes: index, counter : 1});
  }

  calculateCountAndPrice() {
        this.props.CalculateandPrice();

  }

  renderItem = info => {
    let item = info.item
    let index = info.index
    let sectionIndex = info.section.index
    let shop = this.props.status[sectionIndex]
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
    let shop = this.props.status[index]
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
              <Image style={styles.checkBox}  source={this.props.isSelectedAllItem ? require('../../../assets/ic_selected.png') : require('../../../assets/ic_defult.png')} resizeMode={'center'}/>
            </TouchableOpacity>
            <Text>TOTAL</Text>
          </View>
          <Text style={{marginHorizontal: 10}}>Total:
            <Text style={{color: commonStyle.red}}>Rp.{parseFloat(this.props.totalPrice).toFixed(2)}</Text>
          </Text>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Cart", {items : this.props.status})}>
          <Text style={{color: commonStyle.white}}>Pay({this.props.totalNum})</Text>
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
        status: state.dataReducer.status,
        isSelectedAllItem: state.dataReducer.isSelectedAllItem,
          totalNum: state.dataReducer.totalNum,
          totalPrice : state.dataReducer.totalPrice
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