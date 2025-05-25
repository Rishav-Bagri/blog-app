import { Hono } from 'hono'
import signupRoute from './signup'
import signinRoute from './signin'
import blogRoute from './blog'

const mainRoute = new Hono()


mainRoute.route('/signup',signupRoute)
mainRoute.route('/signin',signinRoute)
mainRoute.route('/blog',blogRoute)



export default mainRoute
