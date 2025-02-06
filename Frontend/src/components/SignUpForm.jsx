import styles from "../styles/Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Importando a API para comunicação com o backend

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reseta os erros
        setLoading(true);

        if (password !== repeatPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/users/signup", { email, password });
            console.log("✅ Conta criada com sucesso:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("❌ Erro ao criar conta:", error);
            setError(error.response?.data?.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.title}>
                <h1>Create an account!</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.formField}
                        type="email"
                        placeholder="Insert your email"
                        required
                    />
                    <FaUser className={styles.icon} />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formField}
                        type="password"
                        placeholder="Insert your password"
                        required
                    />
                    <FaLock className={styles.icon} />
                </div>
                <div>
                    <input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className={styles.formField}
                        type="password"
                        placeholder="Repeat your password"
                        required
                    />
                    <FaLock className={styles.icon} />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div>
                    <button type="submit" className={styles.submit} disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;