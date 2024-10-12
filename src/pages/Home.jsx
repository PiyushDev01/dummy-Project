import React, {useContext, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { MyContext } from '../context/UserContex'
import { OrderContext } from '../context/orderContext';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../firebase/crudfun.js/writeData';


function Home() {
    const { user, setisUser } = useContext(MyContext);
    const { OrderDetails } = useContext(OrderContext);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user) {
                const adminStatus = await checkAdmin(user);
                setIsAdmin(adminStatus);
            }
        }

        checkAdminStatus();
    }, [user]);
    const logout = async () => {
        try {
            await auth.signOut();
            setisUser(false);
            
        } catch (error) {
            console.error('Error during sign-out:', error)
        }
    }


  return (
    <>
    <h1>Home</h1>
    <center>
        <img src={user.photoURL} className=' rounded-full' alt="" />
    <p>{user.displayName}</p>
    
    </center>
    <button onClick={() => navigate('/order')}  className=' m-1 py-1 rounded-full '>
        order
    </button>
   
    {
        isAdmin ? (
            <button onClick={() => navigate('/admin')}  className=' m-1 py-1 rounded-full '>
                Admin
            </button>
        ) : null
    }
    
    <br />
    <button onClick={logout}>logout</button>
   
    </>
  )
}

export default Home