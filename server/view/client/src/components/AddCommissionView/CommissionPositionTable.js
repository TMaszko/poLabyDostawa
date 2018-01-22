import React, {Component} from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import './addCommissionView.css'

const HEADERS = [{title:'Nazwa Towaru' , width: 60}, {title: 'Ilość[szt]', width: 10}, {title: 'Cena[zl]', width: 10},''];
const headers = {
	cells: HEADERS.map((header,i) => ({
		key: header.title+'Key' + i,
		content: header.title,
		width: header.width,
		isSortable: true
	}))
}
const rows = (onDelete,commissionPositions) => commissionPositions.map((commissionPos, i) => ({
	cells: [{
		key: commissionPos.nazwa+'key' + i,
		content: <div style={{padding: '20px'}}>{commissionPos.nazwa}</div>
	},{
		key: commissionPos.nazwa+'key2' + i,
		content: <div style={{padding: '20px'}}>{commissionPos.amount}</div>,
	},{
		key: commissionPos.nazwa + 'key3' + i,
		content:  <div style={{padding: '20px'}}>{commissionPos.total.toFixed(2)}</div>,
	},
		{
		key: commissionPos.nazwa + 'key3' + i,
		content:<div style={{padding: '20px'}}>
			<ButtonGroup>
				<Button shouldFitContainer onClick={() => onDelete(commissionPos._id)} className="buttonOrderPos" appearance="danger">Usuń</Button>
			</ButtonGroup>
		</div>
	}]
}))


const CommissionPositionTable = ({onDelete, commissionPositions}) => {
	return (
		<div style={{marginTop: '35px', paddingRight: '80px', paddingLeft: '80px'}}>
		<DynamicTable
			head={headers}
			rows={rows(onDelete, commissionPositions)}
		/>
	</div>)
}


export default CommissionPositionTable