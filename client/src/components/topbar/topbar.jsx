import { Link } from 'react-router-dom'
import './topbar.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({type : "LOGOUT"})
    }
  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-facebook"></i>
            <i className="topIcon fa-brands fa-instagram"></i>
            <i className="topIcon fa-brands fa-x-twitter"></i>
            <i className="topIcon fa-brands fa-linkedin"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className='topListName'>
                    <Link to="/" className='link'>Home</Link>
                </li>
                <li className='topListName'>
                    <Link to="/" className='link'>About</Link>
                </li>
                <li className='topListName'>
                    <Link to="/" className='link'>Contact</Link>
                </li>
                <li className='topListName'>
                <Link to="/write" className='link'>Write</Link>
                </li>
                <li className='topListName' onClick={handleLogout}>
                    {user && "Logout"}
                </li>
            </ul>
        </div>
        <div className="topRight">
            {user?(
                <Link to="/settings">
                    <img className='topImg' src={user.profilePic} alt='profilepicture'></img>
                </Link>
            ):(
                <ul className="topList">
                    <li className="topListName">
                        <Link to="/login" className='link'>Login</Link>
                    </li>
                    <li className="topListName">
                        <Link to="/register" className='link'>Register</Link>
                    </li>
                </ul>
            )}
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}
