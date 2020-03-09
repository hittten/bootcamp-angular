import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();

import products from './product';
import shoppingCar from './shopping-car';
import data from './data';

exports.products = functions.https.onRequest(products);
exports.shoppingCar = functions.https.onRequest(shoppingCar);
exports.data = functions.https.onRequest(data);
