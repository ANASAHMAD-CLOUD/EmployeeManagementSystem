import jwt from 'jsonwebtoken'

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
};

export const GenerateJwtTokenAndSetCookiesEmployee = (res, EMid, EMrole, ORGID) => {
    const token = jwt.sign({ EMid, EMrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("EMtoken", token, cookieOptions)

    return token
}

export const GenerateJwtTokenAndSetCookiesHR = (res, HRid, HRrole, ORGID) => {
    const token = jwt.sign({ HRid, HRrole, ORGID }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("HRtoken", token, cookieOptions)

    return token
}