import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";




const LoginPage=()=>{
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const{setUser}=useContext(UserContext);

    const loginHandler= async (ev)=>{
        ev.preventDefault();
        try {
            const userInfo=await axios.post('/login',{email,password})
            alert('login success')
            console.log(userInfo);
            setUser(userInfo.data);
            setIsLoggedIn(true);
        } catch (e) {
            alert('login faied')            
        }
    }

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h2 className="text-4xl text-center mb-4">Log In</h2>
            <form className="max-w-md mx-auto" onSubmit={loginHandler}>
                <input 
                type="email" 
                placeholder="name@gmail.com" 
                value={email} 
                onChange={ev=>setEmail(ev.target.value)}/>
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}/>
                <button className="primary">Log in</button>
                <div className="text-center text-gray-500 py-2">
                    Dont Have An Account Yet? <Link className="underline text-black" to={'/register'}>Register Now.</Link>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LoginPage;