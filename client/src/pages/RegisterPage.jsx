import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const registerHandler= async (e)=>{
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
        } catch (e) {
            alert('Resgistration unsuccess')
            console.log(e);
        }
        
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h2 className="text-4xl text-center mb-4">Register</h2>
                <form className="max-w-md mx-auto" onSubmit={registerHandler}>
                    <input type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}} />
                    <input type="email" placeholder="name@gmail.com"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}} />
                    <input type="password" placeholder="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} />
                    <button className="primary">Register</button>
                    <div className="text-center text-gray-500 py-2">
                        Already A Member? <Link className="underline text-black" to={'/login'}>Login.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;