import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { NoticeEndPoints, LeaveEndPoints, AttendanceEndPoints, RecruitmentEndPoints, InterviewEndPoints, RequestEndPoints, SalaryEndPoints, HREndPointsList, HREndPoints } from "../apis/APIsEndpoints";
import {
  getDemoAttendances,
  getDemoLeaves,
  getDemoNoticePayload,
  isDemoHRSession,
} from "../../utils/demoData";

export const FetchAllNotices = createAsyncThunk("HR/FetchAllNotices", async (_, { rejectWithValue }) => {
  try {
    if (isDemoHRSession()) {
      return { feature: "notices", data: { success: true, data: getDemoNoticePayload().data } };
    }

    const response = await apiService.get(NoticeEndPoints.GETALL, { withCredentials: true });
    return { feature: "notices", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllLeaves = createAsyncThunk("HR/FetchAllLeaves", async (_, { rejectWithValue }) => {
  try {
    if (isDemoHRSession()) {
      return { feature: "leaves", data: { success: true, data: getDemoLeaves() } };
    }

    const response = await apiService.get(LeaveEndPoints.GETALL, { withCredentials: true });
    return { feature: "leaves", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllAttendances = createAsyncThunk("HR/FetchAllAttendances", async (_, { rejectWithValue }) => {
  try {
    if (isDemoHRSession()) {
      return { feature: "attendances", data: { success: true, data: getDemoAttendances() } };
    }

    const response = await apiService.get(AttendanceEndPoints.GETALL, { withCredentials: true });
    return { feature: "attendances", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllRecruitments = createAsyncThunk("HR/FetchAllRecruitments", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(RecruitmentEndPoints.GETALL, { withCredentials: true });
    return { feature: "recruitment", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllInterviews = createAsyncThunk("HR/FetchAllInterviews", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(InterviewEndPoints.GETALL, { withCredentials: true });
    return { feature: "interviews", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllRequests = createAsyncThunk("HR/FetchAllRequests", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(RequestEndPoints.GETALL, { withCredentials: true });
    return { feature: "requests", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllSalaries = createAsyncThunk("HR/FetchAllSalaries", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(SalaryEndPoints.GETALL, { withCredentials: true });
    return { feature: "salaries", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const FetchAllHRProfiles = createAsyncThunk("HR/FetchAllHRProfiles", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(HREndPointsList.GETALL, { withCredentials: true });
    return { feature: "hr-profiles", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

// Generic create/update/delete thunks for features
export const CreateFeatureItem = createAsyncThunk("HR/CreateFeatureItem", async ({ feature, payload }, { rejectWithValue }) => {
  try {
    let response;
    switch (feature) {
      case "hr-profiles":
        // create HR via auth signup endpoint
        response = await apiService.post(HREndPoints.SIGNUP, payload, { withCredentials: true });
        break;
      case "notices":
        response = await apiService.post(NoticeEndPoints.CREATE, payload, { withCredentials: true });
        break;
      case "leaves":
        response = await apiService.post(LeaveEndPoints.CREATE, payload, { withCredentials: true });
        break;
      case "attendances":
        response = await apiService.post(AttendanceEndPoints.INITIALIZE_HR, payload, { withCredentials: true });
        break;
      case "recruitment":
        response = await apiService.post(RecruitmentEndPoints.CREATE, payload, { withCredentials: true });
        break;
      case "interviews":
        response = await apiService.post(InterviewEndPoints.CREATE, payload, { withCredentials: true });
        break;
      case "requests":
        response = await apiService.post(RequestEndPoints.CREATE, payload, { withCredentials: true });
        break;
      case "salaries":
        response = await apiService.post(SalaryEndPoints.CREATE, payload, { withCredentials: true });
        break;
      default:
        return rejectWithValue({ message: "Unknown feature for create" });
    }
    return { feature, type: "create", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const UpdateFeatureItem = createAsyncThunk("HR/UpdateFeatureItem", async ({ feature, payload }, { rejectWithValue }) => {
  try {
    let response;
    switch (feature) {
      case "hr-profiles":
        // server expects { HRID, Updatedata }
        response = await apiService.patch(HREndPointsList.UPDATE, payload, { withCredentials: true });
        break;
      case "notices":
        response = await apiService.patch(NoticeEndPoints.UPDATE, payload, { withCredentials: true });
        break;
      case "leaves":
        response = await apiService.patch(LeaveEndPoints.UPDATE_BY_HR, payload, { withCredentials: true });
        break;
      case "attendances":
        response = await apiService.patch(AttendanceEndPoints.UPDATE_HR, payload, { withCredentials: true });
        break;
      case "recruitment":
        response = await apiService.patch(RecruitmentEndPoints.UPDATE, payload, { withCredentials: true });
        break;
      case "interviews":
        response = await apiService.patch(InterviewEndPoints.UPDATE, payload, { withCredentials: true });
        break;
      case "requests":
        response = await apiService.patch(RequestEndPoints.UPDATE_BY_HR, payload, { withCredentials: true });
        break;
      case "salaries":
        response = await apiService.patch(SalaryEndPoints.UPDATE, payload, { withCredentials: true });
        break;
      case "hr-profiles":
        response = await apiService.patch(HREndPointsList.UPDATE, payload, { withCredentials: true });
        break;
      default:
        return rejectWithValue({ message: "Unknown feature for update" });
    }
    return { feature, type: "update", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const DeleteFeatureItem = createAsyncThunk("HR/DeleteFeatureItem", async ({ feature, id }, { rejectWithValue }) => {
  try {
    let response;
    switch (feature) {
      case "notices":
        response = await apiService.delete(NoticeEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "leaves":
        response = await apiService.delete(LeaveEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "attendances":
        response = await apiService.delete(AttendanceEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "recruitment":
        response = await apiService.delete(RecruitmentEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "interviews":
        response = await apiService.delete(InterviewEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "requests":
        response = await apiService.delete(RequestEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "salaries":
        response = await apiService.delete(SalaryEndPoints.DELETE(id), { withCredentials: true });
        break;
      case "hr-profiles":
        response = await apiService.delete(HREndPointsList.DELETE(id), { withCredentials: true });
        break;
      default:
        return rejectWithValue({ message: "Unknown feature for delete" });
    }
    return { feature, type: "delete", data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});
