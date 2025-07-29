import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function UserRegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmedPassword) {
      setError('Slaptažodžiai nesutampa');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      setSuccess('Registracija sėkminga!');
      setEmail('');
      setPassword('');
      setConfirmedPassword('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Įvyko serverio klaida');
      }
    }
  };

  return (
    <article className="flex flex-col items-center justify-center gap-[8px]">
      <h2 className="mt-2">Vartotojų registracija</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-[4px]"
      >
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
        <div className="flex items-center gap-[4px]">
          <label htmlFor="repeat-pass">Slaptažodis: </label>
          <input
            id="repeat-pass"
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="Patvirtinkite slaptažodį"
            className="w-[20rem] rounded border px-3 py-2"
            required
          />
        </div>
        <section className="mt-2 flex gap-[6px]">
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            {' '}
            Registruotis
          </button>
          <button
            onClick={() => navigate('/login')}
            className="rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
          >
            {' '}
            Grįžti prie prisijungimo
          </button>
        </section>
      </form>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      {success && <p className="mt-2 text-green-600">{success}</p>}
    </article>
  );
}
