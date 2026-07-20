import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js";
import { logoutHR } from "../../redux/Slices/HRSlice.js";

export const HRDashbaord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathArray = location.pathname.split("/");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (location.pathname === "/HR/dashboard") {
      navigate("/HR/dashboard/dashboard-data");
    }
  }, [location.pathname, navigate]);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await dispatch(
        HandlePostHumanResources({ apiroute: "LOGOUT", data: {} }),
      ).unwrap();
    } catch (error) {
      console.error("HR logout failed:", error);
    } finally {
      dispatch(logoutHR());
      navigate("/auth/HR/login", { replace: true });
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <div className="flex min-h-screen">
        <div className="HRDashboard-sidebar">
          <SidebarProvider>
            <HRdashboardSidebar />
            <div className="sidebar-container min-[250px]:absolute md:relative">
              <SidebarTrigger />
            </div>
          </SidebarProvider>
        </div>
        <div className="HRdashboard-container flex min-h-screen w-full flex-col px-3 py-3 md:px-5 md:py-5">
          <div className="mb-4 flex flex-wrap items-center justify-between rounded-[24px] border border-cyan-100 bg-white p-4 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
                HR workspace
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                People operations overview
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(2,132,199,0.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
          <div className="flex-1 rounded-[28px] border border-cyan-100 bg-white p-3 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)] md:p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
