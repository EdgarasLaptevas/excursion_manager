import { useEffect, useState } from "react";

export default function ExcursionList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [excursions, setExcursions] = useState([]);
  const [groupedByCategory, setGroupedByCategory] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/excursions`)
      .then((res) => res.json())
      .then((data) => {
        setExcursions(data);
        groupByCategory(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Failed to fetch excursions:", err);
      });
  }, []);

  const groupByCategory = (items) => {
    const grouped = items.reduce((acc, excursion) => {
      const categoryName = excursion?.categoryName || "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(excursion);
      return acc;
    }, {});

    const sorted = Object.keys(grouped)
      .sort()
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

    setGroupedByCategory(sorted);
  };

  return (
    <div>
      <h1>Excursions</h1>
      {Object.entries(groupedByCategory).map(([categoryName, excursions]) => (
        <div key={categoryName} style={{ marginBottom: "1.5rem" }}>
          <h2>{categoryName}</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {excursions.map((exc) => (
              <div
                key={exc.id}
                style={{
                  gap: "0.5rem",
                  backgroundColor: "rgba(30, 30, 30, 0.1)",
                  padding: "1rem",
                  marginBottom: "1rem",
                  marginRight: "0.5rem",
                  marginLeft: "1rem",
                  flex: "1 1 300px",
                  boxSizing: "border-box",
                  borderRadius: "8px",
                  minWidth: "380px",
                  maxWidth: "450px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <strong>Title: </strong>
                  {exc.title}
                </div>
                <div>
                  <img
                    src={exc.photo_url}
                    alt={exc.title}
                    onError={(e) => {
                        e.target.onError =null;
                        e.target.src = "/default-excursion.avif"
                    }}
                  />
                </div>
                <div>
                  <strong>Duration: </strong>
                  {exc.duration}
                </div>
                <div>
                  <strong>Price: </strong>
                  {exc.price}
                </div>
                <div>
                  <strong>Dates: </strong>
                  {exc.datesList && exc.datesList.length > 0 ? (
                    <ul>
                      {exc.datesList?.map((dateObj, index) => (
                        <li key={index}>
                          {new Date(dateObj.excursionTime).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No dates available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
