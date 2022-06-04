import axios from 'axios'
const DjangoApi = axios.create({
    baseURL:'http://localhost:8000/'
})
export default DjangoApi