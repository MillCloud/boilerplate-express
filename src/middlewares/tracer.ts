import { tracer } from '@/utils';

const tracerMiddleware = tracer.expressMiddleware();

export { tracerMiddleware };
