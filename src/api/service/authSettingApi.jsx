import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";

const authSettingApi = {
    login: (body, successHandler, errorHandler) =>
        callApi(
            url.getUserTokenFromKeycloak,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
            false,
            true
        ),
    logout: (body, successHandler, errorHandler) =>
        callApi(
            url.logoutKeycloak,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
            false,
            true
        ),
};

export default authSettingApi;