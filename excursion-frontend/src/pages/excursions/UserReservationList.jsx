import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { api } from "@/utils/api";

export default function MyRegistrations() {
  const { account } = useAuth();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get(`/users/${account.id}/registrations`);
        setRegistrations(response.data);
      } catch (err) {
        console.error("Klaida gaunant registracijas:", err);
      }
    };

    fetchRegistrations();
  }, [account.id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mano registracijos</h1>
      {registrations.length === 0 ? (
        <p>Dar nesate užsiregistravęs į jokias ekskursijas.</p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg) => (
            <li key={reg.registrationId} className="border p-4 rounded shadow">
              <p><strong>Ekskursijos ID:</strong> {reg.excursionId}</p>
              <p><strong>Statusas:</strong> {reg.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
