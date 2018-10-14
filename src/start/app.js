import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import winstonlogger from './logger';
import graphqlRouter from '@/graphql/graphqlRouter';

require('babel-core/register');
require('babel-polyfill');

dotenv.config();

// create new express app
const app = express();

const PORT = process.env.PORT || 1564;

app.set('port', PORT);

app.use(helmet());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '20mb'
  })
);

// serve static files in public folder
const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath));

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Graphql started kit'
}));

graphqlRouter.applyMiddleware({ app });

app.listen(PORT, () => winstonlogger.info(
  `Server started on port localhost:${PORT} \n
       Grapghql path is => localhost:${PORT}${graphqlRouter.graphqlPath} \n
       You can access the playground at localhost:${PORT}${graphqlRouter.graphqlPath}/playground`
));

export default app;
