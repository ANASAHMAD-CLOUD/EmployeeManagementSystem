import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import welcomeImage from "@/assets/welcome.png";

export const EntryPage = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef2ff_45%,_#fdf2f8_100%)] px-0 py-0">
      <div className="mx-auto flex min-h-screen w-full flex-col overflow-hidden bg-white/70 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl md:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="inline-flex w-fit items-center rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm">
            Employee Management System
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Welcome back. Choose your workspace.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Access the portal built for your role and continue your day with a
            smooth, secure experience.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link to="/auth/employee/login" className="w-full">
              <Button className="h-14 w-full rounded-2xl bg-slate-900 px-6 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800">
                Employee Login
              </Button>
            </Link>
            <Link to="/auth/HR/login" className="w-full">
              <Button
                variant="outline"
                className="h-14 w-full rounded-2xl border-slate-200 bg-white/90 px-6 text-base font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                HR Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)] px-6 py-8 sm:px-10 lg:px-12">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]">
            <img
              src={welcomeImage}
              alt="Welcome illustration"
              className="mx-auto w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
