import React, { useEffect, useState, useRef} from 'react'
import MessageCard from './messageCard/MessageCard'




  
const MessageBox = ({messages}) => {
    const [allMsg, setAllMsg] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [copied, setCopied] = useState('')
    const messagesEndRef = useRef(null); // 用于引用消息列表末尾的空<div>

    useEffect(()=>{
        setAllMsg(messages)
        //messages更新时， 滚动到最底部
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        console.log("所有信息")
        console.log(allMsg)
    }, [messages])
  return (
    <div className="flex-1 bg-gray-100 p-1 overflow-y-auto">
      {allMsg.map((message)=>(
        // message.fromUser ? <MessageCard message={message.text} key={message.id} fromUser ={message.fromUser}/>
        // : <MessageCard message={message.text} key={message.id} fromUser ={message.fromUser}/>
        <MessageCard message={message.text} key={message.id} fromUser ={message.fromUser}/>
    ))}
    <div ref={messagesEndRef} />
    </div>   
     
  )
}

export default MessageBox