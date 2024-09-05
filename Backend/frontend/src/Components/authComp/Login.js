import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"



const Login = () => {
    const [fullname, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [authUser, setAuthUser] = useAuth()
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
            password
        }
        try {
            const res = await axios.post("http://localhost:4000/user/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.status === 200) {
                const userData = res.data.user;
                localStorage.setItem('user', JSON.stringify(userData));
                setAuthUser(userData);
                alert("Log in successful");
                navigate('/home');
            }
        } catch (error) {
            console.log(`error in login component submitHander function ${error}`);
            alert("something went wrong");

        }

    }

    return (
        <div className=" flex items-center justify-evenly  min-h-screen bg-conic-gradient ">

            <div className="bg-[#a2075d] p-24 rounded-xl">
                <h1 className="text-white font-bold text-2xl flex justify-center mb-[2rem]">Login</h1>
                <form onSubmit={submitHandler}>
                    <div >
                        <label htmlFor="email" className="block text-white pb-2 pt-2">Email</label>
                        <input onChange={handleInput} type="text" id="email" placeholder="enter your Email" className="rounded-md p-1  w-[15rem]" />
                    </div>
                    <div >
                        <label htmlFor="password" className="block text-white pb-2 pt-2">Password</label>
                        <input onChange={handleInput} type="text" id="password" placeholder="enter your Email" className="rounded-md p-1  w-[15rem]" />
                    </div>
                    <button type="submit" className="bg-blue-800 text-white font-bold pr-2 pl-2 pb-1 pt-1 w-[5rem] mt-5 ">submit</button>
                </form>
                <div>
                    <span className="text-yellow-300">Create an Account <span className="text-blue-300 font-bold underline cursor-pointer " onClick={()=>navigate("/signup")}>Click here</span></span>
                </div>
            </div>
            <div className="max-w-[30rem] rounded-bl-lg">
                <img src="/login.gif" alt="" className="rounded-bl-[8rem] rounded-tr-[8rem]" />
            </div>

        </div>
    )
}


export default Login

