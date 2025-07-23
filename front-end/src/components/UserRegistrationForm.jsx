import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserRegistrationForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmedPassword) {
            setError("Slaptažodžiai nesutampa");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                email, 
                password
            });

            setSuccess("Registracija sėkminga!");
            setEmail("");
            setPassword("");
            setConfirmedPassword("");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Įvyko serverio klaida");
            }
        }
    };

    return (
        <article className="flex justify-center items-center flex-col gap-[8px]">
            <h2 className="mt-2">Vartotojų registracija</h2>

            <form 
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-[4px]"
            >
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
                <div className="flex items-center gap-[4px]">
                    <label htmlFor="repeat-pass">Slaptažodis: </label>
                    <input
                        id="repeat-pass" 
                        type="password" 
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        placeholder="Patvirtinkite slaptažodį"
                        className="px-3 py-2 border rounded w-[20rem]"
                        required
                    />
                </div>
                <section className="flex gap-[6px] mt-2">
                    <button 
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 transition text-white py-2 px-4 rounded"
                    > Registruotis
                    </button>
                    <button 
                      onClick={() => navigate("/login")}
                      className="bg-yellow-500 hover:bg-yellow-600 transition text-white rounded py-2 px-4"
                    > Grįžti prie prisijungimo
                    </button>
                </section>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </article>
    );
}