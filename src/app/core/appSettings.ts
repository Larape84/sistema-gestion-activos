import { EndPoints } from "./end-points"

export const AppSettings = {


    singIn : {
        crearUsuario : EndPoints.uri('api/auth/user/'),
        refreshToken: EndPoints.uri('api/auth/user/refresh-token')
    }




}
