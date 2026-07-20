import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx";
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx";
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx";
import { useEffect } from "react";
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/common/loading.jsx";
export const HRDashboardPage = () => {
  console.log("Reloaded");
  const DashboardState = useSelector((state) => state.dashboardreducer);
  const dispatch = useDispatch();
  const DataArray = [
    {
      image: "/../../src/assets/HR-Dashboard/employee-2.png",
      dataname: "employees",
      path: "/HR/dashboard/employees",
    },
    {
      image: "/../../src/assets/HR-Dashboard/department.png",
      dataname: "departments",
      path: "/HR/dashboard/departments",
    },
    {
      image: "/../../src/assets/HR-Dashboard/leave.png",
      dataname: "leaves",
      path: "/HR/dashboard/leaves",
    },
    {
      image: "/../../src/assets/HR-Dashboard/request.png",
      dataname: "requests",
      path: "/HR/dashboard/requests",
    },
  ];

  useEffect(() => {
    dispatch(HandleGetDashboard({ apiroute: "GETDATA" }));
  }, []);

  if (DashboardState.isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.35)] sm:p-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-700">
              At a glance
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              HR dashboard overview
            </h3>
          </div>
          <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Live
          </div>
        </div>
        <KeyDetailBoxContentWrapper
          imagedataarray={DataArray}
          data={DashboardState.data}
        />
      </section>
      <div className="grid min-[250px]:grid-cols-1 lg:grid-cols-2 min-[250px]:gap-3 xl:gap-4">
        <SalaryChart balancedata={DashboardState.data} />
        <DataTable noticedata={DashboardState.data} />
      </div>
    </div>
  );
};
