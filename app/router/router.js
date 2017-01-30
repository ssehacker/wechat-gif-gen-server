'use strict';

import koaRouter from 'koa-router';
import log4js from 'log4js';
import imageGenner from '../utils/imageGenner';

var logger = log4js.getLogger('runtime');
const router = koaRouter();

router.get('/', async (ctx, next) =>{
	await ctx.render('index.jade');
});

router.get('/api/gen-images', async(ctx, next) => {
  // let body = this.request.body;
  // const type = body.type;

  // console.log(body);

  imageGenner();
  ctx.body = {
    path: '/images/demo.gif',
  };
});

export default router;