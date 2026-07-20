import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllSalaries,
  CreateFeatureItem,
  UpdateFeatureItem,
  DeleteFeatureItem,
} from "../../../redux/Thunks/HRFeaturesThunk";
import { HREmployeesPageEndPoints } from "../../../redux/apis/APIsEndpoints";
import { apiService } from '../../../redux/apis/APIService';

export const SalaryFeature = ({
  title = "Salaries",
  subtitle = "Manage salary records",
}) => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.HRFeaturesReducer);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeID: "",
    basicpay: "",
    bonusePT: "",
    deductionPT: "",
    duedate: "",
    currency: "USD",
    status: "Pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(FetchAllSalaries());
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
    state?.data?.["salaries"]?.data || state?.data?.["salaries"] || [];

  const openCreate = () => {
    setEditingId(null);
    setForm({
      employeeID: "",
      basicpay: "",
      bonusePT: "",
      deductionPT: "",
      duedate: "",
      currency: "USD",
      status: "Pending",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id || item.id);
    setForm({
      employeeID: item.employee?._id || item.employee,
      basicpay: item.basicpay,
      bonusePT: item.bonusePT || 0,
      deductionPT: item.deductionPT || 0,
      duedate: item.duedate
        ? new Date(item.duedate).toISOString().slice(0, 10)
        : "",
      currency: item.currency || "USD",
      status: item.status || "Pending",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      setError("");
      const action = editingId
        ? UpdateFeatureItem({
            feature: "salaries",
            payload: {
              salaryID: editingId,
              basicpay: Number(form.basicpay),
              bonusePT: Number(form.bonusePT),
              deductionPT: Number(form.deductionPT),
              duedate: form.duedate,
              currency: form.currency,
              status: form.status,
            },
          })
        : CreateFeatureItem({
            feature: "salaries",
            payload: {
              employeeID: form.employeeID,
              basicpay: Number(form.basicpay),
              bonusePT: Number(form.bonusePT),
              deductionPT: Number(form.deductionPT),
              duedate: form.duedate,
              currency: form.currency,
            },
          });
      const resultAction = await dispatch(action).unwrap();
      if (resultAction?.data?.success === false) {
        throw new Error(resultAction.data.message || "Unable to save salary");
      }
      await dispatch(FetchAllSalaries());
      setShowForm(false);
    } catch (error) {
      setError(error.message || "Unable to save salary");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete salary record?")) return;
    await dispatch(DeleteFeatureItem({ feature: "salaries", id }));
    dispatch(FetchAllSalaries());
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
          onClick={openCreate}
          className="rounded bg-sky-600 px-3 py-1 text-white"
        >
          Create Salary
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm text-slate-600">
              <th className="p-2">Employee</th>
              <th className="p-2">Basic Pay</th>
              <th className="p-2">Bonuses</th>
              <th className="p-2">Deductions</th>
              <th className="p-2">Net Pay</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Currency</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ? (
              list.map((s) => (
                <tr key={s._id || s.id} className="border-t">
                  <td className="p-2">
                    {s.employee?.firstname} {s.employee?.lastname}
                  </td>
                  <td className="p-2">{s.basicpay}</td>
                  <td className="p-2">{s.bonuses}</td>
                  <td className="p-2">{s.deductions}</td>
                  <td className="p-2">{s.netpay}</td>
                  <td className="p-2">
                    {s.duedate ? new Date(s.duedate).toLocaleDateString() : ""}
                  </td>
                  <td className="p-2">{s.currency}</td>
                  <td className="p-2">{s.status || "-"}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="rounded bg-amber-400 px-2 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id || s.id)}
                        className="rounded bg-red-500 px-2 py-1 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-sm text-slate-600">
                  No salary records.
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
              {editingId ? "Edit Salary" : "Create Salary"}
            </h3>
            <div className="grid grid-cols-1 gap-2">
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
              <div className="flex gap-2">
                <input
                  placeholder="Basic pay"
                  value={form.basicpay}
                  onChange={(e) =>
                    setForm({ ...form, basicpay: e.target.value })
                  }
                  className="w-1/3 rounded border p-2"
                />
                <input
                  placeholder="Bonus %"
                  value={form.bonusePT}
                  onChange={(e) =>
                    setForm({ ...form, bonusePT: e.target.value })
                  }
                  className="w-1/3 rounded border p-2"
                />
                <input
                  placeholder="Deduction %"
                  value={form.deductionPT}
                  onChange={(e) =>
                    setForm({ ...form, deductionPT: e.target.value })
                  }
                  className="w-1/3 rounded border p-2"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  min={new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .slice(0, 10)}
                  value={form.duedate}
                  onChange={(e) =>
                    setForm({ ...form, duedate: e.target.value })
                  }
                  className="rounded border p-2"
                />
                <input
                  placeholder="Currency"
                  value={form.currency}
                  onChange={(e) =>
                    setForm({ ...form, currency: e.target.value })
                  }
                  className="rounded border p-2"
                />
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="rounded border p-2"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Failed</option>
                </select>
              </div>
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

export default SalaryFeature;
