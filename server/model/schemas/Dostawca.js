const mongoose = require('mongoose');
const {Schema} = mongoose;
const DostawcaSchema = new Schema({
	nazwa: {
		type: String,
		required: true
	},
	nrNIP:{
		type: String,
		maxLength: 10,
		required: true,
		unique: true
	}
})

module.exports = mongoose.model('Dostawca', DostawcaSchema);