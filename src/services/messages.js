import * as api from '../api'


export const getMessages =async(model, data)=>{
    // to do: 写一个根据模型名字映射成路由的函数
    
    const modelName = 'Qwen_05b_chat'

    try {
        console.log(`前段传过来的数据: `)
        console.log(data)
        const resData = await api.fetchMessages(model,data);
        //const resData = await api.testApi();

        return JSON.stringify(resData.data) 
    } catch (error) {
        console.log(error)
        return JSON.stringify({message:error.message}) 
    }
}

export const sendSystemPrompt = async(model, data)=>{
    const modelName = 'Qwen_05b_chat'

    try {
        console.log(`前段传过来的数据: `)
        console.log(data)
        const resData = await api.sendSystemPrompt(model=modelName,data);
        //const resData = await api.testApi();

        return JSON.stringify(resData.data) 
    } catch (error) {
        console.log(error)
        return JSON.stringify({message:error.message}) 
    }
}