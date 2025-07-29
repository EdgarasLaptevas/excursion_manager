import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
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
      const response = await axios.post(`${API_URL}/token`, {
        email,
        password,
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
      className="mt-2 flex flex-col items-center justify-center gap-[8px]"
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
          className="w-[20rem] rounded border px-3 py-2"
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
          className="w-[20rem] rounded border px-3 py-2"
          required
        />
      </div>

      <section className="flex items-center justify-center gap-[6px]">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          {" "}
          Prisijungti
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="rounded bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
        >
          {" "}
          Registruotis
        </button>
      </section>

      {error && <p className="mt-2 text-red-600">{error}</p>}
    </form>
  );
}
