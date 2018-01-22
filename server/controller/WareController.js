const SalesEmployee = require('../model/schemas/PracownikDzialuSprzedazy');
const Ware = require('../model/schemas/Towar');
const mongoose = require('mongoose');
const Deliverer = require('../model/schemas/Dostawca');
const CommissionPosition = require('../model/schemas/PozycjaZleceniaDostawy');
const OrderPosition = require('../model/schemas/PozycjaZamowienia');
const SuppliedWare = require('../model/schemas/DostarczanyTowar');
const Commission = require('../model/schemas/ZlecenieDostawy')
const Order = require('../model/schemas/Zamowienie');

const flatten = arr => arr.reduce((acc, curr) => acc.concat(curr), []);

class WareController {
	getAll(req, res, next) {
		Ware.getAll().then(wares => {
			res.json({wares})
		})
	}

	getDelivererWares(req, res, next) {
		SuppliedWare.getDelivererWares(req.params.deliverer)
		.then(wares => Order.getOrdersFromToday()
			.then(orders => {
					Promise.all(orders.map(order => OrderPosition.find({zamowienie: order._id}).exec()))
					.then(flatten)
					.then(positions =>
						positions.filter(pos => wares.findIndex(wareWithPrice => wareWithPrice.ware._id.toString() === pos.towar.toString()) !== -1)
						.map(pos => ({
								price: wares
								.find(wareWithPrice => wareWithPrice.ware._id.toString() === pos.towar.toString()).price,
								ware: pos
							})
						))
					.then(delivererPositions => {

							return {
								groupedWares: delivererPositions.reduce((acc, curr) => {
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
								}, {}),
								positionIds: delivererPositions.map(pos => pos.ware._id.toString())
							}
						}
					)
					.then(({ positionIds ,groupedWares}) => {
						console.log(groupedWares)
						const waresOrderedToday = Object.keys(groupedWares);
						return {
							waresOnlyFromPositions: wares
							.filter(wareWithPrice => waresOrderedToday.findIndex(wareID => wareID === wareWithPrice.ware._id.toString()) !== -1)
							.map(wareWithPrice => {
								return Object.assign({}, wareWithPrice.ware.toJSON(),
									{
										amount: groupedWares[wareWithPrice.ware._id.toString()].amount,
										price: wareWithPrice.price
									})
							}),
							positionIds,
						}
					})
					.then(({waresOnlyFromPositions, positionIds}) => {
						res.json({wares: waresOnlyFromPositions, positionIds});
					})
			})
		)
	}
}

module.exports = new WareController();