import * as Koa from 'koa'
import Router from 'koa-router'
const note = new Router();
note.get('/noteList', (ctx:Koa.Context) => {
    ctx.body = '666';
})

export default note