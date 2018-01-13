const mongoose = require('mongoose');
const {Schema} = mongoose;
const PracownikDzialuZaopatrzeniaSchema = new Schema({
	imie: {
		type: String,
		required: true
	},
	nazwisko: {
		type: String,
		required: true
	},
	PESEL: {
		type: String,
		maxLength: 11,
		unique: true
	},
	magazyn: {
		type: Schema.ObjectId,
		ref: 'Magazyn'
	}

})

module.exports = mongoose.model('PracownikDzialuSprzedazy', PracownikDzialuSprzedazySchema);