import serveStatic from 'express-static-gzip';
import contentDisposition from 'content-disposition';
import path from 'path';

export const staticMiddleware = serveStatic(path.resolve(process.cwd(), 'static'), {
  index: false,
  serveStatic: {
    fallthrough: false,
    index: false,
    setHeaders: (response, filePath) => {
      response.setHeader('Content-Disposition', contentDisposition(filePath));
    },
  },
});
