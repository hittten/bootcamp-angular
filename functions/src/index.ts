import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
}

export const addProduct = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    return response.sendStatus(404);
  }

  const user = request.params[0].replace('/', '');
  if (!user) {
    return response.sendStatus(400);
  }

  const data = request.body as Product;
  const products = await db.collection('products-' + user).orderBy('createdAt', 'desc').limit(1).get();
  const product = {
    id: 1,
    name: data.name,
    price: data.price,
    description: data.description,
    image: 'https://picsum.photos/id/1/300/300',
    createdAt: new Date(),
  };

  if (!products.empty) {
    products.forEach(dbProduct => {
      const dbData = dbProduct.data() as Product;
      product.id = dbData.id + 1;
    });
  }
  await db.collection('products-' + user).doc(product.id.toString()).set(product);

  return response.json(product);
});

export const getProducts = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Cache-Control', 'public, max-age=15, s-maxage=30');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  if (request.method !== 'GET') {
    return response.sendStatus(404);
  }

  const user = request.params[0].replace('/', '');
  if (!user) {
    return response.sendStatus(404);
  }

  const products = await db.collection('products-' + user).get();

  return response.json(products);
});

export const addProductToShoppingCar = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Cache-Control', 'public, max-age=30, s-maxage=60');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method !== 'POST') {
    return response.sendStatus(404);
  }

  const user = request.params[0].replace('/', '');
  if (!user) {
    return response.sendStatus(400);
  }

  const id = request.query.id;
  if (!id) {
    return response.sendStatus(400);
  }

  const product = await db.collection('products').doc(id).get();

  const data = product.data();
  if (!product.exists || !data) {
    return response.sendStatus(404);
  }

  const result = {...data, ...{createdAt: data.createdAt.toDate()}};
  return response.json(result);
});
