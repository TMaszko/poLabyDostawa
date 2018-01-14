import React, {Component} from 'react';
import './App.css';
import OrderDialog from './components/OrderDialog/OrderDialog';

const orderPositions = {
    "wares": [
        {
            "_id": "5a5a5b27b84a2453c8555772",
            "nazwa": "Cegły-pustaki",
            "min": 1,
            "max": 10,
            "magazyn": "5a59f586ac2c185720334d56",
            "__v": 0
        },
        {
            "_id": "5a5b66f3c5c433065cfb25ca",
            "nazwa": "Deski hebanowe",
            "min": 1,
            "max": 100,
            "magazyn": "5a59f586ac2c185720334d56"
        }
    ]
};

class App extends Component {

    onConfirm = (data) => {
        console.log(data);
    }

    onCancel = () => {

    }

    render() {
        return (
            <div className="App">
                <OrderDialog
                    positions={orderPositions}
                    title='Dodaj pozycje zamówienia'
                    cancelText='Anuluj'
                    confirmText='Dodaj'
                    onConfirm={this.onConfirm}
                />
            </div>
        );
    }
}

export default App;
