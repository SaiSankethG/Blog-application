export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = ()=> ({
    type: "LOGIN_FAILURE"
})

export const LogOut = () => ({
    type: "LOGOUT"
})

export const UpdateStart = () => ({
    type: "UPDATE_START"
})

export const UpdateSuccess = () => ({
    type: "UPDATE_SUCCESS"
})

export const UpdateFailure = () => ({
    type: "UDPATE_FAILURE"
})