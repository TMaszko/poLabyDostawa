const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controller/routes');
const Towar = require('./model/schemas/Towar');
const Zamowienie = require('./model/schemas/Zamowienie');
const PozycjaZamowienia = require('./model/schemas/PozycjaZamowienia');
const app = express();

const port = 5000;
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(routes);


mongoose.connect('mongodb://localhost:27017/poLaby', {useMongoClient: true})
  .then(db => {
	  app.listen(port, () => `Server running on port ${port}`);
  });

// const order = new Zamowienie({
// 	nrZamowienia: '130120180001' +mongoose.Types.ObjectId().toString(),
// 	termin: Math.floor(new Date(2018,0,13).valueOf()),
// 	pracownikDzialuSprzedazy: mongoose.Types.ObjectId("5a5a528a4f3bfa1630f2db0b")
// })
//
// order.save().then(res => console.log('Zamowienie zapisane xD'));

// const orderPosition = new PozycjaZamowienia({
// 	towar: mongoose.Types.ObjectId("5a5a5b27b84a2453c8555772"),
// 	ilosc: 30,
// 	zamowienie: mongoose.Types.ObjectId("5a5a67a21177995dc8c731d7"),
// })
//
// orderPosition.save().then(res => console.log('Pozycja Zapisana!!'));

