import Axios from 'axios'
const baseURL = process.env.NODE_ENV ==='production' ? 'api/v1' : 'http://localhost:2000/api/v1'
export const api =  Axios.create({
    baseURL
})
