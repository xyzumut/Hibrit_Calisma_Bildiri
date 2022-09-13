import { Alert } from 'antd';
import React from 'react';
const GetAlert = ({message,messageType,onClose,closable}) => {
    return(<Alert message={message} type={messageType} showIcon closable={closable!==undefined?closable:true} onClose={onClose}/>)
}
export default GetAlert