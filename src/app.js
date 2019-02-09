import express from 'express';
import getUrl from './modules/getURL';
import router from './routes';
import logger from './modules/log';

const app = express();
const port = 1984;

app.use((req, res, next) => {
  logger.info({ req });
  if (req.query.cookie) {
    const { cookie } = req.query;
    getUrl.setcookie(cookie);
  }
});


app.use('/', router);
app.listen(port, () => logger.info(`Botator app listening on port ${port}`)).setTimeout(500000);
getUrl.init();
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ', err);
});
