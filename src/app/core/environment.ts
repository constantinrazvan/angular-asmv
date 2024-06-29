export const environment = {
    production: false,

    api_base_url: 'http://localhost:8080/api', 

    login_endpoint: '/auth/login', 
    register_endpoint: '/auth/register', 

    becomevolunteer_endpoint: '/volunteer/becomeVolunteer', 
    volunteer_list_endpoint: '/volunteer/getVolunteerList',
    volunteer_get_data_endpoint: '/volunteer/getVolunteerData',
    update_volunteer_endpoint: '/volunteer/updateVolunteer',
    delete_volunteer_endpoint: '/volunteer/deleteVolunteer',

    contact_send_endpoint: '/contact/send',
    contact_get_endpoint: '/contact/get',
    contact_get_by_id_endpoint: '/contact/getById',
}