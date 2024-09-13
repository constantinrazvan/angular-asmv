export const authEnvironement = {
    login: "http://localhost:9090/api/auth/login",
    register: "http://localhost:9090/api/auth/register"
}

export const becomeVolunteerEnvironment = {
    add: "http://localhost:9090/api/become-volunteer/new",
    getAll: "http://localhost:9090/api/become-volunteer/all",
    getOne: "http://localhost:9090/api/become-volunteer/",
    delete: "http://localhost:9090/api/become-volunteer/delete/",
    update: "http://localhost:9090/api/become-volunteer/update/",
    markAsRead: "http://localhost:9090/api/become-volunteer/markAsRead/",
}

export const messageEnvironment = {
    add: "http://localhost:9090/api/messages/add",
    getAll: "http://localhost:9090/api/messages/all",
    update: "http://localhost:9090/api/messages/",
    delete: "http://localhost:9090/api/messages/delete/", 
    getOne: "http://localhost:9090/api/messages/one/", 
    markAsRead: "http://localhost:9090/api/messages/markAsRead/"
}

export const projectEnvironment = { 
    add: "http://localhost:9090/api/proiecte/add",
    getOne: "http://localhost:9090/api/proiecte/",
    getAll: "http://localhost:9090/api/proiecte/all",
    update: "http://localhost:9090/api/proiecte/",
    delete: "http://localhost:9090/api/proiecte/",
    getImage: "http://localhost:9090/api/proiecte", 
}

export const userEnvironment = {
    getAll: "http://localhost:9090/api/users/all",
    getOne: "http://localhost:9090/api/users/one/",
    deleteOne: "http://localhost:9090/api/users/delete/",
    changePassword: "http://localhost:9090/api/users/changepassword/",
    changeEmail: "http://localhost:9090/api/users/changeemail/",
    update: "http://localhost:9090/api/users/update-user/",
    userChangeEmail: "http://localhost:9090/api/users/userChangeEmail/",
    userChangePassword: "http://localhost:9090/api/users/userChangePassword/"
}

export const volunteerEnvironmet = {
    add: "http://localhost:9090/api/volunteers/add",
    getAll: "http://localhost:9090/api/volunteers/all",
    getOne: "http://localhost:9090/api/volunteers/",
    delete: "http://localhost:9090/api/volunteers/delete/",
    update: "http://localhost:9090/api/volunteers/update/"
}

export const countEnvironment = { 
    getMessages: "http://localhost:9090/api/messages/count",
    getVolunteers: "http://localhost:9090/api/volunteers/count",
    getProjects: "http://localhost:9090/api/proiecte/count",
    getBecomeVolunteers: "http://localhost:9090/api/become-volunteer/count", 
    getUsers: "http://localhost:9090/api/users/count"
}

export const adminEnvironment = {
    changeEmailUser: "http://localhost:9090/api/auth/forgot-password"
}