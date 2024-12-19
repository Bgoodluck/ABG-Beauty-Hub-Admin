const backendURL = "https://abg-beauty-hub-server.onrender.com"


export const summaryApi = {
    newsletterSubcription:{
        url: `${backendURL}/api/newsletter/register`,
        method: "POST",
        data: {
            email: String
        }
    },

    getNewsletterSubcription:{
        url: `${backendURL}/api/newsletter/list`,
        method: "GET",
        data: {
            email: String
        }
    },

    sendNewsletterSubcription:{
        url: `${backendURL}/api/newsletter/send`,
        method: "POST",
        data: {
            email: String,
            status: Boolean
        }
    },

    unSubscribeNewsletter: {
        url: `${backendURL}/api/newsletter/unsubscribe`,
        method: "POST",
        data: {
            email: String
        }
    },

    deleteSubscription:{
        url: `${backendURL}/api/newsletter/delete/:email`,
        method: "DELETE",
        data: {
            email: String
        }
    },

    updateSubscriberStatus: {
        url: `${backendURL}/api/newsletter/status/:email`,
        method: "POST",
        data: {
            email: String,
            isActive: Boolean
        }
    },

    allStaffs: {
        url: `${backendURL}/api/staff/get-staffs`,
        method: "GET"
    },

    updateStaff: {
        url: `${backendURL}/api/staff/update-staff`,
        method: "POST",
        data: {
            staffId: String,
            staffName: String,
            staffPrice: Number,
            staffDescription: String,
            staffCategory: String,
            staffBrand: String,
            staffImage: [],
            staffDiscount: Number            
        }
    },

    uploadStaff: {
        url: `${backendURL}/api/staff/upload-staff`,
        method: "POST"        
    },

    appointmentSchedule: {
        url: `${backendURL}/api/appointments/all`,
        method: "GET"
    },

    allUser: {
        url: `${backendURL}/api/user/admin/users`,
        method: "GET"
    },

    getUserDetailsId: {
        url: `${backendURL}/api/user/admin/user-details/:userId`,
        method: "GET",
        // data: {
        //     userId: String
        // }
    },

    adminAuthIn: {
        url: `${backendURL}/api/user/admin-login`,
        method: "POST",
        data: {
            email: String,
            password: String
        }
    },

    updateUser: {
        url: `${backendURL}/api/user/update-user`,
        method: "POST",
        data: {
            userId: String,
            name: String,
            email: String,            
            role: String
        }
    },

    signUp : {
        url: `${backendURL}/api/user/register`,
        method: "POST",
        data: {
            name: String,
            email: String,
            password: String,
            profilePic: String,
            role: String
        }
    },

    orderList: {
        url: `${backendURL}/api/order/list`,
        method: "GET",

    },

    orderStatus:{
        url: `${backendURL}/api/order/status`,
        method: "POST",
        data: {
            orderId: String,
            status: String
        }
    }


}