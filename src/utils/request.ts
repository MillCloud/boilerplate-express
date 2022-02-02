import axios from 'axios';

import axiosRetry from 'axios-retry';

const instance = axios.create({
  timeout: 10_000,
});

axiosRetry(instance, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export { instance as request };
