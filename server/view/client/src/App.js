import React, { Component } from 'react';
import './App.css';
import OrderDialog from './components/OrderDialog/OrderDialog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderDialog
          title='Dodaj pozycje zamówienia'
          cancelText='Anuluj'
          confirmText='Dodaj'
        />
      </div>
    );
  }
}

export default App;
