import parser from 'body-parser';

export const jsonParserMiddleware = parser.json();
export const rawParserMiddleware = parser.raw();
export const textParserMiddleware = parser.text();
export const urlencodedParserMiddleware = parser.urlencoded({
  extended: false,
});
