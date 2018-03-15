import React, { Component } from "react";
import { StyleProvider } from "native-base";

import store from '../../store';
import { Provider, connect } from 'react-redux';
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
	      <Provider store={store}>
	        	<App />
	      </Provider>
      </StyleProvider>
    );
  }
}
