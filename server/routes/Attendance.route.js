import express from 'express'
import { HandleInitializeAttendance, HandleAllAttendance, HandleAttendance, HandleUpdateAttendance, HandleDeleteAttendance } from '../controllers/Attendance.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken, VerifyEmployeeOrHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/initialize", VerifyEmployeeOrHRToken, HandleInitializeAttendance)
router.post("/initialize-hr", VerifyhHRToken, HandleInitializeAttendance)

router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllAttendance)

router.get("/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAttendance)

router.patch("/update-attendance", VerifyEmployeeOrHRToken, HandleUpdateAttendance)
router.patch("/update-attendance-hr", VerifyhHRToken, HandleUpdateAttendance)

router.delete("/delete-attendance/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteAttendance)

export default router