import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm(){
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            const data = response.data;

            if (data.token) {
                login({
                  token: data.token,
                  roles: data.roles || [],
                  email: data.email,
                  userId: data.userId,
                });
              } else {
                setError("Neteisingi prisijungimo duomenys");
              }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
              } else {
                setError("Įvyko klaida bandant prisijungti");
              }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-2 gap-[8px]"
        >
            <h2>Prisijungti</h2>
            <div className="flex items-center gap-[20px]">
                <label htmlFor="email">El. paštas: </label>
                <input
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="El. pašto adresas"
                    className="px-3 py-2 border rounded w-[20rem]"
                    required 
                />
            </div>
            <div className="flex items-center gap-[4px]">
                <label htmlFor="password">Slaptažodis: </label>
                <input 
                    id="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Slaptažodis"
                    className="px-3 py-2 border rounded w-[20rem]"
                    required
                />
            </div>

            <section className="flex gap-[6px] justify-center items-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 transition text-white py-2 px-4 rounded"
                    > Prisijungti
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="bg-orange-500 hover:bg-orange-600 transition text-white rounded py-2 px-4"
                    > Registruotis
                </button>
            </section>

            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
    );
}