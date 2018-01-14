const mongoose = require('mongoose');
const {Schema} = mongoose;
const ZamowienieSchema = new Schema({
	nrZamowienia: {
		type: String,
		required: true,
		unique: true
	},
	termin: {
		type: Number,
		required: true,

	},
	dataZlozenia: {
		type: Number,
		required: true,
		default: Date.now()
	},
	pracownikDzialuSprzedazy: {
		type: Schema.ObjectId,
		ref: 'PracownikDzialuSprzedazy'
	}
});

ZamowienieSchema.statics = {
	getOrdersCountFromToday() {
		const now = new Date();
		const day = now.getDate();
		const year = now.getFullYear();
		const month = now.getMonth();
		const today = new Date(year, month, day).valueOf();
		const tomorrow = Math.floor(new Date(year, month, day + 1).valueOf());
		return this.find({dataZlozenia:{ "$gte": today , "$lt": tomorrow}}).count().exec();
	},
	getOrdersFromToday() {
	const now = new Date();
	const day = now.getDate();
	const year = now.getFullYear();
	const month = now.getMonth();
	const today = new Date(year, month, day).valueOf();
	const tomorrow = Math.floor(new Date(year, month, day + 1).valueOf());
	return this.find({dataZlozenia:{ "$gte": today , "$lt": tomorrow}}).exec();
	}
}

module.exports = mongoose.model('Zamowienie', ZamowienieSchema);