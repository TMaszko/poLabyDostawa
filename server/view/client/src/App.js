import React, {Component} from 'react';
import OrderDialog from './components/OrderDialog/OrderDialog';
import AddOrderView from './components/AddOrderView/AddOrderView';


class App extends Component {

    render() {
        return (
            <div className="App">
                <AddOrderView/>
            </div>
        );
    }
}

export default App;
