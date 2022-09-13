import { useEffect, useState } from "react";
import {  Steps, Spin } from 'antd';
import { RestDaysContainer } from "./RestDay.style";
const { Step } = Steps;
const RestDay = () => {
    const date = new Date()
    let year = date.getFullYear().toString()
    let month = (date.getMonth()+1).toString()
    let day = date.getDate().toString()
    const setNumber = (x) => {
        return(`0${x}`)
    }
    month = month.length === 1 ? setNumber(month) : month
    day = day.length === 1 ? setNumber(day) : day
    const [RestDayDaysLoader,setSpeicalDaysLoader]=useState(false)
    const [RestDayDaysArray,setRestDayDaysArray] = useState([{}])
    const [after,setAfter]=useState(0)
    useEffect(()=>{
        fetch('https://script.googleusercontent.com/macros/echo?user_content_key=ndfhsVv8ztZ6DG_pd62-5a549tYOyQLqXYobZfOrQd6nxcVQmVo9B4j8fTcphNlJL87WHp2W12NWLd3LriJ5fbFBSApAtiIvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBJmqZ7aCXgr_T9raHPdKD6FzJhOrtBk09Ompd0XWIbEdnRLihd5L-SribzJCTkISQa9gIUwtEVBJ4l_9wfuv83zfNqxja1jVw&lib=MuYsjupAABHnb8YXhYhaAABxIoJWoTElh')
        .then(response => response.json())
        .then((data) => {
            setSpeicalDaysLoader(true)
            setRestDayDaysArray(data)
            data.map((element,key)=>{
                const localday = element.localeDateString.split('.')[0]
                const localmonth = element.localeDateString.split('.')[1]
                const localyear = element.localeDateString.split('.')[2]
                if (localyear===year || localyear===year+1) {
                    if (localmonth<month) {
                        setAfter(key)
                    }
                    else if(localmonth===month && localday<=day){
                        setAfter(key)
                    }
                }
                return null
            })
        })
    },[day,month,year])
    return(
        <RestDaysContainer locate={!RestDayDaysLoader}>
            {
                !RestDayDaysLoader ? 
                <Spin size="large" style={{display:'block'}}/> :
                <>
                    <h1 style={{textDecoration:'underline',color:'#467FD0'}}>Tatil Günleri</h1>
                    <Steps progressDot current={after} direction="vertical" status="error">
                    {
                        RestDayDaysLoader && RestDayDaysArray.map((element,key)=>{
                            return(
                                <Step key={key} title={element.localeDateString} description={element.title} />
                            )
                        })
                    }
                    </Steps>
                
                </>
            }


        </RestDaysContainer>
    )
}

export default RestDay