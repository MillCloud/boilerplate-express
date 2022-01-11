# boilerplate-express

It is under development. Should not use in production environment.

开发中。不要在生产环境中使用。

现在指定 `nodemon` 使用 `esno` 内的 `esmo` 执行 `ts` 文件。`esno` 和 `esmo` 底层使用了 `esbuild`，效率较高。

```json
{
  "nodemonConfig": {
    "execMap": {
      "ts": "esmo --experimental-specifier-resolution=node"
    }
  }
}
```
