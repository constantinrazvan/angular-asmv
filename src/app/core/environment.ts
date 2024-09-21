export const authEnvironment = {
    login: "http://localhost:5235/api/auth/login",
    register: "http://localhost:5235/api/auth/register",
    getProfile: (id: number) => `http://localhost:5235/api/auth/profile/${id}`
};

export const becomeVolunteersEnvironment = {
    getOneVolunteer: (id: number) => `http://localhost:5235/api/becomevolunteers/volunteer/${id}`,
    addVolunteerApplication: "http://localhost:5235/api/becomevolunteers/new-application",
    getAllVolunteers: "http://localhost:5235/api/becomevolunteers/all-volunteers",
    updateVolunteer: (id: number) => `http://localhost:5235/api/becomevolunteers/update/${id}`,
    markAsRead: (id: number) => `http://localhost:5235/api/becomevolunteers/mark-as-read/${id}`,
    countRequests: () => 'http://localhost:5235/api/becomevolunteers/countRequests' // Updated to not require an id
};

export const projectEnvironment = {
    getAllProjects: 'http://localhost:5235/api/projects/all-projects',
    getProjectById: (id: number) => `http://localhost:5235/api/projects/project/${id}`,
    newProject: 'http://localhost:5235/api/projects/new-project',
    updateProject: (id: number) => `http://localhost:5235/api/projects/update-project/${id}`,
    deleteProject: (id: number) => `http://localhost:5235/api/projects/delete-project/${id}`,
    countProjects: 'http://localhost:5235/api/projects/projects-count'
};

export const messageEnvironment = {
    addMessage: 'http://localhost:5235/api/message/new-message',
    getMessageById: (id: number) => `http://localhost:5235/api/message/message/${id}`,
    getAllMessages: 'http://localhost:5235/api/message/all-messages',
    countMessages: () => 'http://localhost:5235/api/messages/countMessages', // Updated to not require an id
    markAsRead: (id: number) => `http://localhost:5235/api/Message/markAsRead/${id}`
};

export const usersEnvironment = {
    getUser: (id: number) => `http://localhost:5235/api/users/user/${id}`,
    getAllUsers: 'http://localhost:5235/api/users/all-users',
    deleteUser: (id: number) => `http://localhost:5235/api/users/delete-user/${id}`,
    updateEmail: (id: number) => `http://localhost:5235/api/users/update-email/${id}`,
    updatePassword: (id: number) => `http://localhost:5235/api/users/update-password/${id}`,
    updateUser: (id: number) => `http://localhost:5235/api/users/update-user/${id}`,
    countUsers: 'http://localhost:5235/api/users/users-count'
};

export const volunteerEnvironment = {
    addVolunteer: () => "http://localhost:5235/new-volunteer",
    getAllVolunteers: () => "http://localhost:5235/api/volunteers", // Ensure this matches
    getVolunteer: (id: number) => `http://localhost:5235/api/volunteers/volunteer/${id}`,
    updateVolunteer: (id: number) => `http://localhost:5235/api/volunteers/update-volunteer/${id}`,
    deleteVolunteer: (id: number) => `http://localhost:5235/api/volunteers/delete-volunteer/${id}`
};

export const statistics = { 
    countUsers: 'http://localhost:5235/api/Users/users-count',
    countMessages: 'http://localhost:5235/countMessages', // Updated to not require an id
    countProjects: 'http://localhost:5235/api/Projects/count-projects',
    countRequests: 'http://localhost:5235/countRequests', // Updated to not require an id
    countVolunteers: 'http://localhost:5235/count-volunteers'
}
