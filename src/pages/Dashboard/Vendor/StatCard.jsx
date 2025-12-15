const StatCard = ({ title, value }) => {
  return (
    <div className="bg-primary rounded-2xl shadow-md p-6 text-center border-t-4 border-secondary">
      <h4 className="text-2xl font-semibold text-accent mb-2">{title}</h4>
      <p className="text-3xl font-extrabold text-secondary">{value}</p>
    </div>
  );
};

export default StatCard;
