import React, { useEffect, useState } from 'react';
import Dropdown from './dropdown/Dropdown'

import { sendSystemPrompt } from '../services/messages';

const ParamsArea = ({curModel, setCurModel, isInternal}) => {
  const dataModels = ['Model1', 'Model2', 'Model3'];
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentModel, setCurrentModel] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('')
  
  useEffect(()=>{
    console.log(selectedOption)
  },[selectedOption])
  
  

  const handleSelect = async(option) => {
    
    console.log(`当前的option是: ${option}`)
    
    //invoke父组件函数
    setCurModel(option)
    
    // 切换模型的异步任务
    await new Promise(resolve => {
      setTimeout(() => {
        setSelectedOption(option); // 设置当前组件局部变量
        resolve();
      }, 1000);
    });
    
    try {

      //内部使用才可以发送system_prompot
      if(isInternal){
        const data = await sendSystemPrompt(curModel, {query:"这是一条 system_prompt", system_prompt:systemPrompt});
      }
          
    } catch (error) {
      console.log(error)
    }

    
    
  };

  const handleInputChange = (event) => {
    // 通过 event.target.value 获取输入框中的值，并更新状态
    setSystemPrompt(event.target.value);
  };
  

  const handleSubmit = async(e) =>{
    // 防止表单提交的默认行为
    e.preventDefault();
    
    //await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const data = await sendSystemPrompt(curModel, {query:"这是一条 system_prompt", system_prompt:systemPrompt});
          
    } catch (error) {
      console.log(error)
    }

    console.log(`发送系统提示词成功:${systemPrompt}`);
  }

  // useEffect(()=>{
  //   setSelectedOption()
  // }, [selectedOption])

  return (
    <div className="flex-none w-1/4 bg-gray-100 p-4 border-r-2">
        <div className="flex flex-col">
          <label className='p-4 my-4 text-lg font-semibold bg-green-500 w-full rounded text-center'>
            <p className='my-4'>点击这里选择模型</p>
            <Dropdown options={dataModels} onSelect={handleSelect} />
            {selectedOption && <p className='mt-4'>当前模型: {selectedOption}</p>}
          </label>
          
          
          {isInternal &&
          <>
            <label htmlFor="top_p" className="text-sm font-semibold text-gray-700">
            top_p
            <input
              type="range"
              id="top_p"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none mt-1"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.8"
            />
          </label>
          <label htmlFor="temperature" className="text-sm font-semibold text-gray-700 mt-4">
            temperature
            <input
              type="range"
              id="temperature"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none mt-1"
              min="0"
              max="1.5"
              step="0.05"
              defaultValue="0.95"
            />
          </label>
          <div className="mt-4 p-2 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">System Prompt (Only for chat mode)</p>
            <input
              type="text"
              value={systemPrompt}
              onChange={handleInputChange}
              placeholder="Answer with some emojis ONLY"
              className="mt-1 p-2 bg-gray-50 border rounded w-full"
            />
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Press ⌘ Submit to apply
          </button>
          </>}
          
          <label htmlFor="top_p" className="text-sm font-semibold text-gray-700">
            <h1>提示：</h1>
            <h2>1. Enter发送提示词， Shift + Enter换行</h2>
            <h2>2. 输入框左侧图标清除历史信息</h2>
            <h2>3. 请勿连续发送提示词(未做防抖节流处理)</h2>
            ...
          </label>
          
          
        </div>
      </div>
  )
}

export default ParamsArea