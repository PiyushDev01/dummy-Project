import React, {useContext} from 'react'
import { auth } from '../firebase/firebase'
import { MyContext } from '../context/UserContex'
import { OrderContext } from '../context/orderContext';
import { useNavigate } from 'react-router-dom';


function Home() {
    const { user, setisUser } = useContext(MyContext);
    const { OrderDetails } = useContext(OrderContext);
    const navigate = useNavigate();
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
    <button onClick={() => navigate('/admin')}  className=' m-1 py-1 rounded-full '>
        admin
    </button>
    
    <br />
    <button onClick={logout}>logout</button>
   
    </>
  )
}

export default Home