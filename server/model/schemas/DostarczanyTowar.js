const mongoose = require('mongoose');
const {Schema} = mongoose;
const DostarczaneTowarySchema = new Schema({
	cenaWgDostawcy: {
		type: Number,
		required: true
	},
	towar: {
		type: Schema.ObjectId,
		ref: 'Towar'
	},
	dostawca: {
		type: Schema.ObjectId,
		ref: 'Dostawca'
	}

})
DostarczaneTowarySchema.statics = {
	getDelivererWares(deliver) {
		return this.find({dostawca: mongoose.Types.ObjectId(deliver)}).populate('towar')
		.then(suppliedWares =>
			suppliedWares.map(suppliedWare => ({ price: suppliedWare.cenaWgDostawcy, ware: suppliedWare.towar })))

	}
}

module.exports = mongoose.model('DostarczanyTowar', DostarczaneTowarySchema);