import React from 'react'
import styles from "../styles/Login.module.css"
import {FaUser, FaLock} from 'react-icons/fa'
import { useState } from 'react'

const LoginForms = () => {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  
  const handleSubmit = (event)=>{
    event.preventDefault();

  }

  return (
    <div className={styles.login}>
        <div className={styles.title} ><h1>Welcome! Access your to-do list!</h1></div> 
        <form onSubmit={handleSubmit} className={styles.form}>
           
           <div> 
            <input onChange={(e)=> setUsername(e.target.value)} className={styles.formField} type= "email" placeholder='Insert your email'/>
            <FaUser className={styles.icon}/>
            </div>
           <div >
            <input onChange= {(e)=> setPassword(e.target.value)} className={styles.formField} type="password" placeholder='Insert your password' />
           <FaLock className={styles.icon}/>
           </div>
           <div className={styles.rememberMe}>
              <label>
                <input type="checkbox" />
                Remember me next time
              </label>
            </div>
            <div className={styles.links}>
             <a className={styles.link} href="#">Forgot my password</a>
             <a className={styles.link} href="#">Create an account</a>
            </div>
            <div>
              <button className={styles.submit} >Enter</button>
            </div>
            
        </form>
    </div>
  )
}

export default LoginForms