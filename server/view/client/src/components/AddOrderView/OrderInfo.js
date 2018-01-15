import React, {Component} from 'react';
import OrderInfoWrapper from './OrderInfoWrapper';
import OrderFieldInfo from './OrderFieldInfo';
import InlineLabel from './InlineLabel';
import {DatePicker} from '@atlaskit/datetime-picker';

const OrderInfo = ({orderNum, employeeFullName}) =>
	<OrderInfoWrapper>
		<OrderFieldInfo>
			<InlineLabel>
				Numer zamowienia : {orderNum}
			</InlineLabel>
		</OrderFieldInfo>
		<OrderFieldInfo>
			<InlineLabel>
				Wybierz termin:
			</InlineLabel>
			<DatePicker/>
		</OrderFieldInfo>
		<OrderFieldInfo>
			<InlineLabel>
				Wystawiający: {employeeFullName}
			</InlineLabel>
		</OrderFieldInfo>
	</OrderInfoWrapper>


export default OrderInfo