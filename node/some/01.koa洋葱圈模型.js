/* 
  了解koa中间件机制
 */

const sleep = n => new Promise(res => setTimeout(() => res(), n * 1000));

const mockEasyKoaMiddleWare = () => {
  const middlewares = [];
  const ctx = {};
  return {
    use(middleware) {
      middlewares.push(middleware);
    },
    compose() {
      let next = () => Prmose.Promise();
      const createNext = (middleware, next) => {
        return () => Promise.resolve(middleware(ctx, next));
      }
      for (let i = middlewares.length - 1; i >= 0; i--) {
        next = createNext(middlewares[i], next);
      }
      return () => next();
    },

  };
};

const test1 = mockEasyKoaMiddleWare();

test1.use(async (ctx, next) => {
  console.log('md1 start');
  await sleep(1);
  await next();
  console.log('md1 end');
});

test1.use(async (ctx, next) => {
  console.log('md2 start');
  await sleep(1);
  await next();
  console.log('md2 end');
});

test1.use(async (ctx, next) => {
  console.log('md3 start');
  await sleep(1);
  await next();
  console.log('md3 end');
});

test1.use(async (ctx, next) => {
  console.log('md4');
  ctx.body = null;
});

test1.compose()();