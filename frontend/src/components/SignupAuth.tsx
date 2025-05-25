import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupInput } from "week-13-common-medium"
import { BACKEND_URL } from "../config"

export function Auth() {

    const [postInputs, setPostInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const onClickHandler=async()=>{
        const result=await fetch(`${BACKEND_URL}/signup`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(postInputs),
        })
        const json=await result.json()
        console.log(json);
        localStorage["token"]=json.jwt
        localStorage["userName"]=postInputs.name
        navigate("/blogs")
    }
    return <div className="h-screen flex  justify-center items-center">
        <div className="">
            <div className="font-bold text-4xl mx-10 my-2">
                Create an account
            </div>
            <div className="flex justify-center text-gray-600 mx-10 mb-8">
                <div>
                    Already have an account?
                </div>
                <div
                    className="underline pl-1 cursor-pointer"
                    onClick={() => {
                        navigate("/signin")
                    }}>
                    signin here
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-start text-lg font-bold">
                    Username
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInput({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} className="border-1 rounded-md my-1 border-gray-300 text-gray-900 font-normal placeholder:font-normal p px-3 py-1" placeholder="Enter your username"></input>
                </div>
                <div className="flex flex-col justify-start text-lg font-bold mt-3">
                    Email
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInput({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} className="border-1 rounded-md my-1 border-gray-300 text-gray-900 font-normal placeholder:font-normal p px-3 py-1" placeholder="hoho@email.xyz"></input>
                </div>
                <div className="flex flex-col justify-start text-lg font-bold mt-3">
                    Password
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInput({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} type="password" className="border-1 rounded-md my-1 border-gray-300 text-gray-900 font-normal placeholder:font-normal p px-3 py-1" placeholder="yoursecretpassword"></input>
                </div>
            </div>
            <div onClick={onClickHandler} className="mt-4 p-2 flex justify-center bg-black text-md text-white rounded-sm cursor-pointer hover:bg-[#333]">
                Sign up
            </div>

        </div>
    </div>
}