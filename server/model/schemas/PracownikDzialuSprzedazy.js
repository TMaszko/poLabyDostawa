const mongoose = require('mongoose');
const {Schema} = mongoose;
const PracownikDzialuSprzedazySchema = new Schema({
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
	}

})

module.exports = mongoose.model('PracownikDzialuSprzedazy', PracownikDzialuSprzedazySchema);