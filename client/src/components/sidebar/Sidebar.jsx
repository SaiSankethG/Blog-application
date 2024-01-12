import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(()=>{
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories")
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className='sidebarTitle'>ABOUT ME</span>
          <img src='https://about.me/s3/h/z/social.2ec36ec3.png'
          alt=''>
          </img>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe consequuntur laboriosam in nesciunt cum placeat ab. Aut, vitae perspiciatis. Aut, illo quia! Magni deleniti, ducimus fugiat dolore atque provident. 
          </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=>(
            <Link to={`/?cat=${c.name}`} className='link'>
              <li className='sidebarListItem'>{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='sidebarItem'>
        <div className="sidebarTitle">FOLLOW US</div>
          <div className='sidebarSocial'>
            <i className="sidebarIcon fa-brands fa-facebook"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
            <i className="sidebarIcon fa-brands fa-x-twitter"></i>
            <i className="sidebarIcon fa-brands fa-linkedin"></i>
            </div>
      </div>
    </div>
  )
}
