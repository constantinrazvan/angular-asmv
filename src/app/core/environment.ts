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
    countRequests: (id: number) => 'http://localhost:5235/api/becomevolunteers/countRequests'
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
    countMessages: (id: number) => `http://localhost:5235/api/messages/countMessages`
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