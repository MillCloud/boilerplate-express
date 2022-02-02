import Agenda from 'agenda';
import { APP_DB_URI } from '../constants';

const agenda = new Agenda({ db: { address: APP_DB_URI } });

const LOG_EVERY_MINUTE = 'LOG_EVERY_MINUTE';
agenda.define(LOG_EVERY_MINUTE, async () => {
  console.log(`${new Date().toISOString()} ${LOG_EVERY_MINUTE} run.`);
});

// (async () => {
//   await agenda.start();
//   await agenda.every('* * * * *', LOG_EVERY_MINUTE);
// })();
