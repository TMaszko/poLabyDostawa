const mongoose = require('mongoose');
const {Schema} = mongoose;
const PozycjaZleceniaDostawySchema = new Schema({
	ilosc: {
		type: Number,
		required: true
	},
	cena:{
		type: Number,
		required: true
	},
	zlecenieDostawy: {
		type: Schema.ObjectId,
		ref: 'Zlecenie Dostawy'
	}
})

module.exports = mongoose.model('PozycjaZleceniaDostawy', PozycjaZleceniaDostawySchema);