import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Product from "./screens/Product/";
import ProductDetail from "./screens/ProductDetail/";
import SideBar from "./screens/sidebar/";
import Cart from "./screens/Cart/";
//masih salah
//ikutin https://reactnavigation.org/docs/redux-integration.html
const Drawer = DrawerNavigator(
  {
    Home: { screen: Product },
    ProductDetail: { screen: ProductDetail },
    Cart: { screen: Cart }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
