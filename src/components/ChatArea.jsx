
import React, { useEffect, useState, useRef } from 'react'
import { copy, linkIcon, loader, arrow, clear } from '../assets'
import MessageBox from './MessageBox';

import { getMessages } from '../services/messages';

const initMessages = [
  { id: 0, text: "Message 0", fromUser: false },
  { id: 1, text: "Message 1", fromUser: true },
  { id: 2, text: "Message 2", fromUser: false },
  { id: 3, text: "Message 3", fromUser: true },
  { id: 4, text: "Message 4", fromUser: false },
  { id: 5, text: "Message 5", fromUser: true },
  { id: 6, text: "Message 6", fromUser: false },
  { id: 7, text: "Message 7", fromUser: true },
  { id: 8, text: "Message 8", fromUser: false },
  { id: 9, text: "Message 9", fromUser: true },
  { id: 10, text: "Message 10", fromUser: false }
];

const ChatArea = ({curModel}) => {
     
    
    //我的世界
    const [allMessages, setAllMessages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(()=>{
      
      //只执行一次
      if(!allMessages) setAllMessages(initMessages)
      //console.log(curModel)
    }, [curModel])

    // 用户输入的内容
    const [useInput, setUseInput] = useState('');
    const [rows, setRows] = useState(1);
    const handleInputChange = (event) => {
        setUseInput(event.target.value);
        const textareaRows = event.target.value.split('\n').length;
        setRows(textareaRows < 5 ? textareaRows : 5); // 设置最大行数为5行
    };
    
    
    const handleClear = ()=>{
      setAllMessages([])
      //setUseInput('')
      console.log(allMessages)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // 阻止默认的回车换行行为
          handleSubmit(e); // 提交表单
      }
  };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        //添加入用户的输入
        setAllMessages(prevMessages =>[...prevMessages, {
          id: allMessages.length,
          text: useInput,
          fromUser: true,
        }])
        
        //清除当前用户输入
        setUseInput('')

        
        console.log(allMessages)
        
        try {
          const data = await getMessages(curModel, {query:useInput, system_prompt:"你是一个通用智能助手"});
          
          //console.log(`后端模拟返回的数据： ${resData}`)
          
          const renderedData = JSON.parse(data)

          setAllMessages(prevMessages =>[...prevMessages, {
            id: allMessages.length+1,
            text: renderedData.response,
            fromUser: false ,
          }])
         
        } catch (error) {
          console.log(error)
        }
        
       
    }
    
    const simulateSubmit = async(e)=>{
      e.preventDefault();
      const url = 'http://10.12.5.216:2001/Qwen_05b_chat';
       // 构造请求参数
       const data = {
        query: "你好啊，我头疼",
        system_prompt: "你是一个通用智能助手"
      };
      try {
       
        // 发送 POST 请求
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          });
          const responseData = await response.json();
        
          console.log(`后端模拟返回的数据：`)
        console.log(responseData)

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="flex flex-col p-4 w-full h-screen bg-white">
  {/* 标题 */}
  <div className="bg-gray-800 text-white my-3 py-4 text-center text-xl font-semibold rounded">Chat with {curModel}</div>
  
  {/* 聊天消息框 */}
  
  {/* flex-1：铺满剩余区域 */}
  <MessageBox messages={allMessages}/>
  
 
  
  {/* 回复消息输入框 */}
  <form className="bg-white flex flex-row gap-1" onSubmit={handleSubmit}>

    <button 
    className="bg-white mt-2 text-white rounded-md  hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out" 
    onClick={handleClear}
    type="button"
    title='清空当前页面所有聊天'
  >
    <img src={clear} alt="Send" className="inline-block h-12 mr-2" />
  </button>
  
    <textarea className="resize-none m-2 p-2 w-full border border-gray-300 rounded-md"
        rows={rows}
        ref={textAreaRef}
        disabled={isDisabled}
        onChange={handleInputChange}
        value = {useInput}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        >
    </textarea>

    <button className="bg-white text-white rounded-md hover:bg-gray-100 hover:text-gray-700"
      // onClick={handleSubmit}
      type="submit">
      <img src={arrow} alt="Send" className="inline-block h-12 mr-2" />
    </button>
  </form>
</div>

  )
}

export default ChatArea