import { useContext, useState } from 'react'
import './write.css'
import {Context} from "../../context/Context"
import axios from 'axios'

export default function Write() {
  const [title , setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState("")
  const {user} = useContext(Context)

  const handlePublish = async (e) =>{
    e.preventDefault()
    const newPost = {
        username: user.username,
        title,
        desc
    }
    if(file){
        const data = new FormData();
        const filename = Date.now() + file.name
        data.append("name", filename)
        data.append("file" , file)
        newPost.photo = filename
        try{
            await axios.post("/upload" , data)
        }catch(err){
            console.log(err)
        }
    }
    try{
        const res = await axios.post("http://localhost:5000/api/posts", newPost)
        window.location.replace("/post/" + res.data._id)
    }catch(err){
        
    }
  }
  return (
    <div className='write'>
        {file  && (
        <img
            className='writeImg'
            src={URL.createObjectURL(file)}
            alt=''
        ></img>
        )}
        <form className="writeForm" onSubmit={handlePublish}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i class="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id='fileInput' style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                <input className='writeInput' type='text' placeholder='Title' autoFocus={true} onChange={(e)=> setTitle(e.target.value)}></input>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your Story....' type="text" className='writeInput writeText' onChange={(e)=> setDesc(e.target.value)}></textarea>
            </div>
            <button className='writeSubmit' type='submit'>Publish</button>
        </form>
    </div>
  )
}
