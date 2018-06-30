import * as fs from 'fs';
import * as http from 'http';
import * as Mustache from 'mustache';
import * as process from 'process';
import * as writeFileAtomic from 'write-file-atomic';
import { DateTime } from 'luxon';

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

import { css, template } from 'server/assets';
import { isSpam } from 'server/batteries';
import * as dates from 'server/dates';

//////////////////////////////////////// Types

interface Feeling {
  time: DateTime;
  text: string;
  via: {
    tag: 'ViaPhone' | 'ViaWeb';
    contents?: string;
  };
}

//////////////////////////////////////// Database

const filename = 'feelings.txt';

const reviver = (key: string, value: any) => (key === 'time' ? dates.parse(value) : value);

const feelings: [Feeling] = JSON.parse(fs.readFileSync(filename, 'utf8'), reviver);

setInterval(() => {
  writeFileAtomic(filename, JSON.stringify(feelings), error => {
    if (error) {
      console.error(`writeFileAtomic had an error: ${error}`);
    }
  });
}, 1000);

//////////////////////////////////////// Values

const mapFeelings = ({ time, text, via }: Feeling) => ({
  friday: time.weekday === 5,
  phone: via.tag === 'ViaPhone',
  text,
});

Mustache.parse(template);

const app = new Koa();
const router = new Router();
router.use(bodyParser());

router.get('/css.css', ctx => {
  ctx.set('Cache-Control', 'public');
  ctx.type = 'text/css';
  ctx.body = css;
});

router.post('/sms', ctx => {
  const body = ctx.request.body;
  if (body && body.Body && body.From && body.To) {
    feelings.splice(0, 0, {
      time: DateTime.utc(),
      text: body.Body,
      via: { tag: 'ViaPhone', contents: body.From },
    });

    ctx.body = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Sms from="${body.To}" to="${body.From}">thank you my child</Sms>
</Response>`;
  } else {
    ctx.status = 400;
    ctx.body = 'missing parameters';
  }
});

router.post('/feeling', ctx => {
  const body = ctx.request.body;
  if (body && body.text && !isSpam(body.text)) {
    feelings.splice(0, 0, {
      time: DateTime.utc(),
      text: body.text,
      via: { tag: 'ViaWeb' },
    });
  }
  ctx.redirect('back');
});

router.get('/', ctx => {
  ctx.set('Cache-Control', 'no-cache');
  ctx.body = Mustache.render(template, {
    currentlyFriday: dates.isFriday(),
    feelings: feelings.map(mapFeelings),
  });
});

console.log(`running on port ${process.env.PORT}`);

export default app.use(router.routes()).listen(process.env.PORT);
