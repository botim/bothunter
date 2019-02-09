import express from 'express';
import getUrl from './modules/getURL';
import logger from './modules/log';
import router from './routes';

const app = express();
const port = 1984;
const appKey = 'welvlmlsorh765cn9d723sa72ew0342';

logger.info('Starting app');

app.use((req, res, next) => {
  if (req.query.cookie) {
    const { cookie } = req.query;
    getUrl.setcookie(cookie);
  }
  next();
});


app.use('/', router);

app.listen(port, () => logger.info('Botator app started', { port })).setTimeout(500000);

getUrl.init();

process.on('uncaughtException', (err) => {
  // handle the error safely
  console.log('Uncaught Exception: ', err);
});
