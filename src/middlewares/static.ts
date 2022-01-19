import serveStatic from 'serve-static';
import contentDisposition from 'content-disposition';
import path from 'path';

export const staticMiddleware = serveStatic(path.resolve('src', 'static'), {
  fallthrough: false,
  index: false,
  setHeaders: (response, filePath) => {
    response.setHeader('Content-Disposition', contentDisposition(filePath));
  },
});
