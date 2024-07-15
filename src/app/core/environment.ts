export const environment = {
    production: false,

    api_base_url: 'http://localhost:9090/api', 

    login_endpoint: '/auth/login', 
    register_endpoint: '/auth/register', 

    profile_user_endpoint: '/api/user',

    becomevolunteer_endpoint: '/volunteers/newVolunteer', 
    volunteer_list_endpoint: '/volunteers/getVolunteerList',
    volunteer_get_data_endpoint: '/volunteers/getVolunteerData',
    update_volunteer_endpoint: '/volunteers/updateVolunteer',
    delete_volunteer_endpoint: '/volunteers/deleteVolunteer',

    contact_send_endpoint: '/contact/send',
    contact_get_endpoint: '/contact/get',
    contact_get_by_id_endpoint: '/contact/getById',
}