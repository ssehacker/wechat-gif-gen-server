/**
 * Created by ssehacker on 2017/1/28.
 */
import GIFEncoder from 'gifencoder';
import Canvas from 'canvas';
import fs from 'fs';
import path from 'path';


export default function () {
  var encoder = new GIFEncoder(200, 150);
// stream the results as they are available into myanimated.gif
  encoder.createReadStream().pipe(fs.createWriteStream(path.resolve('static/images/demo.gif')));

  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(10);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.

// use node-canvas
  var canvas = new Canvas(200, 150);
  var ctx = canvas.getContext('2d');

// red rectangle
  ctx.fillStyle = 'pink';
  ctx.font = '22px monospace';
  ctx.fillRect(0, 0, 200, 150);
  ctx.fillStyle = '#ff0000';
  ctx.fillText("祝大家新年快乐", 10, 80);
  encoder.addFrame(ctx);



  ctx.fillStyle = '#ff0066';
  ctx.fillText("祝大家新年快乐", 10, 80);
  encoder.addFrame(ctx);


  ctx.fillStyle = '#ff00bb';
  ctx.fillText("祝大家新年快乐", 10, 80);
  encoder.addFrame(ctx);

  encoder.finish();
};