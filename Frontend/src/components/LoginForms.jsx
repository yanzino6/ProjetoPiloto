import styles from "../styles/Login.module.css"
import { FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api";
const LoginForms = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      
      alert("Login realizado com sucesso!");
      navigate("/tasks");
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
      
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.title} ><h1>Welcome! Access your to-do list!</h1></div>
      <form onSubmit={handleLogin} className={styles.form}>

        <div>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.formField} type="email" placeholder='Insert your email' />
          <FaUser className={styles.icon} />
        </div>
        <div >
          <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.formField} type="password" placeholder='Insert your password' />
          <FaLock className={styles.icon} />
        </div>

        <div className={styles.links}>

          <a className={styles.link} href="/signup">Create an account</a>
        </div>
        <div>
          <button type="submit" className={styles.submit} >Enter</button>
        </div>

      </form>
    </div>
  )
}

export default LoginForms

