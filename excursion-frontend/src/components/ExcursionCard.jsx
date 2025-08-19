// src/components/ExcursionCard.jsx

const ExcursionCard = ({ excursion }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
      {excursion.photoUrl && (
        <img
          src={excursion.photoUrl}
          alt={excursion.excursionName}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-gray-800">{excursion.excursionName}</h3>
      <p className="text-gray-600 mt-2">{excursion.description}</p>
      <div className="mt-4 text-sm text-gray-700">
        <p>⏱ Trukmė: <span className="font-medium">{excursion.duration} val.</span></p>
        <p>💰 Kaina: <span className="font-medium">{excursion.price} €</span></p>
      </div>
    </div>
  );
};

export default ExcursionCard;
