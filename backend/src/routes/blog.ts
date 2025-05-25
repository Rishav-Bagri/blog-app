import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"

import { verify } from "hono/jwt"
import { createBlogInput, updateBlogInput } from "week-13-common-medium"



const blogRoute = new Hono<{
    Bindings:{
        DATABASE_URL:string
    },
    Variables:{
        userId:String
    }
}>()

blogRoute.use("/*",async (c,next)=>{
    console.log("inisde auth");
    const header = c.req.header("authorization")||""

    const token= header.split(" ")[1]

    const response =await verify(token,"secret") as {id?:string}
    if(!response.id || !header.startsWith("Bearer ")){
        c.status(403)
        return c.json({
            error:"unauthorised"
        })
    }
    c.set("userId",response.id) 
    await next()
})

blogRoute.post("/",async(c)=>{
    console.log("hi");
    
    const body=await c.req.json()
    const {success}=createBlogInput.safeParse(body)
        if(!success){
            c.status(411)
            return c.json({
                message:"inputs are incorrect"
            })
        }
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    
    const userId=c.get("userId") as string

    const blog =await prisma.post.create({
        data:{
            title : body.title,
            content:body.content,
            published:true,
            authorId:userId
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRoute.get("/bulk",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          createdAt: true,
          author: {
            select: {
              name: true,  
            },
          },
        },
    });
    
    return c.json({
        blog:blog
    })
})
blogRoute.get("/:id",async(c)=>{
    const id=c.req.param("id")
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const blog =await prisma.post.findUnique({
            where:{
                id:id
            }
        })
        const user =await prisma.user.findUnique({
            where:{
                id:blog?.authorId
            }
        })
    
        return c.json({
            id,
            title:blog?.title,
            content:blog?.content,
            authorName:user?.name,
            createdAt:blog?.createdAt,
            published:blog?.published,
            authorId:blog?.authorId
        })

    }catch(e){
        c.status(411)
        return c.json({
            error:"error while fetching blog post"
        })
    }
    
})


blogRoute.put("/",async(c)=>{
    const body=await c.req.json()
    const {success}=updateBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"inputs are incorrect"
        })
    }
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    

    const blog =await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title : body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    })

})



export default blogRoute