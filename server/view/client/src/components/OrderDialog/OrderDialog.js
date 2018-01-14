import React, {Component} from 'react';
import OrderDialogStyle from './OrderDialogStyle';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';
import SingleSelect from '@atlaskit/single-select';
import TextField from '@atlaskit/field-text';

class OrderDialog extends Component {

    render() {
        return (
            <OrderDialogStyle>
                <Modal heading={this.props.title}>
                    <div>
                        <SingleSelect
                            label='Wybierz towar:'
                            appearance='subtle'
                            shouldFitContainer
                        />

                        <TextField
                            type='Number'
                            label='Podaj ilość [szt]:'
                            shouldFitContainer
                        />
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button>
                            {this.props.cancelText}
                        </Button>
                        <div style={{ width: '10px' }}/>
                        <Button
                            appearance='primary'
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