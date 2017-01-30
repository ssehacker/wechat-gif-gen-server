import Koa from 'koa';
import path from 'path';
import log4js from 'log4js';
import server from 'koa-static';
import views from 'koa-views';
import router from '../app/router/router.js';


const app = new Koa();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/runtime.log'), 'runtime');
var logger = log4js.getLogger('runtime');



//异常处理, 必须放在所有中间件的最前面
app.use(async function(ctx, next){
	try{
		await next();
	}catch(err){
		ctx.status = err.status || 500;
		ctx.body = err.message;
		logger.error(err);
	}
});



app.use(views( path.resolve(__dirname , '../app/views') , {
	extension: 'jade',
	pretty: true, //not work?? why???
	map: {
		jade: 'jade'
	}
}));

console.log('-------',path.resolve('static'));
app.use(server(path.resolve('static')));

//koa v2
app.use(async function responseTime(ctx, next){
	var start = new Date();
	await next();
	var ms = new Date() -start;
	ctx.set('X-Response-Time', ms+'ms');
	logger.info('X-Response-Time: '+ ms+'ms');

});

app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(8040);



