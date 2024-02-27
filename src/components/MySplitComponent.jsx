import React, { useState, useEffect } from 'react'
import ChatArea from './ChatArea';
import ParamsArea from './ParamsArea';
import SplitPane from 'react-split-pane-v2';
import { useParams } from 'react-router-dom';
const MySplitComponent = ({modelName, data}) => {

    let { modelNum } = useParams();

    //初始的模型
    const [curModel, setCurModel] = useState('Qwen_05b_chat')
    const dataModels = ['Model1', 'Model2', 'Model3'];
    

    const switchModel = () =>{
      
      setCurModel(modelName);

    }

  return (
    
    // <SplitPane split="vertical" defaultSize="50%" minSize={100} maxSize={-100} className="flex h-screen">
    // </SplitPane>
    
    
     <div className="flex">
        {/* <p>{curModel}</p> */}
        {/* Parms Area - Left side  */}
        <ParamsArea curModel={curModel} setCurModel={setCurModel} isInternal={false}/>
    
        {/* Chat Area - Right side  */}
        <ChatArea curModel={curModel}/>

        
     </div>
    
 
  );
};

export default MySplitComponent;
