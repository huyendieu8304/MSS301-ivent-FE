const PATH_URL = "/api/v1";
const PATH_ACCOUNT_SERVICE_URL = "/api/v1/account";

const PATH_EVENT_PUBLIC_URL = PATH_URL + "/event/public";
const PATH_ADMIN = PATH_URL + "/admin";
const PATH_CATEGORY = PATH_URL + "/event/category";
const PATH_MY_EVENT = PATH_URL + "/event/my-event";
const PATH_PAYMENT = PATH_URL + "/payment";
const PATH_OPERATOR = PATH_URL + "/event/operator";

export const url = {
    //ACCOUNT SERVICE
    registerUser: PATH_ACCOUNT_SERVICE_URL + "/register-user",
    validateEmailToken: PATH_ACCOUNT_SERVICE_URL + "/validate-email-token",
    resendEmailToken: PATH_ACCOUNT_SERVICE_URL + "/resend-validate-email-token",
    userProfile: PATH_ACCOUNT_SERVICE_URL + "/profile",
    updateProfile: PATH_ACCOUNT_SERVICE_URL + "/update-profile",
    forgotPasswordRequest: PATH_ACCOUNT_SERVICE_URL + "/forgot-password",
    setPassword: PATH_ACCOUNT_SERVICE_URL + "/set-password",
    changePassword: PATH_ACCOUNT_SERVICE_URL + "/change-password",
    // ADMIN
    adminAccount: ( page = 0, size = 10)=> `${PATH_ACCOUNT_SERVICE_URL}/account?page=${page}&size=${size}`,
    getRoleStatistic: PATH_ACCOUNT_SERVICE_URL + "/by-role",
    getStatusAccountStatistic: PATH_ACCOUNT_SERVICE_URL + "/by-status",
    getOrganizerStatistic: PATH_ACCOUNT_SERVICE_URL + "/organizer-event-count",
    getPaymentStatistic: PATH_ACCOUNT_SERVICE_URL + "/total-payment-by-account",
    createAdminAccount: PATH_ACCOUNT_SERVICE_URL + "/create",
    banUser:  PATH_ACCOUNT_SERVICE_URL +"/ban",
    getUserAccounts: PATH_ACCOUNT_SERVICE_URL + "/users-ban-list",

    //KEYCLOAK
    getUserTokenFromKeycloak: "http://localhost:7000/realms/master/protocol/openid-connect/token",
    logoutKeycloak: "http://localhost:7000/realms/master/protocol/openid-connect/logout",



    //EVENT - USER dùng
    searchEvent: PATH_EVENT_PUBLIC_URL + "/search",
    getMyEvents: (page = 0, size = 10) =>
        `${PATH_URL}/event/my_events?page=${page}&size=${size}`,
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
    getEventAndTicketTypeDetails: (id) => PATH_URL+`/event/event-and-ticket-details/${id}`,
    createEvent: PATH_MY_EVENT + "/create",
    getMyTickets: (accountId, page = 0, size = 10) =>
        `${PATH_URL}/ticket/my_tickets/${accountId}?page=${page}&size=${size}`,
    getTicketDetail: (paymentId) =>
        `${PATH_URL}/ticket/detail/${paymentId}`,
    getMyEventDetail: (id) => `${PATH_MY_EVENT}/${id}`,
    updateMyEventDetail: PATH_MY_EVENT,

    //EVENT - OPERATOR  
    operatorEvent: (page = 0, size = 10)=> `${PATH_OPERATOR}/event?page=${page}&size=${size}`,
    operatorEventDetails: (eventId) => PATH_OPERATOR +`/${eventId}`,
    pendingEvent: ( page = 0, size = 10) => `${PATH_OPERATOR}/approve?page=${page}&size=${size}`,
    updateEventStatus: (eventId, status) => PATH_OPERATOR + `/${eventId}/status?status=${status}`,
    getProvinceStatistic: PATH_OPERATOR + "/by-province",
    getStatusStatistic: PATH_OPERATOR + "/by-status",
    getMonthStatistic: PATH_OPERATOR + "/by-month",
    getCategoryStatistic: PATH_OPERATOR + "/by-category",

    //PAYMENT
    payment: PATH_PAYMENT+"/vn-pay",
    getPaymentDetails: (txnRefCode) => PATH_PAYMENT + `/get-payment-details/${txnRefCode}`,

    //COMMON
    getCategories: PATH_CATEGORY + "/",
    getHomePageData: PATH_EVENT_PUBLIC_URL + `/home`,
};