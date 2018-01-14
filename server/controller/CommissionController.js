const SalesEmployee = require('../model/schemas/PracownikDzialuSprzedazy');
const Ware = require('../model/schemas/Towar');
const mongoose = require('mongoose');
const Deliverer = require('../model/schemas/Dostawca');
const Commission = require('../model/schemas/ZlecenieDostawy');
const CommissionPosition = require('../model/schemas/PozycjaZleceniaDostawy');
const OrderPosition = require('../model/schemas/PozycjaZamowienia');
const SuppliedWare = require('../model/schemas/DostarczanyTowar');
const Order = require('../model/schemas/Zamowienie');

const flatten = arr => arr.reduce((acc, curr) => acc.concat(curr),[]);

class CommissionController {
	getAddCommissionDeliverers(req, res, next) {
		const orders = Order.getOrdersFromToday()
		orders.then(orders => Promise.all(orders.map(order => OrderPosition.find({zamowienie: order._id}).exec())))
			.then(flatten)
			.then(positions => Promise.all(positions.map(pos => SuppliedWare.find({towar: pos.towar}).populate('dostawca').exec())))
			.then(flatten)
			.then(suppliedWaresWithDeliverers => suppliedWaresWithDeliverers.map(suppliedWare => suppliedWare.dostawca))
			.then(deliverers => {
				const deliverersUnique = deliverers.reduce((acc, curr) => {
					acc[curr._id] = curr;
					return acc;
				},{});
				res.json({deliverers: deliverersUnique});
			})
	}
	addCommission(req, resToClient, next) {
		console.log(req.body.positionIds);
		console.log(req.body.deliverer);
		console.log(req.body.commissionPositions);
		console.log(req.body.commissionNumber);
		console.log(req.body.supplierEmployeeID);
		console.log(req.body.dateOfCommission);
		const {commissionPositions, commissionNumber, supplierEmployeeID, dateOfCommission, deliverer, positionIds} = req.body;
		const commission = new Commission({
			_id: new mongoose.Types.ObjectId(),
			dostawca: new mongoose.Types.ObjectId(),
			cenaZlecenia: commissionPositions.map(commissionPos => commissionPos.price).reduce((acc, curr) => acc + curr, 0),
			nrZlecenia: commissionNumber + new mongoose.Types.ObjectId().toString(),
			termin: dateOfCommission,
			pracownikDzialuZaopatrzenia: new mongoose.Types.ObjectId()
		})
		commission.save().then(res => {
			const commissionPositionsPromises = commissionPositions.map(commissionPos => {
				const commissionPosition = new CommissionPosition({
					_id: new mongoose.Types.ObjectId(),
					zlecenieDostawy: new mongoose.Types.ObjectId(),
					cena: commissionPos.price,
					ilosc: commissionPos.amount,
				});
				return commissionPosition.save()
				.then(res => {
					return positionIds.map(orderPos => OrderPosition.findById(mongoose.Types.ObjectId(orderPos))
						.then(orderPosInDB => {
							orderPosInDB.pozycjaZleceniaDostawy = new mongoose.Types.ObjectId(orderPos);
							return orderPosInDB.save()
						}))
				})
			});
			Promise.all(commissionPositionsPromises).then(res => {
				resToClient.statusCode = 200;
				resToClient.json({data: req.body});
			})
		})
	}
}

module.exports = new CommissionController();