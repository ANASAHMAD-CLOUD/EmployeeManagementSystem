import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllNotices,
  FetchAllLeaves,
  FetchAllAttendances,
  FetchAllRecruitments,
  FetchAllInterviews,
  FetchAllRequests,
  FetchAllSalaries,
  FetchAllHRProfiles,
  CreateFeatureItem,
  UpdateFeatureItem,
  DeleteFeatureItem,
} from "../../../redux/Thunks/HRFeaturesThunk";
import { apiService } from "../../../redux/apis/APIService";
import {
  HRDepartmentPageEndPoints,
  HREmployeesPageEndPoints,
} from "../../../redux/apis/APIsEndpoints";

const featureMap = {
  "/HR/dashboard/notices": FetchAllNotices,
  "/HR/dashboard/leaves": FetchAllLeaves,
  "/HR/dashboard/attendances": FetchAllAttendances,
  "/HR/dashboard/recruitment": FetchAllRecruitments,
  "/HR/dashboard/interview-insights": FetchAllInterviews,
  "/HR/dashboard/requests": FetchAllRequests,
  "/HR/dashboard/salaries": FetchAllSalaries,
  "/HR/dashboard/hr-profiles": FetchAllHRProfiles,
};

const emptyNoticeForm = {
  title: "",
  content: "",
  audience: "Employee-Specific",
  departmentID: "",
  employeeID: "",
};

