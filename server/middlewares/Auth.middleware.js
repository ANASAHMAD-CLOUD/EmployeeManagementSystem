import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    const token = req.cookies.EMtoken
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.clearCookie("EMtoken")
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin: true })
        }
        req.EMid = decoded.EMid
        req.EMrole = decoded.EMrole
        req.ORGID = decoded.ORGID
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error: error })
    }
}

export const VerifyhHRToken = (req, res, next) => {
    const token = req.cookies.HRtoken
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.clearCookie("HRtoken")
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin: true })
        }
        req.HRid = decoded.HRid
        req.ORGID = decoded.ORGID
        req.Role = decoded.HRrole
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error: error })
    }
}

export const VerifyEmployeeOrHRToken = (req, res, next) => {
    const employeeToken = req.cookies.EMtoken
    const hrToken = req.cookies.HRtoken

    if (!employeeToken && !hrToken) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }

    const tryVerify = (token, isHR) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (!decoded) return null
            if (isHR) {
                req.HRid = decoded.HRid
                req.Role = decoded.HRrole
            } else {
                req.EMid = decoded.EMid
                req.EMrole = decoded.EMrole
            }
            req.ORGID = decoded.ORGID
            return decoded
        } catch (error) {
            return null
        }
    }

    if (employeeToken) {
        const decoded = tryVerify(employeeToken, false)
        if (decoded) return next()
    }

    if (hrToken) {
        const decoded = tryVerify(hrToken, true)
        if (decoded) return next()
    }

    res.clearCookie("EMtoken")
    res.clearCookie("HRtoken")
    return res.status(403).json({ success: false, message: "unauthenticated access", gologin: true })
}
