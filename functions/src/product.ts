import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors');
const db = admin.firestore();

interface ProductIncomingData {
  name: string;
  price: number;
  description: string;
}

export interface ProductData extends ProductIncomingData {
  id: string;
  image: string;
  updatedAt: admin.firestore.Timestamp;
  createdAt: admin.firestore.Timestamp;
}

export interface Product extends ProductIncomingData {
  id: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export function serializeProduct(data: ProductData) {
  return {
    id: data.id,
    name: data.name,
    price: data.price,
    description: data.description,
    image: data.image,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
}

const products = express();

products.use(cors({origin: true}));

products.use(function(request: functions.Request, response: functions.Response, next: Function) {
  request.url = request.url.replace(/^\/api\/products/i, '');
  next();
});

products.post('/:user/', async (request: functions.Request, response: functions.Response) => {
  const user = request.params.user;
  const body = request.body as ProductIncomingData;

  if (!body.name || !body.price || !body.description) {
    console.error('required params', body);
    return response.sendStatus(400);
  }

  const product = {
    id: db.collection('_').doc().id,
    name: body.name,
    price: body.price,
    description: body.description,
    image: `https://picsum.photos/id/${Math.floor(Math.random() * 500) + 1}/300/300`,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.doc(`/users/${user}/products/${product.id}`).set(product);

  return response.json(product);
});

products.get('/:user/', async (request: functions.Request, response: functions.Response) => {
  const user = request.params.user;
  const productsList: Product[] = [];

  const productsSnapshot = await db.collection(`/users/${user}/products`).get();

  productsSnapshot.forEach(doc => {
    const product = serializeProduct(doc.data() as ProductData);

    productsList.push(product);
  });

  return response.json(productsList);
});

products.get('/:user/:id', async (request: functions.Request, response: functions.Response) => {
  const user = request.params.user;
  const productId = request.params.id;

  const productsSnapshot = await db.doc(`/users/${user}/products/${productId}`).get();

  if (!productsSnapshot.exists) {
    console.error('product id', productId, 'not exist');
    return response.sendStatus(404);
  }

  return response.json(serializeProduct(productsSnapshot.data() as ProductData));
});

products.put('/:user/:id', async (request: functions.Request, response: functions.Response) => {
  const user = request.params.user;
  const body = request.body as ProductIncomingData;
  const productId = request.params.id;

  const productReference = db.doc(`/users/${user}/products/${productId}`);
  const updatedProduct = {} as any;

  for (const [key, value] of Object.entries(body)) {
    if (['name', 'price', 'description'].includes(key)) {
      updatedProduct[key] = value;
    }
  }

  updatedProduct.updatedAt = admin.firestore.FieldValue.serverTimestamp();

  try {
    await productReference.update(updatedProduct);

    const productSnapshot = await productReference.get();
    response.json(serializeProduct(productSnapshot.data() as ProductData));
  } catch (e) {
    console.error(e.message);
    response.sendStatus(404);
  }
});

products.delete('/:user/:id', async (request: functions.Request, response: functions.Response) => {
  const user = request.params.user;
  const productId = request.params.id;

  const productReference = db.doc(`/users/${user}/products/${productId}`);
  const productSnapshot = await productReference.get();

  if (!productSnapshot.exists) {
    console.error('product id', productId, 'not exist');
    return response.sendStatus(404);
  }

  await productReference.delete();

  return response.json(serializeProduct(productSnapshot.data() as ProductData));
});

export default products;