export const HRFeaturePage = ({ title = "", subtitle = "" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((s) => s.HRFeaturesReducer);

  const [showForm, setShowForm] = useState(false);
  const [editPayload, setEditPayload] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [noticeForm, setNoticeForm] = useState(emptyNoticeForm);
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactnumber: "",
    title: "",
    department: "",
    password: "",
  });

  useEffect(() => {
    const thunk = featureMap[location.pathname];
    if (thunk) dispatch(thunk());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const loadDepartmentsAndEmployees = async () => {
      try {
        if (location.pathname === "/HR/dashboard/notices") {
          const [departmentRes, employeesRes] = await Promise.all([
            apiService.get(HRDepartmentPageEndPoints.GETALL, {
              withCredentials: true,
            }),
            apiService.get(HREmployeesPageEndPoints.GETALL, {
              withCredentials: true,
            }),
          ]);

          const departmentsPayload = departmentRes.data?.data || departmentRes.data || [];
          const employeesPayload = employeesRes.data?.data || employeesRes.data || [];

          setDepartments(Array.isArray(departmentsPayload) ? departmentsPayload : []);
          setEmployees(Array.isArray(employeesPayload) ? employeesPayload : []);
        }

        if (location.pathname === "/HR/dashboard/hr-profiles") {
          const res = await apiService.get(HRDepartmentPageEndPoints.GETALL, {
            withCredentials: true,
          });
          setDepartments(res.data.data || res.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadDepartmentsAndEmployees();
  }, [location.pathname]);

  const pathnameKey =
    location.pathname.replace("/HR/dashboard/", "") || title.toLowerCase();
  const listData = state?.data?.[pathnameKey] || null;
  const noticeData =
    pathnameKey === "notices"
      ? listData?.data || { department_notices: [], employee_notices: [] }
      : null;

  const openCreate = () => {
    setEditingId(null);
    setEditPayload("");
    setFormState({
      firstname: "",
      lastname: "",
      email: "",
      contactnumber: "",
      title: "",
      department: "",
      password: "",
    });
    if (pathnameKey === "notices") {
      setNoticeForm(emptyNoticeForm);
    }
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id || item.id || null);
    setEditPayload(JSON.stringify(item, null, 2));
    setFormState({
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      contactnumber: item.contactnumber || "",
      title: item.title || "",
      department:
        (item.department && (item.department._id || item.department)) || "",
      password: "",
    });
    setShowForm(true);
  };

  const handleNoticeChange = (event) => {
    const { name, value } = event.target;
    setNoticeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoticeSubmit = async (event) => {
    event.preventDefault();

    if (!noticeForm.title.trim() || !noticeForm.content.trim()) {
      return;
    }

    if (
      noticeForm.audience === "Department-Specific" &&
      !noticeForm.departmentID
    ) {
      return;
    }

    if (noticeForm.audience === "Employee-Specific" && !noticeForm.employeeID) {
      return;
    }

    const payload = {
      title: noticeForm.title.trim(),
      content: noticeForm.content.trim(),
      audience: noticeForm.audience,
      ...(noticeForm.audience === "Department-Specific"
        ? { departmentID: noticeForm.departmentID }
        : { employeeID: noticeForm.employeeID }),
    };

    await dispatch(CreateFeatureItem({ feature: pathnameKey, payload }));
    const thunk = featureMap[location.pathname];
    if (thunk) dispatch(thunk());
    setNoticeForm(emptyNoticeForm);
  };

  const handleSubmit = async () => {
    try {
      if (pathnameKey === "hr-profiles") {
        const payload = {
          firstname: formState.firstname,
          lastname: formState.lastname,
          email: formState.email,
          contactnumber: formState.contactnumber,
          title: formState.title,
          department: formState.department,
        };
        if (editingId) {
          await dispatch(
            UpdateFeatureItem({
              feature: pathnameKey,
              payload: { HRID: editingId, Updatedata: payload },
            }),
          );
        } else {
          payload.password = formState.password || "Password@123";
          await dispatch(CreateFeatureItem({ feature: pathnameKey, payload }));
        }
      } else if (pathnameKey === "notices") {
        await handleNoticeSubmit({ preventDefault: () => {} });
      } else {
        const parsed = editPayload ? JSON.parse(editPayload) : {};
        if (editingId) {
          await dispatch(
            UpdateFeatureItem({ feature: pathnameKey, payload: parsed }),
          );
        } else {
          await dispatch(
            CreateFeatureItem({ feature: pathnameKey, payload: parsed }),
          );
        }
      }
      const thunk = featureMap[location.pathname];
      if (thunk) dispatch(thunk());
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await dispatch(DeleteFeatureItem({ feature: pathnameKey, id }));
    const thunk = featureMap[location.pathname];
    if (thunk) dispatch(thunk());
  };

  return (
    <div className="space-y-4 p-4">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.35)]">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-700">
            HR feature
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-700">
          {state.isLoading && <p>Loading...</p>}
          {state.error && (
            <p className="text-red-600">
              {state.error.message || "Failed to load"}
            </p>
          )}
          {!state.isLoading && !state.error && (
            <div>
              {pathnameKey !== "notices" && (
                <div className="mb-4 flex items-center justify-end">
                  <button
                    onClick={openCreate}
                    className="rounded bg-sky-600 px-3 py-1 text-white"
                  >
                    Create
                  </button>
                </div>
              )}

              {pathnameKey === "notices" ? (
                <div className="space-y-5">
                  <form
                    onSubmit={handleNoticeSubmit}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Publish a work notice
                        </h2>
                        <p className="text-sm text-slate-600">
                          Send the update to a department or directly to one employee.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                          Title
                        </label>
                        <input
                          name="title"
                          value={noticeForm.title}
                          onChange={handleNoticeChange}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                          placeholder="Quarterly review update"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                          Target audience
                        </label>
                        <select
                          name="audience"
                          value={noticeForm.audience}
                          onChange={handleNoticeChange}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                        >
                          <option value="Employee-Specific">Single employee</option>
                          <option value="Department-Specific">Department</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        {noticeForm.audience === "Department-Specific"
                          ? "Department"
                          : "Employee"}
                      </label>
                      <select
                        name={
                          noticeForm.audience === "Department-Specific"
                            ? "departmentID"
                            : "employeeID"
                        }
                        value={
                          noticeForm.audience === "Department-Specific"
                            ? noticeForm.departmentID
                            : noticeForm.employeeID
                        }
                        onChange={handleNoticeChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                        required
                      >
                        <option value="">Select a recipient</option>
                        {noticeForm.audience === "Department-Specific"
                          ? departments.map((department) => (
                              <option key={department._id || department.id} value={department._id || department.id}>
                                {department.name || department.title}
                              </option>
                            ))
                          : employees.map((employee) => (
                              <option key={employee._id || employee.id} value={employee._id || employee.id}>
                                {employee.firstname} {employee.lastname}
                              </option>
                            ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Notice details
                      </label>
                      <textarea
                        name="content"
                        value={noticeForm.content}
                        onChange={handleNoticeChange}
                        rows={5}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                        placeholder="Add the work assignment, update, or reminder here..."
                        required
                      />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="rounded bg-sky-600 px-4 py-2 text-white"
                      >
                        Publish notice
                      </button>
                    </div>
                  </form>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Employee notices</h3>
                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                          {noticeData?.employee_notices?.length || 0}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {(noticeData?.employee_notices || []).length > 0 ? (
                          noticeData.employee_notices.map((notice) => (
                            <div key={notice._id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-slate-900">{notice.title}</p>
                                  <p className="mt-1 text-sm text-slate-600">{notice.content}</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase text-slate-600">
                                  {notice.audience}
                                </span>
                              </div>
                              <p className="mt-2 text-xs text-slate-500">
                                Assigned to {notice.employee?.firstname || "employee"} {notice.employee?.lastname || ""} • by {notice.createdby?.firstname || "HR"} {notice.createdby?.lastname || ""}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-600">No direct employee notices yet.</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Department notices</h3>
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                          {noticeData?.department_notices?.length || 0}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {(noticeData?.department_notices || []).length > 0 ? (
                          noticeData.department_notices.map((notice) => (
                            <div key={notice._id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-slate-900">{notice.title}</p>
                                  <p className="mt-1 text-sm text-slate-600">{notice.content}</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase text-slate-600">
                                  {notice.audience}
                                </span>
                              </div>
                              <p className="mt-2 text-xs text-slate-500">
                                Department {notice.department?.name || "department"} • by {notice.createdby?.firstname || "HR"} {notice.createdby?.lastname || ""}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-600">No department notices yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : pathnameKey === "hr-profiles" ? (
                Array.isArray(listData?.data || listData) &&
                (listData.data || listData).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(listData.data || listData).map((hr) => (
                      <div
                        key={hr._id || hr.id}
                        className="rounded-lg border bg-white p-4 shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold">
                            {(hr.firstname?.[0] || hr.email?.[0] || "H").toUpperCase()}
                          </div>
                          <div className="grow">
                            <div className="text-lg font-semibold">
                              {hr.firstname} {hr.lastname}
                            </div>
                            <div className="text-sm text-slate-600">{hr.title}</div>
                            <div className="text-sm text-slate-500">{hr.email}</div>
                            <div className="text-sm text-slate-500">{hr.contactnumber}</div>
                            <div className="text-sm text-slate-500">
                              {hr.department?.name || hr.department}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(hr)}
                            className="rounded bg-amber-400 px-3 py-1 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(hr._id || hr.id)}
                            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">No HR profiles found.</p>
                )
              ) : (
                <div className="space-y-4">
                  {showForm ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">
                          {editingId ? "Edit item" : "Create item"}
                        </h2>
                        <button
                          onClick={() => setShowForm(false)}
                          className="text-sm text-slate-500"
                        >
                          Cancel
                        </button>
                      </div>
                      <textarea
                        rows={10}
                        value={editPayload}
                        onChange={(e) => setEditPayload(e.target.value)}
                        placeholder='{
  "title": "..."
}'
                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm shadow-sm"
                      />
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={handleSubmit}
                          className="rounded bg-sky-600 px-3 py-1 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-600">
                      This feature is ready for your data payload. Use the Create button to add a new record.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
