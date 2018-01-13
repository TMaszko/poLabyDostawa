const mongoose = require('mongoose');
const {Schema} = mongoose;
const ZamowienieSchema = new Schema({
	nrZamowienia: {
		type: String,
		required: true,
		unique: true
	},
	termin: {
		type: Date,
		required: true,

	},
	dataZlozenia: {
		type: Date,
		required: true,
		default: Date.now()
	},
	pracownikDzialuSprzedazy: {
		type: Schema.ObjectId,
		ref: 'PracownikDzialuSprzedazy'
	}

});

module.exports = mongoose.model('ZamowienieSchema', ZamowienieSchema);