import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import mainRoute from './routes'
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
  }
}>()
app.use('/*', cors({
  origin: '*', // or your frontend domain
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type','authorization'], // if using custom headers, add them here too
}))
app.get('/', (c) => {
  
  return c.text('u came to right spot now get pegged')
})

app.route('/api/v1',mainRoute)


export default app
