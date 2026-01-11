import {
  IoAirplaneOutline,
  IoBoatOutline,
  IoBusOutline,
  IoSearchOutline,
  IoTrainOutline,
} from "react-icons/io5";

export const SidebarContent = ({
  handleReset,
  fromInput,
  setFromInput,
  toInput,
  setToInput,
  transport,
  setTransport,
  sort,
  setSort,
  setPage,
  handleSearch,
}) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between mb-2 lg:mb-6">
      <h3 className="text-xl font-black flex items-center gap-2">
        <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
        Filters
      </h3>
      <button
        onClick={handleReset}
        className="btn btn-ghost btn-xs text-error font-bold"
      >
        Reset
      </button>
    </div>

    {/* Route Search */}
    <section>
      <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-3 block">
        Route Details
      </label>
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="From"
            className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/30"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="To"
            className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/30"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
          />
        </div>
      </div>
    </section>

    {/* Transport Mode Chips */}
    <section>
      <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-3 block">
        Transport Mode
      </label>
      <div className="grid grid-cols-2 gap-2">
        {[
          { n: "Bus", i: <IoBusOutline /> },
          { n: "Train", i: <IoTrainOutline /> },
          { n: "Plane", i: <IoAirplaneOutline /> },
          { n: "Launch", i: <IoBoatOutline /> },
        ].map((item) => (
          <button
            key={item.n}
            onClick={() => {
              setTransport(transport === item.n ? "" : item.n), setPage(1);
            }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
              transport === item.n
                ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
                : "bg-base-200 border-transparent text-base-content/60 hover:border-base-300"
            }`}
          >
            {item.i} {item.n}
          </button>
        ))}
      </div>
    </section>

    {/* Pricing Sort */}
    <section>
      <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-3 block">
        Price Sorting
      </label>
      <select
        className="select select-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-secondary/30"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Default Order</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </section>

    <button
      onClick={handleSearch}
      className="btn btn-secondary w-full h-14 rounded-2xl text-white font-black shadow-lg shadow-secondary/20"
    >
      <IoSearchOutline size={20} /> Search Tickets
    </button>
  </div>
);
