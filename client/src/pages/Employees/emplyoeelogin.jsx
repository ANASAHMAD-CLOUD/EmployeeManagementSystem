import { useState, useEffect, useRef } from "react";
import { SignIn } from "../../components/common/sign-in.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  HandlePostEmployees,
  HandleGetEmployees,
} from "../../redux/Thunks/EmployeeThunk.js";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { CommonStateHandler } from "../../utils/commonhandler.js";

export const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingbar = useRef(null);
  const EmployeeState = useSelector((state) => state.employeereducer);
  const [signinform, set_signinform] = useState({
    email: "",
    password: "",
  });

  const handlesigninform = (event) => {
    CommonStateHandler(signinform, set_signinform, event);
  };

  const handlesigninsubmit = async (e) => {
    e.preventDefault();
    loadingbar.current.continuousStart();
    dispatch(HandlePostEmployees({ apiroute: "LOGIN", data: signinform }));
  };

  const RedirectToDashbaord = () => {
    loadingbar.current.complete();
    navigate("/auth/employee/employee-dashboard");
  };

  if (EmployeeState.error.status) {
    loadingbar.current.complete();
  }

  useEffect(() => {
    if (!EmployeeState.isAuthenticated) {
      dispatch(HandleGetEmployees({ apiroute: "CHECKELOGIN" }));
    }

    if (EmployeeState.isAuthenticated) {
      RedirectToDashbaord();
    }
  }, [EmployeeState.isAuthenticated]);

  return (
    <div className="employee-login-container">
      <LoadingBar ref={loadingbar} />
      <div className="employee-login-content flex justify-center items-center min-h-[100vh]">
        <SignIn
          image={"../../src/assets/Employee-Welcome.jpg"}
          handlesigninform={handlesigninform}
          handlesigninsubmit={handlesigninsubmit}
          targetedstate={EmployeeState}
          statevalue={signinform}
          redirectpath={"/auth/employee/forgot-password"}
          title="Employee portal"
          subtitle="Sign in to manage your daily workplace tasks"
          pill="Employee access"
          accent="from-cyan-500 via-sky-600 to-blue-700"
        />
      </div>
    </div>
  );
};
