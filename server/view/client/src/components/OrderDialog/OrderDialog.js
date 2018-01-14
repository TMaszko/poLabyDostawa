import React, {Component} from 'react';
import OrderDialogStyle from './OrderDialogStyle';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';
import SingleSelect from '@atlaskit/single-select';
import TextField, { FieldTextStateless } from '@atlaskit/field-text';

class OrderDialog extends Component {

    state = {
        selectedId: '',
        amount: 0
    }

    onItemSelected = (selectedItem) => {
        this.setState({selectedId: selectedItem.item.value})
    }

    onAmountChanged = (e) => {
        this.setState({amount: Math.abs(e.target.value)})
    }

    render() {

        const items = this.props.positions.wares.map((ware) => {
            return { content: ware.nazwa, value: ware._id }
        });

        const selectItems = [{ items: items }];

        return (
            <OrderDialogStyle>
                <Modal heading={this.props.title}>
                    <div>
                        <SingleSelect
                            label='Wybierz towar:'
                            appearance='subtle'
                            items={selectItems}
                            onSelected={this.onItemSelected}
                            shouldFitContainer
                            required
                        />

                        <FieldTextStateless
                            type='Number'
                            label='Podaj ilość [szt]:'
                            shouldFitContainer
                            min={0}
                            required
                            value={this.state.amount}
                            onChange={this.onAmountChanged}
                        />
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={this.props.onCancel}>
                            {this.props.cancelText}
                        </Button>
                        <div style={{ width: '10px' }}/>
                        <Button
                            appearance='primary'
                            onClick={() => this.props.onConfirm({ selectedId: this.state.selectedId, amount: this.state.amount})}
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