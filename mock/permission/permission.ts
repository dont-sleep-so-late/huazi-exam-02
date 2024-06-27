import { Request, Response } from 'express';

export default {
  // 这是一个Express中间件函数，用来处理GET请求
  'POST /user/login': (req: Request, res: Response) => {
    res.send({
      code: 200,
      msg: '登录成功',
      data: {
        token: 'token123',
      },
    });
  },
};
