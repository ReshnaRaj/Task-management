import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
 

export function generateAccessToken(userId:string){
    return jwt.sign({id:userId},JWT_SECRET,{expiresIn: '1h'})
}
export function generateRefreshToken(userId: string) {
    return jwt.sign({id: userId}, JWT_REFRESH_SECRET, {expiresIn: '7d'})
};
export function verifyToken(token: string) {
    try {
        return jwt.verify(token,JWT_SECRET) as {id: string}
    } catch (error) {
        console.log(error)
        return null
    }
};
export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as {id: string}
    } catch (error) {
        console.log(error)
        return null
    }
};