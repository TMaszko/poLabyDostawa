import React, {Component} from 'react';
import OrderDialog from './components/OrderDialog/OrderDialog';
import AddOrderView from './components/AddOrderView/AddOrderView';
import AddCommissionView from './components/AddCommissionView/AddCommissionView';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home/HomeView';
class App extends Component {

	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={Home}/>
					<Route exact path="/commission" component={AddCommissionView}/>
					<Route exact path="/order" component={AddOrderView}/>
				</div>
			</Router>
		);
	}
}

export default App;
