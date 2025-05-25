
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput } from "week-13-common-medium";


const signupRoute = new Hono<{
    Bindings:{
      DATABASE_URL: string,
    }
}>()

signupRoute.post("/",async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    console.log(body);
    
    const {success}=signupInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"inputs are incorrect"
        })
    }
    const user=await prisma.user.create({
        data:{
            email : body.email,
            password : body.password,
            name : body?.name
        },
    })
    
    const token=await sign({id:user.id},"secret")

    return c.json({
        jwt:token,
    })
})

export default signupRoute