import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors');

const data = express();

data.use(cors({origin: true}));

data.use(function(request: functions.Request, response: functions.Response, next: Function) {
  request.url = request.url.replace(/^\/api\/data/i, '');
  next();
});

data.get('/:user/:file/', async (request: functions.Request, response: functions.Response) => {
  const filePath = `/users/${request.params.user}/products/${request.params.file}`;
  const bucket = admin.storage().bucket();

  bucket.file(filePath).createReadStream().on('error', error => {
    response.sendStatus(404);
    console.error(error);
  }).pipe(response);
});

export default data;
