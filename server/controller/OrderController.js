const SalesEmployee = require('../model/schemas/PracownikDzialuSprzedazy');
const Ware = require('../model/schemas/Towar');
const mongoose = require('mongoose');
const OrderPosition = require('../model/schemas/PozycjaZamowienia');
const Order = require('../model/schemas/Zamowienie');
class OrderController {
	constructor() {
	}

	getAddOrder(req, res, next) {
		const employeePromise = SalesEmployee.getOneEmployee();
		const waresPromise = Ware.getAll();
		const todayOrderCounter = Order.getOrdersCountFromToday();
		Promise.all([employeePromise, waresPromise, todayOrderCounter]).then(([employee, wares, todayOrderCounter]) =>{
			const name = employee.imie;
			const surname = employee.nazwisko;
			res.json({employee: {name, surname}, wares, todayOrderCounter});
		})

	}
	addOrder(req,resToClient,next) {
		console.log(req.body.orderPositions);
		console.log(req.body.orderNumber);
		console.log(req.body.salesEmployeeID);
		console.log(req.body.dateOfOrder);
		const { orderPositions, orderNumber, salesEmployeeID, dateOfOrder} = req.body;
		const order = new Order({
			_id: new mongoose.Types.ObjectId(),
			nrZamowienia: orderNumber,
			termin: dateOfOrder,
			pracownikDzialuSprzedazy: mongoose.Types.ObjectId()
		})
		order.save().then(res => {
			const orderPositionsPromises = orderPositions.map(orderPos => {
				return new OrderPosition({
					towar: mongoose.Types.ObjectId(),
					ilosc: orderPos.amount,
					zamowienie: order._id
				}).save()
			});
			Promise.all(orderPositionsPromises).then(res => {
				resToClient.statusCode = 200;
				resToClient.json({data: req.body});
			})
		})

	}

}

module.exports = new OrderController();

