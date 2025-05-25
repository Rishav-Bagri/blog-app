import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput } from "week-13-common-medium";


const signinRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    }
}>()

signinRoute.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: "inputs are incorrect"
        })
    }
    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        c.status(403)
        return c.json({
            msg: "user not found"
        })
    }
    console.log(user.name);
    
    const token = await sign({ id: user.id }, "secret")
    return c.json({
        jwt: token,
        name:user.name
    })
})

export default signinRoute