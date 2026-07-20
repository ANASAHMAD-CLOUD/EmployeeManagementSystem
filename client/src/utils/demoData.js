export const DEMO_HR_EMAIL = "archit@gmail.com";
export const DEMO_HR_PASSWORD = "asdfasdf";
export const DEMO_HR_SESSION_KEY = "ems-demo-hr-auth";

export const isDemoHRCredentials = (email, password) => {
  return (
    String(email || "")
      .trim()
      .toLowerCase() === DEMO_HR_EMAIL &&
    String(password || "") === DEMO_HR_PASSWORD
  );
};

export const isDemoHRSession = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_HR_SESSION_KEY) === "true";
};

export const setDemoHRSession = (enabled) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_HR_SESSION_KEY, enabled ? "true" : "false");
};

export const clearDemoHRSession = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_HR_SESSION_KEY);
};

export const getDemoHRUser = () => ({
  _id: "demo-hr-001",
  firstname: "Archit",
  lastname: "Patel",
  email: DEMO_HR_EMAIL,
  role: "HR",
});

export const getDemoEmployeeNotices = () => [
  {
    _id: "demo-notice-1",
    title: "Quarterly planning update",
    content:
      "The team planning session is scheduled for Friday at 10:00 AM. Please review the agenda before the meeting.",
    audience: "All Employees",
    createdby: { firstname: "Archit", lastname: "Patel" },
  },
  {
    _id: "demo-notice-2",
    title: "Policy reminder",
    content:
      "Please ensure your attendance entries are updated by the end of the day to avoid delays in reporting.",
    audience: "All Employees",
    createdby: { firstname: "Archit", lastname: "Patel" },
  },
];

export const getDemoNoticePayload = () => ({
  success: true,
  data: {
    department_notices: [
      {
        _id: "demo-dept-notice-1",
        title: "Department stand-up",
        content: "Engineering stand-up is moved to 9:30 AM today.",
        audience: "Department-Specific",
        createdby: { firstname: "Archit", lastname: "Patel" },
      },
    ],
    employee_notices: getDemoEmployeeNotices(),
  },
});

export const getDemoLeaves = () => [
  {
    _id: "demo-leave-1",
    employee: { firstname: "Aarav", lastname: "Shah" },
    type: "Casual",
    status: "Approved",
    startdate: "2026-07-20",
    enddate: "2026-07-24",
    reason: "Family event",
  },
  {
    _id: "demo-leave-2",
    employee: { firstname: "Nisha", lastname: "Kumar" },
    type: "Sick",
    status: "Pending",
    startdate: "2026-07-25",
    enddate: "2026-07-26",
    reason: "Medical appointment",
  },
];

export const getDemoAttendances = () => [
  {
    _id: "demo-attendance-1",
    employee: { firstname: "Aarav", lastname: "Shah" },
    status: "Present",
    attendancelog: [{ logdate: "2026-07-16", logstatus: "Check-in" }],
  },
  {
    _id: "demo-attendance-2",
    employee: { firstname: "Nisha", lastname: "Kumar" },
    status: "Late",
    attendancelog: [{ logdate: "2026-07-16", logstatus: "Late arrival" }],
  },
];
