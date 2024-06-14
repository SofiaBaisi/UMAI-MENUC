const mongoose = require('mongoose'); 

const pedidoSchema = new Schema({
   user: { type: String, required: true },
   date: {type: Date, required: true },
   category: {type: String, required: true},
   menu: { type: String, required: true },
   price: {type: Number, required: true },
  
  });

