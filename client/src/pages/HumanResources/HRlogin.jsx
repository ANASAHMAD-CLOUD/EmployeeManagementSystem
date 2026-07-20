import { SignIn } from "../../components/common/sign-in.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { CommonStateHandler } from "../../utils/commonhandler.js";
import {
  HandleGetHumanResources,
  HandlePostHumanResources,
} from "../../redux/Thunks/HRThunk.js";
import { loginDemoHR } from "../../redux/Slices/HRSlice.js";
import {
  DEMO_HR_EMAIL,
  DEMO_HR_PASSWORD,
  isDemoHRCredentials,
  isDemoHRSession,
} from "../../utils/demoData.js";

export const HRLogin = () => {
  const HRState = useSelector((state) => state.HRReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingbar = useRef(null);
  const [signinform, setsigninform] = useState({
    email: DEMO_HR_EMAIL,
    password: DEMO_HR_PASSWORD,
  });

  const handlesigninform = (event) => {
    CommonStateHandler(signinform, setsigninform, event);
  };

  const handlesigninsubmit = (e) => {
    e.preventDefault();

    if (isDemoHRCredentials(signinform.email, signinform.password)) {
      dispatch(loginDemoHR());
      navigate("/HR/dashboard/dashboard-data", { replace: true });
      return;
    }

    loadingbar.current.continuousStart();
    dispatch(HandlePostHumanResources({ apiroute: "LOGIN", data: signinform }));
  };

  if (HRState.error.status) {
    loadingbar.current.complete();
  }

  useEffect(() => {
    if (isDemoHRSession()) {
      dispatch(loginDemoHR());
      navigate("/HR/dashboard/dashboard-data", { replace: true });
      return;
    }

    if (!HRState.isAuthenticated) {
      dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }));
    }

    if (HRState.isAuthenticated) {
      loadingbar.current.complete();
      navigate("/HR/dashboard/dashboard-data", { replace: true });
    }
  }, [HRState.isAuthenticated, dispatch, navigate]);

  return (
    <div>
      <div className="employee-login-content flex justify-center items-center min-h-[100vh]">
        <LoadingBar ref={loadingbar} />
        <SignIn
          image={"../../src/assets/Employee-Welcome.jpg"}
          handlesigninform={handlesigninform}
          handlesigninsubmit={handlesigninsubmit}
          targetedstate={HRState}
          statevalue={signinform}
          redirectpath={"/auth/HR/forgot-password"}
          title="HR portal"
          subtitle="Sign in to oversee teams, payroll, and people operations"
          pill="HR access"
          accent="from-fuchsia-500 via-violet-600 to-indigo-700"
        />
      </div>
    </div>
  );
};
