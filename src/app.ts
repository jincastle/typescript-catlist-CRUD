import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  //라우터에 대한 미들웨어
  private setRouter() {
    this.app.use(catsRouter);
  }

  //set 미들웨어안에 라우터 미들웨어 적용
  private setMiddleware() {
    //logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next();
    });

    // json middleware, express에서 제공하는 라이브러리 이용
    this.app.use(express.json());

    // 고양이 라우터 불러서 사용
    this.setRouter;

    //404 middleware
    this.app.use((req, res, next) => {
      console.log({ error: "404 error" });
    });
  }
  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log("서버 열렸다");
    });
  }
}

function init() {
  const sever = new Server();
  sever.listen();
}
init();
