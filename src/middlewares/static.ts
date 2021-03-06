import serveStatic from 'serve-static';
import contentDisposition from 'content-disposition';
import path from 'path';

export const staticMiddleware = serveStatic(path.resolve(process.cwd(), 'static'), {
  index: false,
  fallthrough: false,
  setHeaders: (response, filePath) => {
    response.setHeader('Content-Disposition', contentDisposition(filePath));
  },
});
