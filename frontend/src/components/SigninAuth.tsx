import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupInput } from "week-13-common-medium"
import { BACKEND_URL } from "../config"

export function Auth() {

    const [postInputs, setPostInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const onClickHandler = async () => {
  const response = await fetch(`${BACKEND_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postInputs)
  });

  const data = await response.json();

  if (response.ok && data.jwt) {
    // Success case
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("userName", data.name);
    navigate("/blogs");
  } else {
    // Failed case - show error message from backend
    alert(data.message || "Invalid email or password"); 
  }
};
    return <div className="h-screen flex  justify-center items-center">
        <div className="">
            <div className="font-bold text-4xl mx-10 my-2">
                Sign in to an account
            </div>
            <div className="flex justify-center text-gray-600 mx-10 mb-8">
                <div>
                    Don't have an account?
                </div>
                <div
                    className="underline pl-1"
                    onClick={() => {
                        navigate("/signup")
                    }}>
                    signup here
                </div>
            </div>
            <div>
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
            <div onClick={onClickHandler} className="mt-4 p-1 flex justify-center bg-black text-lg text-white rounded-sm cursor-pointer hover:bg-[#333]">
                Sign in
            </div>

        </div>
    </div>
}