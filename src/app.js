import express from 'express';
import getUrl from './modules/getURL';
import logger from './modules/log';
import router from './routes';

const app = express();
const port = 1984;
const appKey = 'welvlmlsorh765cn9d723sa72ew0342';

logger.info('Starting app');

app.use((req, res, next) => {
  console.log({ req });
  logger.info({ req });
  if (req.query.cookie) {
    const { cookie } = req.query;
    getUrl.setcookie(cookie);
  }

  const authorised = (req.query.key && req.query.key === appKey);
  console.log('authorised:', authorised);
  next();
  // if (!authorised) {
  //     return res.status(403).send("Unauthorised!");
  // }
  // else {
  //     next();
  // }
});


app.use('/', router);

app.listen(port, () => console.log('Botator app listening on port ', port)).setTimeout(500000);

getUrl.init();

process.on('uncaughtException', (err) => {
  // handle the error safely
  console.log('Uncaught Exception: ', err);
});
