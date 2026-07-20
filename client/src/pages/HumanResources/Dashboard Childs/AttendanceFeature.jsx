import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllAttendances,
  CreateFeatureItem,
  UpdateFeatureItem,
  DeleteFeatureItem,
} from "../../../redux/Thunks/HRFeaturesThunk";
import { HREmployeesPageEndPoints } from "../../../redux/apis/APIsEndpoints";
import { apiService } from '../../../redux/apis/APIService';

export const AttendanceFeature = ({
  title = "Attendances",
  subtitle = "Track attendance",
}) => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.HRFeaturesReducer);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeID: "",
    currentdate: new Date().toISOString().slice(0, 10),
    status: "Present",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(FetchAllAttendances());
    const loadEmployees = async () => {
      try {
        const res = await apiService.get(HREmployeesPageEndPoints.GETALL, {
          withCredentials: true,
        });
        setEmployees(res.data.data || res.data || []);
      } catch (err) {
        // ignore
      }
    };
    loadEmployees();
  }, [dispatch]);

  const list =
    state?.data?.["attendances"]?.data || state?.data?.["attendances"] || [];

  const openInitialize = () => {
    setEditingId(null);
    setForm({
      employeeID: "",
      currentdate: new Date().toISOString().slice(0, 10),
      status: "Not Specified",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id || item.id);
    setForm({
      employeeID: item.employee?._id || item.employee,
      currentdate: new Date().toISOString().slice(0, 10),
      status: item.status || "Not Specified",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      setError("");
      if (!editingId && !form.employeeID) {
        setError("Please select an employee before initializing attendance.");
        return;
      }
      const action =
        editingId && form.currentdate && form.status
          ? UpdateFeatureItem({
              feature: "attendances",
              payload: {
                attendanceID: editingId,
                status: form.status,
                currentdate: form.currentdate,
              },
            })
          : CreateFeatureItem({
              feature: "attendances",
              payload: { employeeID: form.employeeID },
            });
      const resultAction = await dispatch(action).unwrap();
      if (resultAction?.data?.success === false) {
        throw new Error(
          resultAction.data.message || "Unable to save attendance",
        );
      }
      await dispatch(FetchAllAttendances());
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Unable to save attendance");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete attendance record?")) return;
    await dispatch(DeleteFeatureItem({ feature: "attendances", id }));
    dispatch(FetchAllAttendances());
  };

  return (
    <div className="space-y-4 p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-700">
          HR
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="flex justify-end mb-3">
        <button
          onClick={openInitialize}
          className="rounded bg-sky-600 px-3 py-1 text-white"
        >
          Initialize Attendance
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm text-slate-600">
              <th className="p-2">Employee</th>
              <th className="p-2">Status</th>
              <th className="p-2">Latest Log</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ? (
              list.map((a) => {
                const latest =
                  Array.isArray(a.attendancelog) && a.attendancelog.length
                    ? a.attendancelog[a.attendancelog.length - 1]
                    : null;
                return (
                  <tr key={a._id || a.id} className="border-t">
                    <td className="p-2">
                      {a.employee?.firstname} {a.employee?.lastname}
                    </td>
                    <td className="p-2">{a.status}</td>
                    <td className="p-2">
                      {latest ? `${latest.logdate} — ${latest.logstatus}` : "-"}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(a)}
                          className="rounded bg-amber-400 px-2 py-1 text-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(a._id || a.id)}
                          className="rounded bg-red-500 px-2 py-1 text-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-sm text-slate-600">
                  No attendance records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-2xl rounded bg-white p-4">
            <h3 className="text-lg font-semibold mb-2">
              {editingId ? "Update Attendance" : "Initialize Attendance"}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {!editingId && (
                <select
                  value={form.employeeID}
                  onChange={(e) =>
                    setForm({ ...form, employeeID: e.target.value })
                  }
                  className="rounded border p-2"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstname} {emp.lastname}
                    </option>
                  ))}
                </select>
              )}

              {editingId && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={form.currentdate}
                    onChange={(e) =>
                      setForm({ ...form, currentdate: e.target.value })
                    }
                    className="rounded border p-2"
                  />
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="rounded border p-2"
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>On Leave</option>
                    <option>Not Specified</option>
                  </select>
                </div>
              )}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="rounded border px-3 py-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded bg-sky-600 px-3 py-1 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceFeature;
