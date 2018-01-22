import React, {Component} from 'react';
import Header from './HeaderView'
import HeaderWrapper from './HeaderWrapper'
import DateView from './DateView';
import OrderDialog from '../OrderDialog/OrderDialog';
import Button, {ButtonGroup} from '@atlaskit/button';
import AddOrderTopSectionWrapper from "./AddOrderTopSectionWrapper";
import OrderInfo from "./OrderInfo";
import OrderPositionTable from './OrderPositionTable'
import ErrorMessage from './ErrorMessage'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
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
	const lengthToFill = length - strToPad.length;
	return Array.from({length: lengthToFill < 0 ? 0 : lengthToFill}, _ => valueToFillSpace).join('') + str;
};

const lpadZerosToProperLength = lpad('0')(4);


export default class AddOrder extends Component {
	componentWillMount() {

		axios.get('/order').then(res => {
			console.log(res.data);
			const data = res.data;
			this.setState({
				isLoading: false,
				employee: {
					salesEmployeeID: data.employee._id,
					name: data.employee.imie,
					surname: data.employee.nazwisko,
					fullName: data.employee.imie + ' ' + data.employee.nazwisko
				},
				orderedPositions: [],
				orderPositions: data.wares,
				orderNum: data.todayOrderCounter + 1
			})
		})
	}

	onConfirm = (value) => {
		this.setState({
			orderedPositions: [{
				...value.selectedValue,
				amount: value.amount,
				isEditing: false
			}, ...this.state.orderedPositions],
			modalIsOpen: false
		})
	}
	onAddModal = () => {
		this.setState({
			modalIsOpen: true,
			errors: {
				...this.state.errors,
				orderedPositions: null
			}
		})
	}
	onDeleteOrderPos = (warePosID) => {
		this.setState({
			orderedPositions: this.state.orderedPositions.filter(orderPos => orderPos.id !== warePosID)
		})
	}
	onConfirmEdit = (value, warePosID) => {
		this.setState({
			orderedPositions: this.state.orderedPositions.map(orderPos => {
				if (orderPos.id === warePosID) {
					return {
						amount: value.amount,
						...value.selectedValue,
						isEditing: false
					}
				} else {
					return orderPos;
				}
			}),
			modalIsOpen: false
		})
	}
	onEditOrderPos = (warePosID) => {
		this.setState({
			modalIsOpen: true,
			orderedPositions: this.state.orderedPositions.map(orderPos => {
				if (orderPos.id === warePosID) {
					return {
						...orderPos,
						isEditing: true
					}
				} else {
					return orderPos;
				}
			})
		})
	}
	onChangeDate = (value) => {
		this.setState({
			dateOfOrder: new Date(value)
		})
	}
	onCloseModal = () => {
		this.setState({
			modalIsOpen: false
		})
	}
	state = {
		isLoading: true,
		orderNum: 1,
		employee: {
			salesEmployeeID: "1234",
			name: "Jan",
			surname: "Kowalski",
			fullName: "Jan Kowalski"
		},
		isSending: false,
		modalIsOpen: false,
		orderPositions: [],
		waresToSelect: {},
		orderedPositions: [],
		dateOfOrder: null,
		errors: {
			orderedPositions: null,
			dateOfOrder: null
		}
	}
	sendOrder = (orderNumber) => {
		this.setState({
			isSending: true
		}, () => {
			axios.post('/order', {
				orderPositions: this.state.orderedPositions.map(orderPos => ({
					id: orderPos.id,
					amount: orderPos.amount
				})),
				orderNumber,
				salesEmployeeID: this.state.employee.salesEmployeeID,
				dateOfOrder: this.state.dateOfOrder.getTime()
			}).then(res => {
				console.log(res.data)
				this.setState({
					isSending: false,
					orderedPositions: [],
					dateOfOrder: null
				})
			})
		})
	}
	addOrder = (orderNumber) => {
		let errors = {}
		if (this.state.orderedPositions.length === 0) {
			errors.orderedPositions = 'Nie mozna złożyć zamówienia bez dodania wcześniej pozycji';
		}
		if (!this.state.dateOfOrder) {
			errors.dateOfOrder = 'Proszę wybrać termin';
		}
		if (Object.keys(errors).length === 0) {
			this.sendOrder(orderNumber)
		} else {
			this.setState({
				errors
			})
		}
	}

	render() {
		const date = new Date();
		const dateElems = [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(lpad('0')(2));
		const selectedPos = this.state.orderedPositions.find(el => el.isEditing === true)
		return (
			<div>
				{this.state.isLoading ?
					<div>....Loading</div> :
					<div>
					{this.state.isSending? <div>
						...Sending
						</div>:
					<div>
						<HeaderWrapper>
							<Header>
								Dodaj zamówienie
							</Header>
							<DateView>{dateElems.join('.')}</DateView>
						</HeaderWrapper>
						<AddOrderTopSectionWrapper>
							<OrderInfo dateError={this.state.errors.dateOfOrder} onChangeDate={this.onChangeDate}
							           orderNum={dateElems.join('') + lpadZerosToProperLength(this.state.orderNum)}
							           employeeFullName={this.state.employee.fullName}/>
							<div style={{position: 'absolute', right: '50px'}}>
								<Button onClick={this.onAddModal} className="buttonMainOptions"
								        appearance="primary">Dodaj
									pozycję zamówienia</Button>
							</div>
						</AddOrderTopSectionWrapper>
						<OrderPositionTable onEdit={this.onEditOrderPos} onDelete={this.onDeleteOrderPos}
						                    orderedPositions={this.state.orderedPositions}/>
						<div style={{position: 'relative'}}>
							<BottomSectionWrapper>
								<ErrorMessage big>{this.state.errors.orderedPositions}</ErrorMessage>
								<ButtonGroup>
									<Button onClick={this.props.history.goBack} className="buttonMainOptions buttonDecisionPadding">
										Anuluj
									</Button>
									<div className="buttonSpacing "/>
									<Button
										onClick={() => this.addOrder(dateElems.join('') + lpadZerosToProperLength(this.state.orderNum))}
										className="buttonMainOptions buttonDecisionPadding"
										appearance="primary">
										Dodaj
									</Button>
								</ButtonGroup>
							</BottomSectionWrapper>
						</div>
						{this.state.modalIsOpen &&
						<OrderDialog
							onClose={this.onCloseModal}
							positions={this.state.orderPositions}
							selectedPosToEdit={selectedPos}
							title="Dodaj pozycje zamówienia"
							cancelText="Anuluj"
							confirmText="Dodaj"
							onConfirm={selectedPos ? this.onConfirmEdit : this.onConfirm}/>
						}
					</div>
					}</div>}
			</div>
		)
	}
}