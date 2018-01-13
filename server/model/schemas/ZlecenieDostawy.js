const mongoose = require('mongoose');
const {Schema} = mongoose;
const ZlecenieDostawySchema = new Schema({
	termin: {
		type: Date,
		required: true
	},
	cenaZlecenia:{
		type: Number,
		required: true
	},
	dostawca: {
		type: Schema.ObjectId,
		ref: 'Dostawca'
	},
	pracownikDzialuZaopatrzenia: {
		type: Schema.ObjectId,
		ref: 'PracownikDzialuZaopatrzenia'
	}
})

module.exports = mongoose.model('ZlecenieDostawy', ZlecenieDostawySchema);