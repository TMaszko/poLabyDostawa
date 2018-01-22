import React, {Component} from 'react';
import OrderInfoWrapper from './OrderInfoWrapper';
import OrderFieldInfo from './OrderFieldInfo';
import InlineLabel from './InlineLabel';
import {DatePicker} from '@atlaskit/datetime-picker';
import ErrorMessage from "./ErrorMessage";

const OrderInfo = ({orderNum, employeeFullName , onChangeDate, dateError }) =>
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
			<DatePicker onChange={onChangeDate}/>
		</OrderFieldInfo>
		<ErrorMessage>{dateError}</ErrorMessage>
		<OrderFieldInfo>
			<InlineLabel>
				Wystawiający: {employeeFullName}
			</InlineLabel>
		</OrderFieldInfo>
	</OrderInfoWrapper>


export default OrderInfo