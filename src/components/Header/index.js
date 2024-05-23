import './index.css'
import { IoIosSearch } from "react-icons/io";
import image from "../image/k.jpg"
function Header() {
  return (
   <>
    <div className='mainHeadBackground'>
        <div className='mainHead'>
        <div className='headerItems'>
            <img src='https://res.cloudinary.com/dceanjhp6/image/upload/f_auto,q_auto/im7fouox4t2rpwopswma' alt='movie'/>
            <p className='HPara'>Home</p>
            <p className='HPara'>Popular</p>
        </div>
        <div className='headerItems'>
        <IoIosSearch className='HSearch' />
        <img src={image} alt='profile' className='profile'/>
        </div>
    </div>
    </div>
    <div>
        <h1 className='H1'>Welcome to Movie World</h1>
    </div>
   </>
   
    
  )
}

export default Header