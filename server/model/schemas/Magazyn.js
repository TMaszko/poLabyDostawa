const mongoose = require('mongoose');
const {Schema} = mongoose;
const MagazynSchema = new Schema({
	pojemnosc: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('Magazyn', MagazynSchema);