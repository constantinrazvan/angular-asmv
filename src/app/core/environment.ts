import { Volunteer } from "./models/Volunteer";

export const authEnvironment = {
    login: "http://localhost:5235/api/Auth/login",
    register: "http://localhost:5235/api/Auth/register",
    getProfile: (id: number) => `http://localhost:5235/api/Auth/profile/${id}`
};

export const becomeVolunteersEnvironment = {
    getOneVolunteer: (id: number) => `http://localhost:5235/api/BecomeVolunteers/volunteer/${id}`,
    addVolunteerApplication: "http://localhost:5235/api/BecomeVolunteers/new-application",
    getAllVolunteers: "http://localhost:5235/api/BecomeVolunteers/all-volunteers",
    updateVolunteer: (id: number) => `http://localhost:5235/api/BecomeVolunteers/update/${id}`,
    markAsRead: (id: number) => `http://localhost:5235/api/BecomeVolunteers/mark-as-read/${id}`,
    countRequests: () => 'http://localhost:5235/countRequests',
    deleteRequest: (id: number) => `http://localhost:5235/api/BecomeVolunteers/delete/${id}`
};

export const projectEnvironment = {
    getAllProjects: 'http://localhost:5235/api/Projects/all-projects',
    getProjectById: (id: number) => `http://localhost:5235/api/projects/project/${id}`,
    newProject: 'http://localhost:5235/api/Projects/new-project',
    updateProject: (id: number) => `http://localhost:5235/api/Projects/update-project/${id}`,
    deleteProject: (id: number) => `http://localhost:5235/api/Projects/delete-project/${id}`,
    countProjects: 'http://localhost:5235/api/Projects/count-projects',
    getProjectImage: (id: number) => `http://localhost:5235/api/Projects/project/${id}/image`
};

export const messageEnvironment = {
    addMessage: 'http://localhost:5235/api/Message/new-message',
    getMessageById: (id: number) => `http://localhost:5235/api/Message/message/${id}`,
    getAllMessages: 'http://localhost:5235/api/Message/all-messages',
    countMessages: () => 'http://localhost:5235/countMessages', // Updated to not require an id
    markAsRead: (id: number) => `http://localhost:5235/api/Message/markAsRead/${id}`
};

export const usersEnvironment = {
    getUser: (id: number) => `http://localhost:5235/api/Users/user/${id}`,
    getAllUsers: 'http://localhost:5235/api/Users/all-users',
    deleteUser: (id: number) => `http://localhost:5235/api/Users/delete-user/${id}`,
    updateEmail: (id: number) => `http://localhost:5235/api/Users/update-email/${id}`,
    updatePassword: (id: number) => `http://localhost:5235/api/Users/update-password/${id}`,
    updateUser: (id: number) => `http://localhost:5235/api/Users/update-user/${id}`,
    countUsers: 'http://localhost:5235/api/Users/users-count'
};

export const volunteerEnvironment = {
    addVolunteer: () => "http://localhost:5235/new-volunteer",
    getAllVolunteers: () => "http://localhost:5235/volunteers", // Ensure this matches
    getVolunteer: (id: number) => `http://localhost:5235/volunteer/${id}`,
    updateVolunteer: (id: number) => `http://localhost:5235/update-volunteer/${id}`,
    deleteVolunteer: (id: number) => `http://localhost:5235/delete-volunteer/${id}`
};

export const statistics = { 
    countUsers: 'http://localhost:5235/api/Users/users-count',
    countMessages: 'http://localhost:5235/countMessages', // Updated to not require an id
    countProjects: 'http://localhost:5235/api/Projects/count-projects',
    countRequests: 'http://localhost:5235/countRequests', // Updated to not require an id
    countVolunteers: 'http://localhost:5235/count-volunteers'
}
