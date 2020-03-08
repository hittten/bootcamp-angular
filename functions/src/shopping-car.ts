import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {Product, ProductData, serializeProduct} from './product';

const express = require('express');
const cors = require('cors');
const db = admin.firestore();

const shoppingCar = express();

shoppingCar.use(cors({origin: true}));

shoppingCar.use(function (request: functions.Request, response: functions.Response, next: Function) {
  request.url = request.url.replace(/^\/api\/shoppingCar/i, '');
  next();
});

shoppingCar.get('/:user/', async (request: functions.Request, response: functions.Response) => {
  const collection = 'shopping-car-' + request.params.user;
  const shoppingCarList: Product[] = [];

  const productsSnapshot = await db.collection(collection).get();

  productsSnapshot.forEach(doc => {
    const product = serializeProduct(doc.data() as ProductData);

    shoppingCarList.push(product);
  });

  return response.json(shoppingCarList);
});

shoppingCar.put('/:user/:productId/', async (request: functions.Request, response: functions.Response) => {
  const productCollection = 'products-' + request.params.user;
  const shoppingCarCollection = 'shopping-car-' + request.params.user;
  const productId = request.params.productId;

  const productReference = db.collection(productCollection).doc(productId);
  const productsSnapshot = await productReference.get();
  const product = productsSnapshot.data();

  if (!productsSnapshot.exists || !product) {
    console.error('product id', productId, 'not exist');
    return response.sendStatus(404);
  }

  await db.collection(shoppingCarCollection).add(product);
  return response.sendStatus(200);
});

shoppingCar.delete('/:user/:productId/', async (request: functions.Request, response: functions.Response) => {
  const collection = 'shopping-car-' + request.params.user;
  const productId = request.params.productId;
  const productReference = await db.collection(collection).where('id', '==', productId).limit(1).get();

  if (productReference.empty) {
    console.error('product id', productId, 'not exist');
    return response.sendStatus(404);
  }
  productReference.forEach(item => {
    item.ref.delete().then(() => response.sendStatus(200));
  });

  return;
});

export default shoppingCar;
