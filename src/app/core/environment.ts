export const authEnvironement = {
    login: "https://89.40.72.64:8080/api/auth/login",
    register: "https://89.40.72.64:8080/api/auth/register"
}

export const becomeVolunteerEnvironment = {
    add: "https://89.40.72.64:8080/api/become-volunteer/new",
    getAll: "https://89.40.72.64:8080/api/become-volunteer/all",
    getOne: "https://89.40.72.64:8080/api/become-volunteer/",
    delete: "https://89.40.72.64:8080/api/become-volunteer/delete/",
    update: "https://89.40.72.64:8080/api/become-volunteer/update/",
    markAsRead: "https://89.40.72.64:8080/api/become-volunteer/markAsRead/",
}

export const messageEnvironment = {
    add: "https://89.40.72.64:8080/api/messages/add",
    getAll: "https://89.40.72.64:8080/api/messages/all",
    update: "https://89.40.72.64:8080/api/messages/",
    delete: "https://89.40.72.64:8080/api/messages/delete/", 
    getOne: "https://89.40.72.64:8080/api/messages/one/", 
    markAsRead: "https://89.40.72.64:8080/api/messages/markAsRead/"
}


export const projectEnvironment = { 
    add: "https://89.40.72.64:8080/api/proiecte/add",
    getOne: "https://89.40.72.64:8080/api/proiecte/",
    getAll: "https://89.40.72.64:8080/api/proiecte/all",
    update: "https://89.40.72.64:8080/api/proiecte/",
    delete: "https://89.40.72.64:8080/api/proiecte/",
    getImage: "https://89.40.72.64:8080/api/proiecte", // /{id}/image
}

export const userEnvironment = {
    getAll: "https://89.40.72.64:8080/api/users/all",
    getOne: "https://89.40.72.64:8080/api/users/one/",
    deleteOne: "https://89.40.72.64:8080/api/users/delete/",
    changePassword: "https://89.40.72.64:8080/api/users/changepassword/",
    changeEmail: "https://89.40.72.64:8080/api/users/changeemail/",
    update: "https://89.40.72.64:8080/api/users/update-user/",
    userChangeEmail: "https://89.40.72.64:8080/api/users/userChangeEmail/",
    userChangePassword: "https://89.40.72.64:8080/api/users/userChangePassword/"
}

export const volunteerEnvironmet = {
    add: "https://89.40.72.64:8080/api/volunteers/add",
    getAll: "https://89.40.72.64:8080/api/volunteers/all",
    getOne: "https://89.40.72.64:8080/api/volunteers/",
    delete: "https://89.40.72.64:8080/api/volunteers/delete/",
    update: "https://89.40.72.64:8080/api/volunteers/update/"
}

export const countEnvironment = { 
    getMessages: "https://89.40.72.64:8080/api/messages/count",
    getVolunteers: "https://89.40.72.64:8080/api/volunteers/count",
    getProjects: "https://89.40.72.64:8080/api/proiecte/count",
    getBecomeVolunteers: "https://89.40.72.64:8080/api/become-volunteer/count", 
    getUsers: "https://89.40.72.64:8080/api/users/count"
}

export const adminEnvironment = {
    changeEmailUser: "https://89.40.72.64:8080/api/auth/forgot-password"
}