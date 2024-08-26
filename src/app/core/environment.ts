export const authEnvironement = {
    login: "http://localhost:8080/api/auth/login",
    register: "http://localhost:8080/api/auth/register"
}

export const becomeVolunteerEnvironment = {
    add: "http://localhost:8080/api/become-volunteer/new",
    getAll: "http://localhost:8080/api/become-volunteer/all",
    getOne: "http://localhost:8080/api/become-volunteer/",
    delete: "http://localhost:8080/api/become-volunteer/delete/",
    update: "http://localhost:8080/api/become-volunteer/update/",
    markAsRead: "http://localhost:8080/api/become-volunteer/markAsRead/",
}

export const messageEnvironment = {
    add: "http://localhost:8080/api/messages/add",
    getAll: "http://localhost:8080/api/messages/all",
    update: "http://localhost:8080/api/messages/",
    delete: "http://localhost:8080/api/messages/delete/", 
    getOne: "http://localhost:8080/api/messages/one/", 
    markAsRead: "htt://localhost:8080/api/messages/markAsRead/"

}

export const projectEnvironment = { 
    add: "http://localhost:8080/api/proiecte/add",
    getOne: "http://localhost:8080/api/proiecte/",
    getAll: "http://localhost:8080/api/proiecte/all",
    update: "http://localhost:8080/api/proiecte/update/",
    delete: "http://localhost:8080/api/proiecte/",
    getImage: "http://localhost:8080/api/proiecte", // /{id}/image
}

export const userEnvironment = {
    getAll: "http://localhost:8080/api/users/all",
    getOne: "http://localhost:8080/api/users/one/",
    deleteOne: "http://localhost:8080/api/users/delete/",
}

export const volunteerEnvironmet = {
    add: "http://localhost:8080/api/volunteers/add",
    getAll: "http://localhost:8080/api/volunteers/all",
    getOne: "http://localhost:8080/api/volunteers/",
    delete: "http://localhost:8080/api/volunteers/delete/",
    update: "http://localhost:8080/api/volunteers/update/"
}

export const countEnvironment = { 
    getMessages: "http://localhost:8080/api/messages/count",
    getVolunteers: "http://localhost:8080/api/volunteers/count",
    getProjects: "http://localhost:8080/api/proiecte/count",
    getBecomeVolunteers: "http://localhost:8080/api/become-volunteer/count", 
    getUsers: "http://localhost:8080/api/users/count"
}