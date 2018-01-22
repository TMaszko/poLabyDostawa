import React, {Component} from 'react';
import OrderDialogStyle from './OrderDialogStyle';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';
import SingleSelect from '@atlaskit/single-select';
import TextField, { FieldTextStateless } from '@atlaskit/field-text';
import ErrorMessage from '../AddOrderView/ErrorMessage';

class OrderDialog extends Component {

    state = {
        selectedValue: this.props.selectedPosToEdit? {name: this.props.selectedPosToEdit.name, id: this.props.selectedPosToEdit.id} : {name: ''},
        amount: this.props.selectedPosToEdit? this.props.selectedPosToEdit.amount : 0,
        errors: {
            ware: null,
            amount: null,
        }
    }

    onItemSelected = (selectedItem) => {
        this.setState({selectedValue: selectedItem.item.value})
    }

    onAmountChanged = (e) => {
        this.setState({amount: Math.abs(e.target.value)})
    }
    onConfirm = (value, warePosId) => {
        let errors = {}
        if(!value.selectedValue.id) {
            errors.ware = 'Prosze wybrać towar'
        }
        if(value.amount === 0) {
            errors.amount = 'Prosze podać ilość większą od 0'
        }
        if(Object.keys(errors).length === 0) {
            this.props.onConfirm(value, warePosId);
        } else {
            this.setState({
                errors
            })
        }
    }
    render() {
        const selectedPosID = this.props.selectedPosToEdit? this.props.selectedPosToEdit.id : '';
        const items = this.props.positions.map((ware) => {
            return { content: ware.nazwa, value:{ id: ware._id, name: ware.nazwa} }
        });


        const selectItems = [{ items: items }];

        return (
            <OrderDialogStyle>
                <Modal onClose={this.props.onClose} heading={this.props.title}>
                    <div>
                        <SingleSelect
                            placeholder="Proszę wybrać towar..."
                            label='Wybierz towar'
                            appearance='subtle'
                            defaultSelected={{label: '', content:this.state.selectedValue.name, value:{ name: this.state.selectedValue.name, id: this.state.selectedValue.id}}}
                            items={selectItems}
                            onSelected={this.onItemSelected}
                            shouldFitContainer
                            isRequired
                        />
                        <ErrorMessage>{this.state.errors.ware}</ErrorMessage>
                        <FieldTextStateless
                            type="Number"
                            label='Podaj ilość [szt]'
                            shouldFitContainer
                            min={0}
                            required
                            value={String(this.state.amount)}
                            onChange={this.onAmountChanged}
                        />
                        <ErrorMessage>{this.state.errors.amount}</ErrorMessage>
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={this.props.onClose}>
                            {this.props.cancelText}
                        </Button>
                        <div style={{ width: '10px' }}/>
                        <Button
                            appearance='primary'
                            onClick={() => this.onConfirm({ selectedValue: this.state.selectedValue, amount: this.state.amount}, selectedPosID)}
                        >
                            {this.props.confirmText}
                        </Button>
                    </div>
                </Modal>
            </OrderDialogStyle>
        );
    }

}

export default OrderDialog;