import axios from 'axios'
const DjangoApi = axios.create({
   // baseURL:'http://localhost:8000/'
    baseURL:'https://backend-vuejs-django.herokuapp.com/'
})
export default DjangoApi