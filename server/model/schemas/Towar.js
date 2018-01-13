const mongoose = require('mongoose');
const {magazynID} = require('../consts');
const {Schema} = mongoose;
const TowarSchema = new Schema({
	nazwa: {
		type: String,
		required: true,
		unique: true
	},
	min: {
		type: Number,
		required: true
	},
	max: {
		type: Number,
		required: true
	},
	magazyn: {
		type: Schema.ObjectId,
		ref: 'Magazyn'
	}
})


TowarSchema.statics = {
	saveWare(ware) {
		ware.magazyn = magazynID;
		return this.save(ware).exec()
	}
}

module.exports = mongoose.model('Towar', TowarSchema);


