export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    LOGOUT: "/api/auth/employee/logout",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}`
}

export const HREndPoints = {
    SIGNUP: "/api/auth/HR/signup",
    CHECKLOGIN: "/api/auth/HR/check-login",
    LOGIN: "/api/auth/HR/login",
    LOGOUT: "/api/auth/HR/logout",
    VERIFY_EMAIL: "/api/auth/HR/verify-email",
    CHECK_VERIFY_EMAIL: "/api/auth/HR/check-verify-email",
    RESEND_VERIFY_EMAIL: "/api/auth/HR/resend-verify-email",
    FORGOT_PASSWORD: "/api/auth/HR/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/HR/reset-password/${token}`
}

export const DashboardEndPoints = {
    GETDATA: "/api/v1/dashboard/HR-dashboard"
}

export const HREmployeesPageEndPoints = {
    GETALL: "/api/v1/employee/all",
    ADDEMPLOYEE: "/api/auth/employee/signup",
    GETONE: (EMID) => `/api/v1/employee/by-HR/${EMID}`,
    DELETE: (EMID) => `/api/v1/employee/delete-employee/${EMID}`
}

export const HRDepartmentPageEndPoints = {
    GETALL: "/api/v1/department/all",
    CREATE: "/api/v1/department/create-department",
    UPDATE: "/api/v1/department/update-department",
    DELETE: "/api/v1/department/delete-department"
}

export const EmployeesIDsEndPoints = {
    GETALL: "/api/v1/employee/all-employees-ids",
}

export const NoticeEndPoints = {
    GETALL: "/api/v1/notice/all",
    MY_NOTICES: "/api/v1/notice/employee-notices",
    GETONE: (id) => `/api/v1/notice/${id}`,
    CREATE: "/api/v1/notice/create-notice",
    UPDATE: "/api/v1/notice/update-notice",
    DELETE: (id) => `/api/v1/notice/delete-notice/${id}`,
}

export const LeaveEndPoints = {
    GETALL: "/api/v1/leave/all",
    GETONE: (id) => `/api/v1/leave/${id}`,
    CREATE: "/api/v1/leave/create-leave",
    UPDATE_BY_EMP: "/api/v1/leave/employee-update-leave",
    UPDATE_BY_HR: "/api/v1/leave/HR-update-leave",
    DELETE: (id) => `/api/v1/leave/delete-leave/${id}`,
}

export const AttendanceEndPoints = {
    GETALL: "/api/v1/attendance/all",
    GETONE: (id) => `/api/v1/attendance/${id}`,
    INITIALIZE: "/api/v1/attendance/initialize",
    INITIALIZE_HR: "/api/v1/attendance/initialize",
    UPDATE: "/api/v1/attendance/update-attendance",
    UPDATE_HR: "/api/v1/attendance/update-attendance",
    DELETE: (id) => `/api/v1/attendance/delete-attendance/${id}`,
}

export const RecruitmentEndPoints = {
    GETALL: "/api/v1/recruitment/all",
    GETONE: (id) => `/api/v1/recruitment/${id}`,
    CREATE: "/api/v1/recruitment/create-recruitment",
    UPDATE: "/api/v1/recruitment/update-recruitment",
    DELETE: (id) => `/api/v1/recruitment/delete-recruitment/${id}`,
}

export const InterviewEndPoints = {
    GETALL: "/api/v1/interview-insights/all",
    GETONE: (id) => `/api/v1/interview-insights/${id}`,
    CREATE: "/api/v1/interview-insights/create-interview",
    UPDATE: "/api/v1/interview-insights/update-interview",
    DELETE: (id) => `/api/v1/interview-insights/delete-interview/${id}`,
}

export const RequestEndPoints = {
    GETALL: "/api/v1/generate-request/all",
    GETONE: (id) => `/api/v1/generate-request/${id}`,
    CREATE: "/api/v1/generate-request/create-request",
    UPDATE_BY_EMP: "/api/v1/generate-request/update-request-content",
    UPDATE_BY_HR: "/api/v1/generate-request/update-request-status",
    DELETE: (id) => `/api/v1/generate-request/delete-request/${id}`,
}

export const SalaryEndPoints = {
    GETALL: "/api/v1/salary/all",
    GETONE: (id) => `/api/v1/salary/${id}`,
    CREATE: "/api/v1/salary/create-salary",
    UPDATE: "/api/v1/salary/update-salary",
    DELETE: (id) => `/api/v1/salary/delete-salary/${id}`,
}

export const HREndPointsList = {
    GETALL: "/api/v1/HR/all",
    GETONE: (id) => `/api/v1/HR/${id}`,
    UPDATE: "/api/v1/HR/update-HR",
    DELETE: (id) => `/api/v1/HR/delete-HR/${id}`,
}