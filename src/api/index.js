import { data } from 'autoprefixer'
import axios from 'axios'

// 'http://198.18.0.1:2001'
const TESTAPI = axios.create({baseURL:'https://shikimori.one/api'})

const API = axios.create({
    baseURL:'http://10.12.5.216:2001',
    // headers : {
    //     //Origin是一个安全头，报错：Refused to set unsafe header "Origin"
    //     'Origin': 'http://10.12.5.216:2001'
        
    // }
})

//export const fetchMessages=(query)=> API.get('/animes?limit=8&order=popularity', query)

export const fetchMessages=(model, data)=> API.post(`/${model}`, data, {
    headers:{
        'Content-Type': 'application/json'
    }
});

export const testApi =()=>API.get("/testRoute")
//export const fetchMessages=(model, query)=> API.get(`/${model}?limit=1&order=popularity`, query)

//animes

export const sendSystemPrompt=(model, data)=> API.post(`/${model}`, data)