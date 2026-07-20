import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HandlePostEmployees } from "../../redux/Thunks/EmployeeThunk.js";
import { logoutEmployee } from "../../redux/Slices/EmployeeSlice.js";
import { apiService } from "../../redux/apis/APIService";
import { NoticeEndPoints } from "../../redux/apis/APIsEndpoints";
import { getDemoEmployeeNotices, isDemoHRSession } from "../../utils/demoData";

export const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeState = useSelector((state) => state.employeereducer);
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const name =
    employeeState.data?.name || employeeState.data?.firstname || "Employee";

  useEffect(() => {
    const loadNotices = async () => {
      try {
        if (isDemoHRSession()) {
          setNotices(getDemoEmployeeNotices());
          return;
        }

        const response = await apiService.get(NoticeEndPoints.MY_NOTICES, {
          withCredentials: true,
        });
        setNotices(response.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingNotices(false);
      }
    };

    loadNotices();
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await dispatch(
        HandlePostEmployees({ apiroute: "LOGOUT", data: {} })
      ).unwrap();
    } catch (error) {
      console.error("Employee logout failed:", error);
    } finally {
      dispatch(logoutEmployee());
      navigate("/auth/employee/login", { replace: true });
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[30px] border border-cyan-100 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 p-8 text-white shadow-[0_20px_55px_-20px_rgba(2,132,199,0.45)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">
                Employee hub
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Welcome back, {name}!
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/90">
                Your HR notices and assignments now appear here as soon as they are issued.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm backdrop-blur-sm">
              <p className="font-semibold">Today at a glance</p>
              <p className="mt-1 text-cyan-50/90">
                {notices.length} notice{notices.length === 1 ? "" : "s"} waiting for you
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]">
            <div className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
              Your tasks
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {loadingNotices
                ? "Loading your latest assignments..."
                : notices.length > 0
                  ? `${notices.length} active update${notices.length === 1 ? "" : "s"} from HR.`
                  : "No active tasks yet. Check back here for new assignments."}
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]">
            <div className="inline-flex rounded-full bg-fuchsia-100 px-3 py-1 text-sm font-semibold text-fuchsia-700">
              Payroll status
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Your payroll information will appear here once it is available.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]">
            <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
              Support
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Need help? Reach out to HR or use the support channels in the app.
            </p>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Latest notices and assignments
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Everything issued by HR appears here so you can review it right after sign-in.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back
              </button>
              <Link
                to="/auth/employee/forgot-password"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(2,132,199,0.6)] transition hover:brightness-110"
              >
                Forgot password
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {loadingNotices ? (
              <p className="text-sm text-slate-600">Loading latest notices...</p>
            ) : notices.length > 0 ? (
              notices.map((notice) => (
                <article key={notice._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{notice.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{notice.content}</p>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {notice.audience}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Issued by {notice.createdby?.firstname || "HR"} {notice.createdby?.lastname || ""}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-slate-600">No notices have been issued to you yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
