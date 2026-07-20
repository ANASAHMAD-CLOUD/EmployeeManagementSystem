import { createSlice } from "@reduxjs/toolkit";
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
} from "../Thunks/HRFeaturesThunk";

const initialState = {
  isLoading: false,
  error: null,
  data: {
    notices: null,
    leaves: null,
    attendances: null,
    recruitment: null,
    interviews: null,
    requests: null,
    salaries: null,
    "hr-profiles": null,
  },
};

const HRFeaturesSlice = createSlice({
  name: "HRFeatures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlers = [
      FetchAllNotices,
      FetchAllLeaves,
      FetchAllAttendances,
      FetchAllRecruitments,
      FetchAllInterviews,
      FetchAllRequests,
      FetchAllSalaries,
      FetchAllHRProfiles,
    ];

    handlers.forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { feature, data } = action.payload || {};
        if (feature) state.data[feature] = data;
      });
      builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: action.error?.message };
      });
    });

    // CRUD handlers
    [CreateFeatureItem, UpdateFeatureItem, DeleteFeatureItem].forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { feature, type, data } = action.payload || {};
        if (feature) {
          // prefer API returned full dataset when available
          if (data && data.data) state.data[feature] = data.data;
          else state.data[feature] = data;
          state.lastAction = { feature, type };
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: action.error?.message };
      });
    });
  },
});

export default HRFeaturesSlice.reducer;
