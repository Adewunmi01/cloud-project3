import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import 'express-async-errors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import logger from 'morgan';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('combined'))

process.env.GOOGLE_APPLICATION_CREDENTIALS = './keysload/keys1.json'

import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const axios = require('axios')

const { Storage } = require('@google-cloud/storage')

// const storage = new Storage()

// async function getObjectMetadata(bucketName, fileName) {
//   try {
//     const file = storage.bucket(bucketName).file(fileName)
//     const [metadata] = await file.getMetadata()
//     console.log(`Metadata for file ${fileName}:`, metadata)
//   } catch (err) {
//     console.error('Error retrieving metadata:', err)
//   }
// }


// getObjectMetadata('serve-images','how-to-build-a-machine-learning-portfolio.jpeg')

app.get('/', (req,res) => {
  res.send('<h1>TASK 3</h1>')
})


app.get('/meta/1', (req,res) => {
  axios.get('https://storage.googleapis.com/storage/v1/b/serve-images/o/how-to-build-a-machine-learning-portfolio.jpeg')
  .then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data))
    console.log(response.data);
  })
  .catch((error) => {
    res.send(error)
    console.error(error);
  });
  
})

app.get('/meta/2', (req,res) => {
  axios.get('https://storage.googleapis.com/storage/v1/b/serve-images/o/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg')
  .then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data))
    console.log(response.data);
  })
  .catch((error) => {
    res.send(error)
    console.error(error);
  });
  
})

app.get('/meta/3', (req,res) => {
  axios.get('https://storage.googleapis.com/storage/v1/b/serve-images/o/pexels-pixabay-220383.jpg')
  .then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data))
    console.log(response.data);
  })
  .catch((error) => {
    res.send(error)
    console.error(error);
  });
  
})



const port = process.env.PORT || 6000

const start = async () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`))
  
      //CHECK THE RESULTS ON THE CONSOLE
      
     // console.log(setTrans);
      //console.log(setUsers);
    } catch (error) {
      console.log(error)
    }
  };
  
  start()