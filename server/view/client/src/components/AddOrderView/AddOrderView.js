import React, {Component} from 'react';
import Header from './HeaderView'
import HeaderWrapper from './HeaderWrapper'
import DateView from './DateView';
import OrderDialog from '../OrderDialog/OrderDialog';
import Button, { ButtonGroup } from '@atlaskit/button';
import AddOrderTopSectionWrapper from "./AddOrderTopSectionWrapper";
import OrderInfo from "./OrderInfo";
import OrderPositionTable from './OrderPositionTable'
import './addOrderView.css'
import BottomSectionWrapper from "./BottomSectionWrapper";

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


const lpad = valueToFillSpace => length => str => {
	const strToPad = String(str);
	const lengthToFill = length - strToPad.length ;
	return Array.from({length: lengthToFill < 0 ? 0 : lengthToFill }, _ => valueToFillSpace).join('') + str;
};

const lpadZerosToProperLength = lpad('0')(4);


export default class AddOrder extends Component {
	componentWillMount() {

	}
	onConfirm = (value) => {
		console.log(value)
	}
	onAddModal = () => {
		this.setState({
			modalIsOpen: true
		})
	}
	onCloseModal = () => {
		this.setState({
			modalIsOpen: false
		})
	}
	state = {
		orderNum: 1,
		employee: {
			name: "Jan",
			surname: "Kowalski",
			fullName: "Jan Kowalski"
		},
		modalIsOpen: false,
	}


	render() {
		const date = new Date();
		const dateElems = [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(lpad('0')(2))
		return (
			<div>
				<HeaderWrapper>
					<Header>
						Dodaj zamówienie
					</Header>
					<DateView>{dateElems.join('.')}</DateView>
				</HeaderWrapper>
				<AddOrderTopSectionWrapper>
					<OrderInfo orderNum={dateElems.join('') + lpadZerosToProperLength(this.state.orderNum)} employeeFullName={this.state.employee.fullName}/>
					<div style={{position: 'absolute', right: '50px'}}>
						<Button onClick={this.onAddModal} className="buttonMainOptions" appearance="primary">Dodaj pozycję zamówienia</Button>
					</div>
				</AddOrderTopSectionWrapper>
				<OrderPositionTable/>
				<BottomSectionWrapper>
					<ButtonGroup>
						<Button className="buttonMainOptions buttonDecisionPadding">
							Anuluj
						</Button>
						<div className="buttonSpacing "/>
						<Button className="buttonMainOptions buttonDecisionPadding" appearance="primary">
							Dodaj
						</Button>
					</ButtonGroup>
				</BottomSectionWrapper>
				{this.state.modalIsOpen &&
				<OrderDialog
					onClose={this.onCloseModal}
					positions={orderPositions}
					title="Dodaj pozycje zamówienia"
					cancelText="Anuluj"
					confirmText="Dodaj"
					onConfirm={this.onConfirm}/>
				}
			</div>
		)
	}
}