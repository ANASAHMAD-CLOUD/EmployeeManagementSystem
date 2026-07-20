import { HRSignupPage } from "../pages/HumanResources/HRSignup";
import { HRLogin } from "../pages/HumanResources/HRlogin";
import { HRDashbaord } from "../pages/HumanResources/HRdashbaord";
// import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
// import { ResetEmailVerification } from "../pages/HumanResources/resendemailverificaiton.jsx"
import { HRForgotPasswordPage } from "../pages/HumanResources/forgotpassword.jsx";
import { ResetMailConfirmPage } from "../pages/HumanResources/resetmailconfirm.jsx";
import { ResetHRPasswordPage } from "../pages/HumanResources/resetpassword.jsx";
import { ResetHRVerifyEmailPage } from "../pages/HumanResources/resetemail.jsx";
import { HRDashboardPage } from "../pages/HumanResources/Dashboard Childs/dashboardpage.jsx";
import { HRFeaturePage } from "../pages/HumanResources/Dashboard Childs/HRFeaturePage.jsx";
import { SalaryFeature } from "../pages/HumanResources/Dashboard Childs/SalaryFeature.jsx";
import { AttendanceFeature } from "../pages/HumanResources/Dashboard Childs/AttendanceFeature.jsx";
import { HRProtectedRoutes } from "./HRprotectedroutes.jsx";
import { HREmployeesPage } from "../pages/HumanResources/Dashboard Childs/employeespage.jsx";
import { HRDepartmentPage } from "../pages/HumanResources/Dashboard Childs/departmentpage.jsx";
export const HRRoutes = [
  {
    path: "/auth/HR/signup",
    element: <HRSignupPage />,
  },
  {
    path: "/auth/HR/login",
    element: <HRLogin />,
  },
  {
    path: "/HR/dashboard",
    element: <HRDashbaord />,
    children: [
      {
        path: "/HR/dashboard/dashboard-data",
        element: <HRDashboardPage />,
      },
      {
        path: "/HR/dashboard/employees",
        element: <HREmployeesPage />,
      },
      {
        path: "/HR/dashboard/departments",
        element: <HRDepartmentPage />,
      },
      {
        path: "/HR/dashboard/salaries",
        element: (
          <SalaryFeature
            title="Salaries"
            subtitle="Manage salary records and payroll workflows."
          />
        ),
      },
      {
        path: "/HR/dashboard/notices",
        element: (
          <HRFeaturePage
            title="Issue Notices"
            subtitle="Create and manage employee notice board items."
          />
        ),
      },
      {
        path: "/HR/dashboard/leaves",
        element: (
          <HRFeaturePage
            title="Leaves"
            subtitle="Review and approve leave requests."
          />
        ),
      },
      {
        path: "/HR/dashboard/attendances",
        element: (
          <AttendanceFeature
            title="Attendances"
            subtitle="Track attendance and time records."
          />
        ),
      },
      {
        path: "/HR/dashboard/recruitment",
        element: (
          <HRFeaturePage
            title="Recruitment"
            subtitle="Manage job postings and applicant flows."
          />
        ),
      },
      {
        path: "/HR/dashboard/interview-insights",
        element: (
          <HRFeaturePage
            title="Interview Insights"
            subtitle="View candidate interview analytics."
          />
        ),
      },
      {
        path: "/HR/dashboard/requests",
        element: (
          <HRFeaturePage
            title="Requests"
            subtitle="Handle HR service requests from employees."
          />
        ),
      },
      {
        path: "/HR/dashboard/hr-profiles",
        element: (
          <HRFeaturePage
            title="HR Profiles"
            subtitle="Manage HR team members and access rights."
          />
        ),
      },
    ],
  },
  {
    path: "/auth/HR/reset-email-validation",
    element: <ResetHRVerifyEmailPage />,
  },
  {
    path: "/auth/HR/forgot-password",
    element: <HRForgotPasswordPage />,
  },
  {
    path: "/auth/HR/reset-email-confirmation",
    element: <ResetMailConfirmPage />,
  },
  {
    path: "/auth/HR/resetpassword/:token",
    element: <ResetHRPasswordPage />,
  },
];
