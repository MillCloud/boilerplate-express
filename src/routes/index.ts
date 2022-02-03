import { IS_PRODUCTION } from '@/constants';
import { rateLimitMiddleware } from '@/middlewares';
import { getRouterPath } from '@/utils';
import { Express } from 'express';
import { marked } from 'marked';
import hljs from 'highlight.js';
import fs from 'fs';
import path from 'path';
import { homePath, homeRouter } from './home';
import { authPath, authRouter } from './auth';

marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
});

export default (app: Express) => {
  if (IS_PRODUCTION) {
    app.use(getRouterPath(), rateLimitMiddleware);
  }

  app.use(authPath, authRouter);
  app.use(homePath, homeRouter);

  app.use(getRouterPath('/api-docs'), (request, response, next) => {
    const baseUrl = request.baseUrl.toLowerCase();
    const index = baseUrl.lastIndexOf('/');
    const fileName = ['api-docs', 'index'].includes(baseUrl.slice(index + 1))
      ? 'README'
      : baseUrl.slice(index + 1);
    const filePath = path.resolve(process.cwd(), 'docs', `${fileName}.md`);
    if (fs.existsSync(filePath)) {
      response.send(
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.4.0/styles/github-dark.css">${marked.parse(
          fs.readFileSync(filePath, { encoding: 'utf-8' }),
        )}`,
      );
    } else {
      next({ status: 404 });
    }
  });

  app.use('*', (request, response, next) => {
    next({
      status: 404,
      message: `No matching routes for ${request.method} ${request.originalUrl}. Do you mean ${
        request.method
      } ${getRouterPath(request.originalUrl)}?`,
    });
  });
};

export { authPath, authRouter } from './auth';
export { homePath, homeRouter } from './home';
