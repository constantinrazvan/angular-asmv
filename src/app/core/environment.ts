const baseUrl = 'https://localhost:5400/api';

export const authEnvironment = { 
    loginUrl: baseUrl + '/auth/login',
    registerUrl: baseUrl + '/auth/register'
}

export const projectsEnvironment = {
    getProjects: baseUrl + '/projects', 
    getProject: baseUrl + '/projects/', 
    addProject: baseUrl + '/projects/newProject',
    deleteProject: baseUrl + '/projects/',
    getCount: baseUrl + '/projects/count',
    updateProject: baseUrl + '/projects/' 
}

export const volunteersEnvironement = { 
    getVolunteers: baseUrl + '/volunteers',
    getVolunteer: baseUrl + '/volunteers/',
    addVolunteer: baseUrl + '/volunteers/newVolunteer',
    updateVolunteer: baseUrl + '/volunteers/',
    deleteVolunteer: baseUrl + '/volunteers/',
    getCount: baseUrl + '/volunteers/count'
}

export const becomeVolunteerEnvironment = { 
    getRequests: baseUrl + '/becomeVolunteers',
    getRequest: baseUrl + '/becomeVolunteers/',
    addRequest: baseUrl + '/becomeVolunteers/newBecomeVolunteer',
    deleteRequest: baseUrl + '/becomeVolunteers/',
    getCount: baseUrl + '/becomeVolunteers/count'
}

export const messageEnvironment = {
    getMessages: baseUrl + '/messages',
    getMessage: baseUrl + '/messages/',
    addMessage: baseUrl + '/messages/newMessage',
    deleteMessage: baseUrl + '/messages/',
    getCount: baseUrl + '/messages/count',
    updateMessage: baseUrl + '/messages/'
}