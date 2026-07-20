export const KeyDetailsBox = ({ image, dataname, data }) => {
  const accentBadgeClass = {
    employees: "bg-cyan-600",
    departments: "bg-violet-600",
    leaves: "bg-amber-600",
    requestes: "bg-emerald-600",
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_-18px_rgba(15,23,42,0.35)]`}
      >
        <div className="flex flex-col gap-2 pr-3">
          <div
            className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white ${accentBadgeClass[dataname] || "bg-slate-700"}`}
          >
            {dataname}
          </div>
          <div className="text-3xl font-bold text-slate-900 sm:text-2xl lg:text-3xl xl:text-4xl">
            {data}
          </div>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 shadow-inner">
          <img src={image} alt={dataname} className="max-w-[46px]" />
        </div>
      </div>
    </div>
  );
};
