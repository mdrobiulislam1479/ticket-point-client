const SkeletonCard = () => {
  return (
    <div className="bg-base-200/50 rounded-4xl p-6 h-[280px] w-full animate-pulse flex flex-col justify-between border border-base-300">
      <div className="space-y-4">
        {/* Header line */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-base-300 rounded-lg"></div>
          <div className="h-8 w-8 bg-base-300 rounded-full"></div>
        </div>

        {/* Route lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-base-300 rounded"></div>
          <div className="h-4 w-3/4 bg-base-300 rounded"></div>
        </div>
      </div>

      {/* Footer / Price */}
      <div className="flex justify-between items-center mt-6">
        <div className="h-8 w-20 bg-base-300 rounded-xl"></div>
        <div className="h-10 w-28 bg-base-300 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
