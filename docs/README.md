# boilerplate-express

<script src="https://cdn.tailwindcss.com"></script>

**尚未完善，不要在生产环境中使用。**

## 简介

`boilerplate-express` 是一个面向中国用户的简单 `express` 模板，目标是帮助你快速开发中小型项目后端。当然，也希望能引导你更进一步地了解 `node` 后端生态。

如果想要快速开发大型项目后端，请考虑使用 [boilerplate-nest](https://github.com/MillCloud/boilerplate-nest)。

### 主要依赖

- [node](https://nodejs.org/en/)
- [express](https://expressjs.com/)
- [typescript](https://www.typescriptlang.org/zh/)
- [mongoose](https://mongoosejs.com/)
- [statuses](https://github.com/jshttp/statuses)
- [@modyqyw/utils](https://github.com/modyqyw/utils)
- [dayjs](https://dayjs.gitee.io/zh-CN/)
- [@modyqyw/fabric](https://github.com/ModyQyW/fabric)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- [esno](https://github.com/antfu/esno)

请先阅读上面的文档，并确保对 `node` 和 `npm` 有 [基本了解](http://nodejs.cn/learn)。

## 起步

这部分说明将让你得到能在本地运行的项目副本以开始开发。有关如何部署项目，请阅读 [部署部分](#部署)。

### 准备

你可能需要使用梯子或手机 WiFi 完成准备步骤。

对于 macOS 用户，请按照以下指引操作。

```sh
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# 设置镜像，加快下载速度
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
# 安装 node@lts
nvm install --lts
# 使用 node@lts
nvm use --lts
# 设置默认版本
nvm alias default node
# 安装 pnpm
npm i -g pnpm --registry=https://registry.npmmirror.com
# 安装 homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 安装 git
brew install git
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 安装 Xcode 命令行工具
xcode-select --install
# tap
brew tap mongodb/brew
# 安装 mongodb-community
brew install mongodb-community
# 启动服务
brew services start mongodb-community
# 重启服务
brew services restart mongodb-community

```

设置 `~/.huskyrc`。

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

```

对于 Windows 用户，请按照以下指引操作。

首先安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.8/nvm-setup.zip) 和 [Git](https://git-scm.com/downloads)。

然后使用 Windows Terminal 作为终端，Git Bash 作为 Shell，参考 [让 Win10 的终端更好用](https://sspai.com/post/63814) 和 [配置 Windows Terminal](https://sspai.com/post/62167)。

如果你正在使用 [Chocolatey](https://chocolatey.org/) 或 [Scoop](https://scoop.sh/)，你也可以通过命令安装，然后配置。

```sh
# 使用 Chocolatey
choco install nvm
choco install git
choco install mongodb

# 使用 Scoop
scoop install nvm
scoop install git
scoop install mongodb

# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 设置镜像，加快下载速度
nvm node_mirror https://npmmirror.com/mirrors/node
nvm npm_mirror https://npmmirror.com/mirrors/npm
# 安装 node@lts
nvm install lts
# 使用 node@lts
nvm use lts
# 安装 pnpm
npm i -g pnpm --registry=https://registry.npmmirror.com

```

你可能需要配置 `~/.huskyrc`。

其它系统请根据以上指引自行调整。

### 安装与运行

```sh
# clone 项目到本地
git clone git@github.com:MillCloud/boilerplate-express.git
# git clone git@gitee.com:MillCloud/boilerplate-express.git
# 进入项目
cd boilerplate-express
# 安装依赖
pnpm install
# 启动项目
pnpm run dev

```

## 使用

### 目录结构

```sh
.
├── .github                     # github 配置目录
├── .husky                      # husky 配置目录
├── logs                        # 日志目录，生产环境出现
├── src
│   ├── constants               # 固定数据目录
│   ├── controllers             # 控制器目录
│   ├── middlewares             # 中间件目录
│   ├── models                  # mongoose model 目录
│   ├── routes                  # 路由目录
│   ├── schedules               # 定时任务目录
│   ├── typings                 # 类型目录
│   ├── utils                   # 工具方法目录
│   ├── app.ts                  # express 实例
│   ├── db.ts                   # mongoose 连接
│   ├── env.ts                  # dotenv 读取
│   ├── index.ts                # 入口
│   ├── localhost-key.pem       # 创建 HTTPS 服务器所需
│   ├── localhost.pem           # 创建 HTTPS 服务器所需
│   └── server.ts               # 服务器实例
│   ├── static                  # 静态文件目录
├── .commitlintrc.cjs           # commitlint 配置文件
├── .editorconfig
├── .eslintrc.cjs               # eslint 配置文件
├── .gitattributes              # git 配置文件
├── .gitignore                  # git 配置文件
├── .lintstagedrc.cjs           # lint-staged 配置文件
├── .markdownlint.json          # markdownlint 配置文件
├── .npmrc                      # npm 配置文件
├── .prettierrc.cjs             # prettier 配置文件
├── .release-it.cjs             # release-it 配置文件
├── package.json
├── pnpm-lock.yaml
├── README.md
├── renovate.json               # renovate 配置文件
└── tsconfig.json               # typescript 配置文件
```

可参考 [egg.js 目录结构](https://eggjs.org/zh-cn/basics/structure.html) 自行调整。

### VSCode 支持

你可以参考 [插件](https://modyqyw.top/environment/#%E6%8F%92%E4%BB%B6) 和 [settings.json](https://modyqyw.top/environment/#settings-json)。

### 模式和环境变量

使用 [cross-env](https://github.com/kentcdodds/cross-env) 在命令行内处理模式和环境变量。

使用 [dotenv](https://github.com/motdotla/dotenv) 和 [dotenv-expand](https://github.com/motdotla/dotenv-expand) 在应用内处理模式和环境变量。

支持根目录下存在多个 `.env` 文件，优先级由低到高和相关说明如下。

- `.env` - 通用环境变量
- `.env.${process.env.NODE_ENV}` - `${process.env.NODE_ENV}` 专属环境变量
- `.env.local` - 本地通用环境变量
- `.env.${process.env.NODE_ENV}.local` - 本地 `${process.env.NODE_ENV}` 专属环境变量

下面是一个 `.env` 内容示例。

```sh
APP_HOST=127.0.0.1
APP_PORT=3000
APP_API_ROUTER_PREFIX=/api

APP_DB_HOST=127.0.0.1
APP_DB_PORT=27017
APP_DB_NAME=app

APP_JWT_SECRET=secret
APP_JWT_EXPIRES_IN=604800000

```

### 数据库

使用 [mongodb](https://www.mongodb.com/) 作为数据库，使用 [mongoose](https://mongoosejs.com/) 作为 ODM。数据库初始化见 [db.ts](./src/db.ts)。

如果不喜欢 mongoose，也可以自行配置 [typegoose](https://typegoose.github.io/typegoose/) 或 [prisma](https://www.prisma.io/) 使用。

如果不喜欢 mongodb，也可以自行配置 [mysql](https://www.mysql.com/)、[postgresql](https://www.postgresql.org/) 使用。相应地，ORM 可以使用 [typeorm](https://typeorm.io/)、[prisma](https://www.prisma.io/) 或 [sequelize](https://sequelize.org/)。

### 固定数据

[固定数据](./src/constants/index.ts) 内的变量符合以下规则。

1. 由模式和环境变量推导出来的变量，比如 `NODE_ENV`、`IS_PRODUCTION`、`APP_MODE` 等。
2. 与业务解耦，比如 `ISO8601_FORMAT`、`DATE_FORMAT`、`DATE_TIME_FORMAT` 等。

### 中间件

项目内已经包含了较常用的社区中间件。

- [compression](./src/middlewares/compression.ts) - 基于 [compression](https://github.com/expressjs/compression) 的压缩中间件
- [cors](./src/middlewares/cors.ts) - 基于 [cors](https://github.com/expressjs/cors) 的 `CORS` 中间件
- [formidable](./src/middlewares/formidable.ts) - 基于 [formidable](https://github.com/node-formidable/formidable) 的 `form-data` 解析中间件
- [helmet](./src/middlewares/helmet.ts) - 基于 [helmet](https://github.com/helmetjs/helmet) 的 HTTP 头部中间件
- [logger](./src/middlewares/logger.ts) - 基于 [winston](https://github.com/winstonjs/winston) 的日志中间件
- [parser](./src/middlewares/parser.ts) - 基于 [body-parser](https://github.com/expressjs/body-parser) 的 `body` 解析中间件
- [rate-limit](./src/middlewares/rate-limit.ts) - 基于 [express-rate-limit](https://github.com/nfriedly/express-rate-limit) 的频率限制中间件
- [static](./src/middlewares/static.ts) - 基于 [serve-static](https://github.com/expressjs/serve-static) 的静态文件中间件
- [tracer](./src/middlewares/tracer.ts) - 基于 [cls-rtracer](https://github.com/puzpuzpuz/cls-rtracer) 的请求 ID 中间件
- [validator](./src/middlewares/validator.ts) - 基于 [express-validator](https://express-validator.github.io/) 的请求校验中间件

也包含了可能需要使用的中间件，可以根据需求调整。

- [auth](./src/middlewares/auth.ts) - 处理认证 `authentication` 和授权 `authorization` 的中间件 [Authentication vs. Authorization](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization)
- [error](./src/middlewares/error.ts) - 处理错误的中间件

和中间件相关的变量往往也会在中间件文件内导出。如果符合固定数据规则，则在固定数据内导出，比如 `APP_LOGGER_LEVEL`。

所有中间件的处理见 [app.ts](./src/app.ts)。

### 路由

从请求到响应的全流程来说，应该是先匹配成功路由，然后通过一系列中间件的校验，最后交给控制器的方法处理请求。

但在实际开发中，如果过度分离了路由和控制器的代码，往往需要开发者在不同文件间来回横跳，同时也不利于测试，开发者体验较差。

因此，项目的路由直接根据控制器信息生成，内置有两个路由 [@/src/routes/auth.ts](./src/routes/auth.ts) 和 [@/src/routes/home.ts](./src/routes/home.ts)。

项目也配置了 404 处理，见 [@/routes/index.ts](./src/routes/index.ts)。

### 控制器

控制器只是一个遵循 [约定格式](./src/typings/index.d.ts#L7-12) 的对象。

项目内置了两个控制器 [authController](./src/controllers/auth.ts) 和 [homeController](./src/controllers/home.ts)，分别对应内置的两个路由。

### 定时任务

定时任务基于 [agenda](https://github.com/agenda/agenda)，需要和 `mongodb` 匹配使用。

如果你想要更换数据库，不妨看看其它一些相关库，比如 [bullmq](https://docs.bullmq.io/)、[bull](https://github.com/OptimalBits/bull)、[bree](https://jobscheduler.net/)。

当前有一个每分钟运行的定时任务，见 [@/schedules/index.ts](./src/schedules/index.ts)。

### 请求

[请求](./src/utils/request.ts) 基于 [axios](https://axios-http.com/)，添加了超时和重试设置。

## 文档

当前设计很难基于 [swagger](https://swagger.io/) 做文档自动生成，建议手写 markdown 文件作为文档。

### 测试

测试基于 [jest](https://jestjs.io/) 和 [supertest](https://github.com/visionmedia/supertest)。

项目内置了已有的路由和控制器的测试，可以在 `__tests__` 文件夹内查看。

### 部署

项目使用 [release-it](https://github.com/release-it/release-it) 更新版本号并完成后续部署工作。

WIP

- [release-it](https://github.com/release-it/release-it)
- [nginx](https://www.nginx.com/)
- [pm2](https://pm2.keymetrics.io/)
- [docker](https://www.docker.com/)
