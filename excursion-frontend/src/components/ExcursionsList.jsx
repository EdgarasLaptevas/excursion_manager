import { useEffect, useState } from "react";
import ExcursionCard from "./ExcursionCard";
import axios from "axios";

const ExcursionList = () => {
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/excursions");

        console.log("API atsakymas:", response.data);

        const list = response.data?.data?.excursionResponseDTOList;
        if (Array.isArray(list)) {
          setExcursions(list);
        } else {
          setError("Serveris negrąžino ekskursijų sąrašo.");
        }
      } catch (err) {
        console.error("Klaida:", err);
        setError("Nepavyko gauti ekskursijų.");
      } finally {
        setLoading(false);
      }
    };

    fetchExcursions();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">🔄 Kraunama ekskursijos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (excursions.length === 0) {
    return <p className="text-center mt-10">📭 Ekskursijų nėra.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {excursions.map((excursion) => (
        <ExcursionCard key={excursion.excursionId} excursion={excursion} />
      ))}
    </div>
  );
};

export default ExcursionList;


