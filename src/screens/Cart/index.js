import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3 } from "native-base";

import {commonStyle} from '../../../commonStyle';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from '../../store/actions/index';
import {Text, TouchableOpacity, Image, StyleSheet, SectionList} from 'react-native'
const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/evhive.png");

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
const Cart = (props) => {
    const {state} = props.navigation;
    const item = state.params.items;
    let Dataarray = [];
    let tempTotalNum = 0
    let k =0;
      let tempTotalPrice = 0
      let totalPrice =0
      let tempStatus = item
      for (let i = 0; i < tempStatus.length; i ++) {
        let shop = tempStatus[i]
        let items = shop.items
        for (let j = 0; j < items.length; j++) {
          let item = items[j]
          if (item.checked) {
            tempTotalNum += 1
            totalPrice += item.itemPrice * item.quantity
            tempTotalPrice += item.itemPrice * item.quantity
          Dataarray.push({ image : item.itemimg ,name : item.itemName,  price : item.itemPrice, quantity : item.quantity, totalprice : totalPrice});
          }
          totalPrice =0
        }
      }
    return (

      <Container>
        
        <View style={styles.navBar}>
          <Text style={{marginTop: 15, fontSize: 17}}>Cart Details</Text>
        </View>
        <View style={styles.toolBar}>
          <View style={{flex: 1,  alignItems: commonStyle.center}}>
          {Dataarray.map((index, i) => (
                <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
                  <Text>Name : {index.name}</Text>
                  <Text>Price : {index.price}</Text>
                  <Text>Quantity : {index.quantity}</Text>
                  <Text> Total Price :{index.totalprice}</Text>
                </View>
            ))}
          </View>
        </View> 
        <View style={{marginTop:20 ,width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            
          <Text style={{color: commonStyle.white}}>Charge : ({tempTotalNum})</Text>
          </View>
              
      </Container>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Cart); 
