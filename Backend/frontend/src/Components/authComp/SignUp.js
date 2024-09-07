import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [fullname, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate()

    const handleInput = (e) => {
        e.preventDefault()
        const value = e.target.value
        const id = e.target.id
        console.log(value, id);
        if (id === "fullname") {
            setFullName(value)
        } else if (id === "email") {
            setEmail(value)
        } else {
            setPassword(value)
        }

    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            email,
            fullname,
            password
        }
        try {
            const res = await axios.post("/api/user/signup", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                alert("Sign up successful");
                navigate("/login")
            }
        } catch (error) {
            alert(`${error.message}`)
            console.log(`error in signup component submitHander function ${error}`);
        }

    }

    return (
        <div className=" flex items-center justify-evenly  min-h-screen bg-conic-gradient ">

            <div className="bg-[#a2075d] p-24 rounded-xl">
                <h1 className="text-white font-bold text-2xl flex justify-center mb-[2rem]">Sign Up</h1>
                <form onSubmit={submitHandler}>
                    <div >
                        <label htmlFor="fullname" className="block text-white pb-2 pt-2">Full Name</label>
                        <input onChange={handleInput} type="text" id="fullname" placeholder="enter your FullName" className="rounded-md p-1  w-[15rem]" />
                    </div>
                    <div >
                        <label htmlFor="email" className="block text-white pb-2 pt-2">Email</label>
                        <input onChange={handleInput} type="text" id="email" placeholder="enter your Email" className="rounded-md p-1  w-[15rem]" />
                    </div>
                    <div >
                        <label htmlFor="password" className="block text-white pb-2 pt-2">Password</label>
                        <input onChange={handleInput} type="text" id="password" placeholder="enter your Email" className="rounded-md p-1  w-[15rem]" />
                    </div>
                    <button type="submit" className="bg-blue-800 text-white font-bold pr-2 pl-2 pb-1 pt-1 w-[5rem] mt-5 ">subnit</button>
                </form>
                <div>
                    <span className="text-yellow-300">Already have an account <span className="text-blue-300 font-bold underline cursor-pointer " onClick={() => navigate("/login")}>Click here</span></span>
                </div>
            </div>
            <div className="max-w-[30rem] rounded-bl-lg">
                <img src="/login.gif" alt="" className="rounded-bl-[8rem] rounded-tr-[8rem]" />
            </div>

        </div>
    )
}


export default SignUp

