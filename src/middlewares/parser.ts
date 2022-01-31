import parser from 'body-parser';
import { RequestHandler } from 'express';

export const jsonParserMiddleware = parser.json() as RequestHandler;
export const rawParserMiddleware = parser.raw() as RequestHandler;
export const textParserMiddleware = parser.text() as RequestHandler;
export const urlencodedParserMiddleware = parser.urlencoded({
  extended: false,
}) as RequestHandler;
