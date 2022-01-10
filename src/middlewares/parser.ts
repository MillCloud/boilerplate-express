import parser from 'body-parser';
import { type NextHandleFunction } from 'connect';

export const jsonParserMiddleware: NextHandleFunction = parser.json();
export const rawParserMiddleware: NextHandleFunction = parser.raw();
export const textParserMiddleware: NextHandleFunction = parser.text();
export const urlencodedParserMiddleware: NextHandleFunction = parser.urlencoded({
  extended: false,
});
