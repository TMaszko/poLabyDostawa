const mongoose = require('mongoose');
const {Schema} = mongoose;
const PozycjaZamowieniaSchema = new Schema({
	towar: {
		type: Schema.ObjectId,
		ref: 'Towar',
		required: true
	},
	ilosc: {
		type: Number,
		required: true
	},
	zamowienie: {
		type: Schema.ObjectId,
		ref: 'Zamowienie'
	},
	pozycjaZleceniaDostawy: {
		type: Schema.ObjectId,
		ref: 'PozycjaZleceniaDostawy'
	}
})

module.exports = mongoose.model('PozycjaZamowienia', PozycjaZamowieniaSchema);