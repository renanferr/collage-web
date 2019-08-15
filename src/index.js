import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import 'typeface-roboto';

import redux from './redux'
import Collage from './containers/Collage';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#1da0db',
    },
    secondary: {
      main: '#a11a8d',
    },
  },
});

const logActionsMid = ({ dispach })=>next=>action=>{
	console.log(`action: ${action.type}`);
	return next(action);
};
const middlewares = [logActionsMid];

const createHistory = require('history').createBrowserHistory;
const history = createHistory();

const store = createStore(redux, compose(applyMiddleware(...middlewares)))

const MainApp = ()=>(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
  	<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route component={Collage} />
				</Switch>
			</Router>
  	</Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<MainApp />, document.getElementById('root'));