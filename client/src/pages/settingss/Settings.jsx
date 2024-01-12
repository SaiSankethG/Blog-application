import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Settings() {
  const {user , dispatch} = useContext(Context)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)
  const PF = "http;//localhost:5000/images/"

  const handleSubmit = async (e) =>{
    e.preventDefault()
    dispatch({type: 'UDPATE_START'})
    const updateUser = {
        userId: user._id,
        username,  
        email,
        password
    }
    if(file){
        const data = new FormData();
        const filename = Date.now() + file.name
        data.append("name", filename)
        data.append("file" , file)
        updateUser.profilePic = filename
        try{
            await axios.post("/upload" , data)
        }catch(err){
            console.log(err)
        }
    }
    try{
        const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updateUser)
        setSuccess(true)
        dispatch({type:"UPDATE_SUCCESS" , payload: res.data})
    }catch(err){
        dispatch({type:"UPDATE_FAILURE"})
    }
}

  return (
    <div className='settings'>
        <div className="settingsWraper">
            <div className="settingsTitle">
                <span className="settingsUpdateTittle">Update Your Account</span>
                <span className="settingsDeleteTittle">Delete Account</span>
            </div>
            <form className='settingsForm' onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img className='' src={file ? URL.createObjectURL(file):PF + user.profilePic } alt=''></img>
                </div>
                <label htmlFor='fileInput'>
                <i class="settingsPPIcon fa-solid fa-user"></i>
                </label>
                <input type='file' id='fileInput' style={{display:'none'}}></input>
                <label>Username</label>
                <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)}></input>
                <label>Email</label>
                <input type='email' placeholder={user.email} onChange={(e)=> setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className="settingsSubmit" type='submit'>Update</button>
                {success && <span style={{color:"green" , textAlign:"center" , marginTop:"20px"}}>Profile successfully updated!</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}
