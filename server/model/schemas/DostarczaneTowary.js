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

module.exports = mongoose.model('DostarczaneTowary', DostarczaneTowarySchema);