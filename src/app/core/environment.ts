export const environment = {
    production: false,

    api_base_url: 'http://localhost:7133/api/', 

    login_endpoint: 'auth/login', 
    register_endpoint: 'auth/register', 

    becomeVolunteer_getAllRequests: 'becomevolunteer/getAllRequests',
    becomeVolunteer_becomeVolunteer: 'becomevolunteer/becomeVolunteer',
    becomeVolunteer_getRequestById: 'becomevolunteer/request',

    blog_getAll: 'blogs/getAllBlogs',
    blog_getById: 'blogs/getBlog/',                                         // id
    blog_newBlog : 'blogs/newBlog',
    blog_updateBlog: 'blogs/updateBlog',                                    // id
    blog_deleteBlog: 'blogs/deleteBlog',                                    // id

    contact_All: 'contact/allMessages',
    contact_send: 'contact/addMesage',
    contact_getById: 'contact/getMessage',                                 // id

    projects_getAll: 'projects/getAllProjects',
    projects_getById: 'projects/getProjectById',                            // id
    project_newProject : 'projects/newProject',
    project_updateProject: 'projects/updateProject',                        // id
    project_deleteProject: 'projects/deleteProject',                        // id

    volunteers_newVolunteer: 'volunteers/newVolunteer',
    volunteers_getAll: 'volunteers/volunteers',
    volunteers_getById: 'volunteers/getVolunteer',                          // id
    volunteers_updateVolunteer: 'volunteers/updateVolunteer',               // id
    volunteers_deleteVolunteer: 'volunteers/deleteVolunteer',               // id

    users_getAllUser: 'users/getAllUsers',
    users_getById: 'users/getUser',                                         // id
    users_updateUser: 'users/updateUser',                                   // id
    users_deleteUser: 'users/deleteUser',                                   // id
}