import { createSlice } from "@reduxjs/toolkit";
import { HRAsyncReducer } from "../AsyncReducers/asyncreducer.js";
import { HandlePostHumanResources, HandleGetHumanResources } from "../Thunks/HRThunk.js";
import { clearDemoHRSession, getDemoHRUser, setDemoHRSession } from "../../utils/demoData.js";

const HRSlice = createSlice({
    name: "HumanResources",
    initialState: {
        data: null,
        isLoading: false,
        isAuthenticated: false,
        isSignUp: false,
        isAuthourized: false,
        isVerified: false,
        isVerifiedEmailAvailable: false,
        isResetPassword: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    reducers: {
        loginDemoHR: (state) => {
            state.data = getDemoHRUser();
            state.isLoading = false;
            state.isAuthenticated = true;
            state.isSignUp = true;
            state.isAuthourized = true;
            state.isVerified = true;
            state.isVerifiedEmailAvailable = false;
            state.isResetPassword = false;
            state.error = {
                status: false,
                message: null,
                content: null
            };
            setDemoHRSession(true);
        },
        logoutHR: (state) => {
            state.data = null
            state.isLoading = false
            state.isAuthenticated = false
            state.isSignUp = false
            state.isAuthourized = false
            state.isVerified = false
            state.isVerifiedEmailAvailable = false
            state.isResetPassword = false
            state.error = {
                status: false,
                message: null,
                content: null
            };
            clearDemoHRSession();
        }
    },
    extraReducers: (builder) => {
        HRAsyncReducer(builder, HandlePostHumanResources)
        HRAsyncReducer(builder, HandleGetHumanResources)
    }
})

export const { loginDemoHR, logoutHR } = HRSlice.actions
export default HRSlice.reducer