export const CONFIG = {
    api_endpoint: 'https://icafe-api-staging.herokuapp.com',
    api_prefix: 'app',

    API:{
        AUTH:{
            LOGIN: '/auth/login',
            SIGNUP: '/auth/signup'
        },
        USER:{
            INFO_USER: '/user_profile',
            CHANGE_PASSWORD: '/update_password',
            UPDATE_USER: '/update_user',
            UPDATE_PHOTO: '/upload_photo',

            SEND_CODE:`/reset_password/send_code`,
            CHECK_CODE:`/reset_password/check_code`,
            RESET_PASSWORD:`/reset_password/reset_password`,
        },
        PRODUCT: {
            GETSEARCH: (search) => `/products?name=${search}`,
        },

        PRODUCT_GROUP: {
            GET: `/admin/product_groups/list_group`,
        },
        PROMOTION: {
            GETLISTS: `/promotions`,
            GETLISTHIGHTLIGHTL: `/promotions/hightlight`,
            GETBYID: (code) => `/promotions/${code}`,
            CREATEPRO: `/orders/scan_price`,

            GETSLIDES: `/slides/main_slide`,
        },
        ORDER: {
            CREATEORDER: `/orders`,
            ORDERBYID:(id) => `/orders/${id}`,
            HISTORY: `/orders/order_history`,
            DELETE: (id) => `/orders/${id}`,
        },
        BOOKING:{
            CREATEBOOKING: `/bookings`,
            HISTORY: `/bookings/booking_history`,
            SERVICELIST: (type) => `/bookings/service_list?booking_type=${type}`
        },
        QUESTION:{
            GETQUESTONBYTOPIC: `/questions/by_topic`,
            GETQUESTIONBYLEVEL: `/questions/by_level`,

            GETQUESTIONTOPIC: (id) => `/questions/${id}`,
            GETQUESTIONLEVEL: (id) => `/questions/level?level=${id}`,

            GETUSERPOINT: `/score_accumulation`,
            BUYMORETURN: `/score_accumulation/buy_more`,

            CHECKING: `/questions/checking`,
            TOTAL_SCORE: `/questions/total_score`,
            
            LOSE:`/questions/lose`,

        },

        NEWS: {
            GETNEWS: `/news`,
            GETNEWSBYID: (id) => `/news/${id}`,
        },

        USER_POINT: {
            GETUSERPOINT: `/score_accumulation`,
        }
    },

    ROUTER:{
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register'
        },
        MENU:{
            MAIN_MENU:'/main-menu'
        },
        DETAIL_USER:{
            INFO_USER: '/info-user',
            CHANGE_PASSWORD: '/change_password'
        }
    }
}
