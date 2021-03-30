import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:61494/api/"
})