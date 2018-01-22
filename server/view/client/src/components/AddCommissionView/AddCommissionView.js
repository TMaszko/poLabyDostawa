import React, {Component} from 'react';
import Header from './HeaderView'
import HeaderWrapper from './HeaderWrapper'
import DateView from './DateView';
import OrderDialog from '../OrderDialog/OrderDialog';
import Spinner from '@atlaskit/spinner'
import Button, {ButtonGroup} from '@atlaskit/button';
import AddOrderTopSectionWrapper from "./AddCommissionTopSectionWrapper";
import CommissionInfo from "./CommissionInfo";
import CommissionPositionTable from './CommissionPositionTable'
import ErrorMessage from './ErrorMessage'
import SingleSelect, {StatelessSelect} from '@atlaskit/single-select'
import axios from 'axios'
import './addCommissionView.css'
import BottomSectionWrapper from "./BottomSectionWrapper";


export const lpad = valueToFillSpace => length => str => {
	const strToPad = String(str);
	const lengthToFill = length - strToPad.length;
	return Array.from({length: lengthToFill < 0 ? 0 : lengthToFill}, _ => valueToFillSpace).join('') + str;
};

export const groupByWare = delivererPositions =>
	delivererPositions.reduce((acc, curr) => {
	acc[curr.ware.towar.toString()] = acc[curr.ware.towar.toString()] || {
		amount: 0,
		ware: curr.ware.towar.toString(),
		price: curr.price,
	};
	acc[curr.ware.towar.toString()] = {
		ware: curr.ware.towar.toString(),
		amount: acc[curr.ware.towar.toString()].amount + curr.ware.ilosc,
		price: curr.price
	}
	return acc;
}, {})
const mapPrice = wares => wares. map(ware => ({...ware, total: ware.amount * ware.price}));

export const countPrice = wares => wares.reduce((acc, curr) => acc + curr.total,0);
const lpadZerosToProperLength = lpad('0')(4);


