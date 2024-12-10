import { Volunteer } from "./models/Volunteer";

export const authEnvironment = {
    login: "http://asmv-ong.ro:5000/api/Auth/login",
    register: "http://asmv-ong.ro:5000/api/Auth/register",
    getProfile: (id: number) => `http://asmv-ong.ro:5000/api/Auth/profile/${id}`
};

export const becomeVolunteersEnvironment = {
    getOneVolunteer: (id: number) => `http://asmv-ong.ro:5000/api/BecomeVolunteers/volunteer/${id}`,
    addVolunteerApplication: "http://asmv-ong.ro:5000/api/BecomeVolunteers/new-application",
    getAllVolunteers: "http://asmv-ong.ro:5000/api/BecomeVolunteers/all-volunteers",
    updateVolunteer: (id: number) => `http://asmv-ong.ro:5000/api/BecomeVolunteers/update/${id}`,
    markAsRead: (id: number) => `http://asmv-ong.ro:5000/api/BecomeVolunteers/mark-as-read/${id}`,
    countRequests: () => 'http://asmv-ong.ro:5000/countRequests',
    deleteRequest: (id: number) => `http://asmv-ong.ro:5000/api/BecomeVolunteers/delete/${id}`
};

export const projectEnvironment = {
    getAllProjects: 'http://asmv-ong.ro:5000/api/Projects/all-projects',
    getProjectById: (id: number) => `http://asmv-ong.ro:5000/api/Projects/project/${id}`,
    newProject: 'http://asmv-ong.ro:5000/api/Projects/new-project',
    updateProject: (id: number) => `http://asmv-ong.ro:5000/api/Projects/update-project/${id}`,
    deleteProject: (id: number) => `http://asmv-ong.ro:5000/api/Projects/delete-project/${id}`,
    countProjects: 'http://asmv-ong.ro:5000/api/Projects/count-projects',
    getProjectImage: (id: number) => `http://asmv-ong.ro:5000/api/Projects/project/${id}/image`
};

export const messageEnvironment = {
    addMessage: 'http://asmv-ong.ro:5000/api/Message/new-message',
    getMessageById: (id: number) => `http://asmv-ong.ro:5000/api/Message/message/${id}`,
    getAllMessages: 'http://asmv-ong.ro:5000/api/Message/all-messages',
    countMessages: () => 'http://asmv-ong.ro:5000/countMessages', // Updated to not require an id
    markAsRead: (id: number) => `http://asmv-ong.ro:5000/api/Message/markAsRead/${id}`
};

export const usersEnvironment = {
    getUser: (id: number) => `http://asmv-ong.ro:5000/api/Users/user/${id}`,
    getAllUsers: 'http://asmv-ong.ro:5000/api/Users/all-users',
    deleteUser: (id: number) => `http://asmv-ong.ro:5000/api/Users/delete-user/${id}`,
    updateEmail: (id: number) => `http://asmv-ong.ro:5000/api/Users/update-email/${id}`,
    updatePassword: (id: number) => `http://asmv-ong.ro:5000/api/Users/update-password/${id}`,
    updateUser: (id: number) => `http://asmv-ong.ro:5000/api/Users/update-user/${id}`,
    countUsers: 'http://asmv-ong.ro:5000/api/Users/users-count'
};

export const volunteerEnvironment = {
    addVolunteer: () => "http://asmv-ong.ro:5000/new-volunteer",
    getAllVolunteers: () => "http://asmv-ong.ro:5000/volunteers", // Ensure this matches
    getVolunteer: (id: number) => `http://asmv-ong.ro:5000/volunteer/${id}`,
    updateVolunteer: (id: number) => `http://asmv-ong.ro:5000/update-volunteer/${id}`,
    deleteVolunteer: (id: number) => `http://asmv-ong.ro:5000/delete-volunteer/${id}`
};

export const statistics = { 
    countUsers: 'http://asmv-ong.ro:5000/api/Users/users-count',
    countMessages: 'http://asmv-ong.ro:5000/countMessages', // Updated to not require an id
    countProjects: 'http://asmv-ong.ro:5000/api/Projects/count-projects',
    countRequests: 'http://asmv-ong.ro:5000/countRequests', // Updated to not require an id
    countVolunteers: 'http://asmv-ong.ro:5000/count-volunteers'
}
