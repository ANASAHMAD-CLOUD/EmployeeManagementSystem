import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";

const sidebarItems = [
  {
    to: "/HR/dashboard/dashboard-data",
    label: "Dashboard",
    icon: "/../../src/assets/HR-Dashboard/dashboard.png",
  },
  {
    to: "/HR/dashboard/employees",
    label: "Employees",
    icon: "/../../src/assets/HR-Dashboard/employee-2.png",
  },
  {
    to: "/HR/dashboard/departments",
    label: "Departments",
    icon: "/../../src/assets/HR-Dashboard/department.png",
  },
  {
    to: "/HR/dashboard/salaries",
    label: "Salaries",
    icon: "/../../src/assets/HR-Dashboard/salary.png",
  },
  {
    to: "/HR/dashboard/notices",
    label: "Issue Notices",
    icon: "/../../src/assets/HR-Dashboard/notice.png",
  },
  {
    to: "/HR/dashboard/leaves",
    label: "Leaves",
    icon: "/../../src/assets/HR-Dashboard/leave.png",
  },
  {
    to: "/HR/dashboard/attendances",
    label: "Attendances",
    icon: "/../../src/assets/HR-Dashboard/attendance.png",
  },
  {
    to: "/HR/dashboard/recruitment",
    label: "Recruitment",
    icon: "/../../src/assets/HR-Dashboard/recruitment.png",
  },
  {
    to: "/HR/dashboard/interview-insights",
    label: "Interview Insights",
    icon: "/../../src/assets/HR-Dashboard/interview-insights.png",
  },
  {
    to: "/HR/dashboard/requests",
    label: "Requests",
    icon: "/../../src/assets/HR-Dashboard/request.png",
  },
  {
    to: "/HR/dashboard/hr-profiles",
    label: "HR Profiles",
    icon: "/../../src/assets/HR-Dashboard/HR-profiles.png",
  },
];

export function HRdashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 p-2">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block rounded-xl transition-all duration-200"
                >
                  {({ isActive }) => (
                    <SidebarMenuItem
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                        isActive
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-blue-200" : "bg-slate-100"}`}
                      >
                        <img
                          src={item.icon}
                          alt=""
                          className="h-5 w-5 object-contain"
                        />
                      </span>
                      <span className="text-sm font-medium leading-none">
                        {item.label}
                      </span>
                    </SidebarMenuItem>
                  )}
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
