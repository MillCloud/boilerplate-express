import cron from 'node-cron';

export const logSchedule = cron.schedule(
  '* * * * *',
  () => {
    console.log('running a task every minute');
  },
  {
    scheduled: false,
  },
);
