import { ErrorPopup } from "./error-popup";
import { Link } from "react-router-dom";

export const SignIn = ({
  image,
  handlesigninform,
  handlesigninsubmit,
  targetedstate,
  statevalue,
  redirectpath,
  title = "Sign in to your account",
  subtitle = "Welcome back. Access your workspace securely.",
  pill = "Secure access",
  accent = "from-indigo-500 via-violet-500 to-fuchsia-600",
}) => {
  return (
    <>
      {targetedstate.error.status ? (
        <ErrorPopup error={targetedstate.error.message} />
      ) : null}
      <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_60%,_#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_30px_90px_-20px_rgba(15,23,42,0.35)] backdrop-blur xl:flex-row">
          <div
            className={`relative flex flex-1 items-center justify-center bg-gradient-to-br ${accent} p-8 text-white sm:p-10`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_40%)]" />
            <div className="relative w-full max-w-md space-y-6">
              <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                {pill}
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Make every sign-in feel effortless
                </h1>
                <p className="max-w-md text-sm text-white/90 sm:text-base">
                  Stay connected to your workspace with a calm, secure, and
                  beautifully designed experience.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur">
                <img
                  alt="Welcome illustration"
                  src={image}
                  className="h-56 w-full rounded-[20px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-slate-50/90 p-6 shadow-inner shadow-slate-200 sm:p-8">
              <div className="mb-6 text-center">
                <Link
                  to="/"
                  className="mb-4 inline-flex items-center text-sm font-semibold text-cyan-600 transition hover:text-cyan-500"
                >
                  ← Back to role selection
                </Link>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
              </div>

              <form className="space-y-5" onSubmit={handlesigninsubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={statevalue.email}
                      onChange={handlesigninform}
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <Link
                        to={redirectpath}
                        className="font-semibold text-cyan-600 transition hover:text-cyan-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={statevalue.password}
                      onChange={handlesigninform}
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
