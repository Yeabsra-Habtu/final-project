import { useContext, useState,useEffect } from "react";
import { UserContext } from "../UserContext";
import {Navigate,Link,useParams}from'react-router-dom';
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavPage from "./AccountNavPage";

const ProfilePage=()=>{
    const [redirect,setRedirect]=useState(null);
    let {subpage}=useParams();
    const { user, ready,setUser } = useContext(UserContext);


    if (subpage == undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return <div>Loading...</div>
    }
    if (ready && !user) {
        return <Navigate to={'/login'} />
    }




    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    

    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <div>
            <AccountNavPage/>
           <div>
           {subpage==='profile'&&(
            <div className="text-center max-w-lg mx-auto ">
                Logged in as {user.name} ({user.email})<br/>
                <button onClick={logout} className="primary mx-w-sm mt-2" >Log Out</button>
            </div>
           )}
           </div>
           <div>
            {subpage==='places'&&(
                <PlacesPage/>
            )}
           </div>
           
        </div>
    )
}

export default ProfilePage;