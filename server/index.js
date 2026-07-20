import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import EmployeeAuthRouter from './routes/EmployeeAuth.route.js'
import HRAuthrouter from './routes/HRAuth.route.js'
import DashboardRouter from './routes/Dashbaord.route.js'
import EmployeeRouter from './routes/Employee.route.js'
import HRRouter from './routes/HR.route.js'
import DepartmentRouter from './routes/Department.route.js'
import SalaryRouter from './routes/Salary.route.js'
import NoticeRouter from "./routes/Notice.route.js"
import LeaveRouter from './routes/Leave.route.js'
import AttendanceRouter from './routes/Attendance.route.js'
import RecruitmentRouter from './routes/Recuritment.route.js'
import ApplicantRouter from './routes/Applicant.route.js'
import InterviewInsightRouter from './routes/InterviewInsights.route.js'
import GenerateRequestRouter from './routes/GenerateRequest.route.js'
import CorporateCalendarRouter from './routes/CorporateCalendar.route.js'
import BalanceRouter from './routes/Balance.route.js'
import { ConnectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from "cors"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5050;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cookieParser())

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use("/api/auth/employee", EmployeeAuthRouter)

app.use("/api/auth/HR", HRAuthrouter)

app.use("/api/v1/dashboard", DashboardRouter)

app.use("/api/v1/employee", EmployeeRouter)

app.use("/api/v1/HR", HRRouter)

app.use("/api/v1/department", DepartmentRouter)

app.use("/api/v1/salary", SalaryRouter)

app.use("/api/v1/notice", NoticeRouter)

app.use("/api/v1/leave", LeaveRouter)

app.use("/api/v1/attendance", AttendanceRouter)

app.use("/api/v1/recruitment", RecruitmentRouter)

app.use("/api/v1/applicant", ApplicantRouter)

app.use("/api/v1/interview-insights", InterviewInsightRouter)

app.use("/api/v1/generate-request", GenerateRequestRouter)

app.use("/api/v1/corporate-calendar", CorporateCalendarRouter)

app.use("/api/v1/balance", BalanceRouter)

app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload' })
  }

  console.error('Unhandled server error:', err)
  return res.status(500).json({ success: false, message: 'Internal server error' })
})

app.listen(process.env.PORT, async () => {
  await ConnectDB()
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})