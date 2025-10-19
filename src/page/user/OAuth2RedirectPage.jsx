import {useLocation, useNavigate} from "react-router";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useEffect, useState} from "react";
import {messageService} from "../../service/MessageService.jsx";
import {CONSTANTS, MESSAGE_TYPES} from "../../common/Constant.jsx";
import Messages from "../../common/Message.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";

const OAuth2RedirectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const error = params.get("error");

        if (accessToken && refreshToken) {
            login(accessToken, refreshToken);
            navigate("/");
            messageService.showMessage(Messages.MSG_I_00001, MESSAGE_TYPES.INFO);
            accountSettingApi.userProfile(getProfileSuccess, getProfileFail);
        } else if (error) {
            console.log(error);
            navigate("/login");
            messageService.showMessage(Messages.MSG_E_00007, MESSAGE_TYPES.ERROR);
        }
    }, [location, navigate]);
    const getProfileSuccess = (data) => {
        const userProfile = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            role: data.role,
            avatarUrl: data.avatarUri
        };
        localStorage.setItem(CONSTANTS.USER_PROFILE, JSON.stringify(userProfile));
        messageService.showMessage(Messages.MSG_I_00003, MESSAGE_TYPES.INFO);
    }
    const getProfileFail = (error) => {
        console.log(error);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (
        <>
            <LoadingComponent/>
        </>
    )
}
export default OAuth2RedirectPage;