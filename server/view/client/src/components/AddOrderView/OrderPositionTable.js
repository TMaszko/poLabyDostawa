import React, {Component} from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import './addOrderView.css'

const orderedWares = [{nazwa: 'Cegły-pustaki', ilosc: 40}, {nazwa: 'Deski hebanowe', ilosc: 38}];
const HEADERS = [{title:'Nazwa Towaru' , width: 70}, {title: 'Ilość[szt]', width: 10},''];
const headers = {
	cells: HEADERS.map((header,i) => ({
		key: header.title+'Key' + i,
		content: header.title,
		width: header.width,
		isSortable: true
	}))
}
const rows = orderedWares.map((orderedWare, i) => ({
	cells: [{
		key: orderedWare.nazwa+'key' + i,
		content: <div style={{padding: '20px'}}>{orderedWare.nazwa}</div>,
	},{
		key: orderedWare.nazwa+'key2' + i,
		content: <div style={{padding: '20px'}}>{orderedWare.ilosc}</div>,
	}, {
		key: orderedWare.nazwa + 'key3' + i,
		content:<div style={{padding: '20px'}}>
			<ButtonGroup>
				<Button shouldFitContainer className="buttonOrderPos">Edytuj</Button>
				<div className="buttonSpacing"/>
				<Button shouldFitContainer className="buttonOrderPos" appearance="danger">Usuń</Button>
			</ButtonGroup>
		</div>
	}]
}))


const OrderPositionTable = ({}) =>
	<div style={{marginTop: '35px', paddingRight: '80px', paddingLeft: '80px'}}>
		<DynamicTable
			head={headers}
			rows={rows}
		/>
	</div>


export default OrderPositionTable