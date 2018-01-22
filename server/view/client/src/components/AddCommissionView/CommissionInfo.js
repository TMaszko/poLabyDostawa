import React, {Component} from 'react';
import OrderInfoWrapper from './CommissionInfoWrapper';
import OrderFieldInfo from './CommissionFieldInfo';
import InlineLabel from './InlineLabel';
import SingleSelect from '@atlaskit/single-select'
import {DatePicker} from '@atlaskit/datetime-picker';
import ErrorMessage from "./ErrorMessage";

const OrderInfo = ({commissionNum, today, onChangeDeliverer, dateOfCommission, deliverers ,errors}) => {
	const selectItems = [{
		items: Object.keys(deliverers).map(delivererId => ({
			content: deliverers[delivererId].nazwa,
			value: deliverers[delivererId]._id
		}))
	}];
	return (<OrderInfoWrapper>
			<OrderFieldInfo>
				<InlineLabel>
					Numer zlecenia dostawy : {commissionNum}
				</InlineLabel>
			</OrderFieldInfo>
			<OrderFieldInfo>
				<InlineLabel>
					Wybierz Dostawce:
				</InlineLabel>
				<SingleSelect
					placeholder="Wybierz dostawcę..."
					appearance='subtle'
					items={selectItems}
					onSelected={onChangeDeliverer}
					shouldFitContainer
					isRequired
				/>
			</OrderFieldInfo>
			<ErrorMessage>{errors}</ErrorMessage>
			<OrderFieldInfo>
				<InlineLabel>
					Termin: {dateOfCommission}{dateOfCommission < today && <ErrorMessage> termin przekroczony</ErrorMessage>}
				</InlineLabel>
			</OrderFieldInfo>

			<OrderFieldInfo>
				<InlineLabel>
					Wystawiający: Jan Kowalski
				</InlineLabel>
			</OrderFieldInfo>
		</OrderInfoWrapper>
	)
}


export default OrderInfo