import styles from "../styles/Login.module.css"
import { FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import React from 'react'

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {

        navigate('/login')
    }

    return (
        <div className={styles.login}>
            <div className={styles.title} ><h1>Create an account!</h1></div>
            <form onSubmit={handleSubmit} className={styles.form}>

                <div>
                    <input onChange={(e) => setUsername(e.target.value)} className={styles.formField} type="email" placeholder='Insert your email' />
                    <FaUser className={styles.icon} />
                </div>
                <div >
                    <input onChange={(e) => setPassword(e.target.value)} className={styles.formField} type="password" placeholder='Insert your password' />
                    <FaLock className={styles.icon} />
                </div>

                <div >
                    <input onChange={(e) => setRepeatPassword(e.target.value)} className={styles.formField} type="repeatPassword" placeholder='Repeat your password' />
                    <FaLock className={styles.icon} />
                </div>

                <div>
                    <button onClick={navigate} className={styles.submit} >Create</button>
                </div>

            </form>
        </div>
    )
}

export default SignUpForm