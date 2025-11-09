import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import authSettingApi from "../api/service/authSettingApi.jsx";
import {useNavigate} from "react-router";
import {getUserDataInLocalStorage} from "../common/CommonFunction.jsx";
import {CLIENT_ID_KEYCLOAK, CLIENT_SECRET_KEYCLOAK, CONSTANTS, ROLES} from "../common/Constant.jsx";

const AvatarMenu = ({setIsLoading}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {logout} = useAuth();
    const {avatarUrl, role} = getUserDataInLocalStorage() || {};
    const theme = useTheme();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        const body = {
            client_id: CLIENT_ID_KEYCLOAK,
            client_secret: CLIENT_SECRET_KEYCLOAK,
            refresh_token: localStorage.getItem(CONSTANTS.REFRESH_TOKEN),
        }
        authSettingApi.logout(body, LogoutSuccess, LogoutFail);
        setIsLoading(true);
    }

    const LogoutSuccess = (data) => {
        logout();
        console.log(data);
    }

    const LogoutFail = (e) => {
        console.log(e);
        navigate("/error", {
            state: {
                message: e.response.data.message,
                code: e.status,
            }
        })
    }

    return (
        <>
            <Box sx={{flexGrow: 0}}>
                <Tooltip title="Tùy chọn" arrow>
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar
                            alt="user avatar"
                            src={avatarUrl}
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {role === ROLES.USER ? (
                        <>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                navigate("/my-bought-tickets");
                            }}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    color: theme.palette.primary.main,
                                    margin: "0 6px"
                                }}>
                                    Vé đã mua
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                navigate("/organizer/my-events");
                            }}>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: theme.palette.primary.main,
                                        margin: "0 6px"
                                    }}
                                >
                                    Sự kiện của tôi
                                </Typography>
                            </MenuItem>
                        </>
                    )
                        :(
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                if(role === ROLES.ADMIN){
                                    navigate("/admin/statistic");
                                }
                                if(role === ROLES.OPERATOR){
                                    navigate("/operator");
                                }
                            }}>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: theme.palette.primary.main,
                                        margin: "0 6px"
                                    }}
                                >
                                    Dashboard
                                </Typography>
                            </MenuItem>
                        )
                    }
                    <MenuItem onClick={() => navigate("/profile")}>
                        <Typography sx={{
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                            margin: "0 6px"
                        }}>
                            Tài khoản
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/change-password")}>
                        <Typography sx={{
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                            margin: "0 6px"
                        }}>
                            Đổi mật khẩu
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Typography sx={{
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                            margin: "0 6px"
                        }}>
                            Đăng xuất
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    )
}

export default AvatarMenu;