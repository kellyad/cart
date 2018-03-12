import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3} from "native-base";

import {Text, TouchableOpacity, Image, StyleSheet, SectionList} from 'react-native'
import {commonStyle} from '../../../commonStyle'
import styles from "./styles";


const ProductDetail = (props) => {
    const {state} = props.navigation;
    const item = state.params.items;

    return (
      <Container>
        <View style={styles.navBar}>
          <Text style={{marginTop: 15, fontSize: 17}}>Product Details</Text>
        </View>
      <Image style={{width: 200, height: 200}} source={{uri: item.itemimg}} 
              />
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{item.itemName}</Text>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{`Rp.${item.itemPrice}`}</Text>
        </View>
      </Container>
    );
  }

export default ProductDetail;
