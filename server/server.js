const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controller/routes');
const Towar = require('./model/schemas/Towar');
const Zamowienie = require('./model/schemas/Zamowienie');
const PozycjaZamowienia = require('./model/schemas/PozycjaZamowienia');
const DostarczanyTowar = require('./model/schemas/DostarczanyTowar');
const path = require('path');
const app = express();

const port = 5000;
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname,'view/client/public')));
app.use(bodyParser.json());
app.use(routes);


mongoose.connect('mongodb://localhost:27017/poLaby', {useMongoClient: true})
  .then(db => {
	  app.listen(port, () => `Server running on port ${port}`);
  });



// const ware = Towar.saveWare({
// 	min: 1,
// 	max: 20,
// 	nazwa: "Butelka wina czerwonego"
// })






//
// const order = new Zamowienie({
// 	nrZamowienia: '140120180002' +mongoose.Types.ObjectId().toString(),
// 	termin: new Date(2018,0,16).valueOf(),
// 	pracownikDzialuSprzedazy: mongoose.Types.ObjectId("5a5a528a4f3bfa1630f2db0b")
// })
//
// order.save().then(res => console.log('Zamowienie zapisane xD'));

// const orderPosition = new PozycjaZamowienia({
// 	towar: mongoose.Types.ObjectId("5a5a5b27b84a2453c8555772"),
// 	ilosc: 30,
// 	zamowienie: mongoose.Types.ObjectId("5a5b3350b22bb322e0733f26"),
// })
//
// orderPosition.save().then(res => console.log('Pozycja Zapisana!!'));

// const suppliedWare = new DostarczanyTowar({
// 	towar: mongoose.Types.ObjectId("5a5cedf816399b73fc60f150"),
// 	dostawca: mongoose.Types.ObjectId("5a5b403dc5c433065cfb0f1d"),
// 	cenaWgDostawcy: 10.00
// })
//
// suppliedWare.save().then(res => console.log('zapisane', res));

