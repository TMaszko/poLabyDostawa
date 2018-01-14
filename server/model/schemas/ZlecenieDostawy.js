const mongoose = require('mongoose');
const {Schema} = mongoose;
const ZlecenieDostawySchema = new Schema({
	termin: {
		type: Number,
		required: true
	},
	dataZlozenia: {
		type: Number,
		required: true,
		default: Date.now()
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
	},
	nrZlecenia: {
		type: String,
		required: true,
		unique: true
	}
})
 ZlecenieDostawySchema.statics = {
	getCommissionsCountFromToday() {
		 const now = new Date();
		 const day = now.getDate();
		 const year = now.getFullYear();
		 const month = now.getMonth();
		 const today = new Date(year, month, day).valueOf();
		 const tomorrow = Math.floor(new Date(year, month, day + 1).valueOf());
		 return this.find({dataZlozenia:{ "$gte": today , "$lt": tomorrow}}).count().exec()
	 }
 }

module.exports = mongoose.model('ZlecenieDostawy', ZlecenieDostawySchema);