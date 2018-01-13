const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = 5000;
mongoose.Promise = global.Promise;

app.use()
mongoose.connect('mongodb://localhost:27017/poLaby', {useMongoClient: true})
  .then(db => {
	  app.listen(port, () => `Server running on port ${port}`);
  });