export default class AddOrder extends Component {
	componentWillMount() {
		axios.get('/commission').then(res => {
			this.setState({
				isLoading: false,
				dateOfCommission: res.data.dateOfCommission,
				deliverers: res.data.deliverers,
				commissionCounter: res.data.commissionCounter + 1
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
	onDeleteCommissionPos = (warePosID) => {
		this.setState({
			addedCommissionPositions: this.state.addedCommissionPositions.filter(commissionPos => commissionPos._id !== warePosID)
		})
	}

	state = {
		deliverers: null,
		isLoadingWares: false,
		isLoading: true,
		employee: {
			salesEmployeeID: "1234",
			name: "Jan",
			surname: "Kowalski",
			fullName: "Jan Kowalski"
		},
		isSending: false,
		addedCommissionPositions: [],
		commissionPositions: [],
		dateOfCommission: null,
		errors: {
			addedCommissionPositions: null,
			delivererError: null
		}
	}
	sendCommission = (commissionNumber) => {
		this.setState({
			isSending: true
		}, () => {
			axios.post('/commission', {
				positionIds: this.state.positionIds,
				deliverer: this.state.selectedDelivererID,
				commissionNumber,
				commissionPositions: this.state.addedCommissionPositions.map(commissionPos => {
					return {
						price: commissionPos.total,
						amount: commissionPos.amount
					}
				}),
				supplierEmployeeID: "1234",
				dateOfCommission: this.state.dateOfCommission
			}).then(res => {
				this.setState({
					isSending: false,
					addedCommissionPositions: [],
					commissionPositions: [],
					selectedDelivererID: null,
					selectedPos: null
				})
			})
		})
	}
	onChangeDeliverer = (selectedItem) => {
		this.setState({
			selectedDelivererID: selectedItem.item.value,
		}, () => {
			this.setState({
				isLoadingWares: true
			}, () => {
				axios.get(`/ware/${selectedItem.item.value}`).then(res => {
					this.setState({
						commissionPositions: mapPrice(res.data.wares),
						positionIds: res.data.positionIds,
						addedCommissionPositions: [],
						isLoadingWares: false,
						errors: {}
					})
				})
			})

		})
	}
	onChangeWare = (selectedItem) => {
		this.setState({
			selectedPos: selectedItem.item.value
		})
	}
	addCommission = (commissionNumber) => {
		let errors = {}
		if (this.state.addedCommissionPositions.length === 0) {
			errors.addedCommissionPositions = 'Nie można złożyć zlecenia bez dodania wcześniej pozycji';
		}
		if (!this.state.selectedDelivererID) {
			errors.delivererError = 'Proszę wybrać dostawcę';
		}
		if (Object.keys(errors).length === 0) {
			this.sendCommission(commissionNumber)
		} else {
			this.setState({
				errors
			})
		}
	}
	onAddWareToCommission = () => {
		if(this.state.selectedPos && !this.state.addedCommissionPositions.find(el => el._id === this.state.selectedPos._id)) {
			this.setState({
				addedCommissionPositions: [{...this.state.selectedPos}, ...this.state.addedCommissionPositions],

			})
		}
	}

	render() {
		const date = new Date();
		const dateElems = [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(lpad('0')(2));
		const today = new Date(date.getDate(), date.getMonth() + 1, date.getFullYear());
		const selectItemsAvailable = [{
			items: this.state.commissionPositions.filter(commissionPos => this.state.addedCommissionPositions.findIndex(addedPos => addedPos._id === commissionPos._id) === -1).map(ware => ({
			content: ware.nazwa,
			value: ware
		}))
		}]

		const selectComponent = (items ,defaultValue, onChange) => <SingleSelect
			label="Wybierz Towar"
			placeholder="Wybierz Towar..."
			items={items}
			onSelected={onChange}
			isRequired
		/>
		return (
			<div>
				{this.state.isLoading ?
					<div>....Loading</div> :
					<div>
						{this.state.isSending ? <div>
								...Sending
							</div> :
							<div>
								<HeaderWrapper>
									<Header>
										Dodaj zlecenie dostawy
									</Header>
									<DateView>{dateElems.join('.')}</DateView>
								</HeaderWrapper>
								<AddOrderTopSectionWrapper>
									<CommissionInfo
										errors={this.state.errors.delivererError}
										today={today}
										deliverers={this.state.deliverers}
										dateOfCommission={dateElems.join('.')}
										onChangeDeliverer={this.onChangeDeliverer}
										commissionNum={dateElems.join('') + lpadZerosToProperLength(this.state.commissionCounter)}
										employeeFullName={'Jan Kowalski'}/>
									<div style={{
										position: 'absolute',
										right: '50px',
										display: 'flex',
										flexDirection: ' row'
									}}>
										<Spinner isCompleting={!this.state.isLoadingWares}/>
										{selectComponent(selectItemsAvailable,{},this.onChangeWare)}
										<div className="buttonSpacingBIG"/>
										<Button onClick={this.onAddWareToCommission} className="buttonMainOptions"
										        appearance="primary">Dodaj
											towar do zlecenia</Button>

									</div>
								</AddOrderTopSectionWrapper>
								<CommissionPositionTable onDelete={this.onDeleteCommissionPos} commissionPositions={this.state.addedCommissionPositions}/>
								<div style={{display: 'flex', justifyContent: 'flex-end', marginRight:'400px', marginTop:'50px'}}><p><b>{this.state.addedCommissionPositions.length > 0 &&
								`Podsumowanie: ${this.state.addedCommissionPositions.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}zl`}</b></p>
								</div>
								<div style={{position: 'relative'}}>
									<BottomSectionWrapper>
										<ErrorMessage big>{this.state.errors.addedCommissionPositions}</ErrorMessage>
										<ButtonGroup>
											<Button onClick={this.props.history.goBack} className="buttonMainOptions buttonDecisionPadding">
												Anuluj
											</Button>
											<div className="buttonSpacing "/>
											<Button
												onClick={() => this.addCommission(dateElems.join('') + lpadZerosToProperLength(this.state.commissionCounter))}
												className="buttonMainOptions buttonDecisionPadding"
												appearance="primary">
												Dodaj
											</Button>
										</ButtonGroup>
									</BottomSectionWrapper>
								</div>
							</div>
						}</div>}
			</div>
		)
	}
}