import React, { useEffect, useState } from 'react'
import { ChooseDaysLayout, DayPickerGroup, DayPicker, ReportContainer, SubmitDays, Table, TableContainer } from './ChooseDays.Style'
import {GetAlert} from '../../Components/AllComponents'
import {useAuth} from '../../Context/AuthContext'
import { notification } from 'antd';

const ChooseDays = () => {
    const info1 = 'Bu sayfada önümüzdeki hafta uzaktan ve ya iş yerinde çalışacağınız günleri seçmelisiniz. Varsayılan yeşil rengi iş yerinde çalışmayı temsil eder ve eğer herhangi bir gün seçmeden onaylarsanız hafta içi her gün iş yerinde çalışacağınızı bildirmiş olursunuz.'
    const info2 = 'Çalışma planını seçip gönderdiniz, önümüzdeki hafta içi için seçtiğiniz çalışma planını alt taraftaki tabloda veya sağdaki renklendirilmiş günlerde görebilirsiniz.'
    const {user} = useAuth()
    const initialDays = {
        'Pazartesi':true,
        'Salı':true,
        'Çarsamba':true,
        'Perşembe':true,
        'Cuma':true
    }
    const [days,setDays]=useState(initialDays)
    const today = new Date()
    const switchDays = today.getDay()===0 || today.getDay()===6 || true ? true : false
    const [available,setAvailable]=useState(false)
    const openNotification = (message,type=undefined) => {
        switch (type) {
            case 'success':
                notification.success({
                    message: `İşlem Başarılı`,
                    description:message,
                    placement:'bottom'
                });
                break;
            case 'error':
                notification.error({
                    message: `İşlem Başarısız`,
                    description:message,
                    placement:'bottom'
                });
                break
            default:
                notification.info({
                    message: `Bilgi`,
                    description:message,
                    placement:'bottom',
                });
                break;
        }

    };
    useEffect(()=>{
        fetch(`http://localhost/backendPHP/days.php?username=${user.username}&op=getcontrol`)
        .then(response => response.json())
        .then((data)=>{
            if(data.kontrol === 1){
                setDays({
                    Pazartesi:data.pazartesi === 1 ? true : false,
                    Salı:data.sali === 1 ? true : false,
                    Çarsamba:data.carsamba === 1 ? true : false,
                    Perşembe:data.persembe === 1 ? true : false,
                    Cuma:data.cuma === 1 ? true : false
                })
                setAvailable(true)
            }
        })
    },[user.username])
    return(
        <ChooseDaysLayout>
            <ReportContainer>
                <GetAlert message={!switchDays || !available ? info1 : info2 } closable={false} messageType={!switchDays || !available ? 'info' : 'success'}></GetAlert>
                <TableContainer>
                    <h1>{!switchDays || !available ? 'Seçilen Şuanki Çalışma Planı' : 'Seçilip Bildirilen Çalışma Planı'}</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Gün</th>
                                <th>Çalışma Şekli</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(days).map((day,key)=>{return(
                                <tr key={key}>
                                    <td>{ day[0] }</td>
                                    <td>{ day[1]===true ? 'İş Yerinde' : 'Uzaktan' }</td>
                                </tr>
                            )})}
                        </tbody>
                    </Table>
                </TableContainer>
                <SubmitDays disabled={!switchDays || available} onClick={()=>{
                    const formData = new FormData()
                    Object.entries(days).forEach((day)=>{
                        formData.append(day[0],day[1])
                    })
                    formData.append('op','add_day')
                    formData.append('username',user.username)
                    fetch('http://localhost/backendPHP/days.php',{
                        method:'post',
                        body:formData
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data==='İşlem Başarılı'?'doğru':'yanlis')
                        if (data==='İşlem Başarılı') {
                            fetch(`http://localhost/backendPHP/days.php?username=${user.username}&op=getcontrol`)
                            .then(response => response.json())
                            .then((data)=>{
                                console.log(data)
                                if(data.kontrol === 1){
                                    setAvailable(true)
                                    setDays({
                                        Pazartesi:data.pazartesi === 1 ? true : false,
                                        Salı:data.sali === 1 ? true : false,
                                        Çarsamba:data.carsamba === 1 ? true : false,
                                        Perşembe:data.persembe === 1 ? true : false,
                                        Cuma:data.cuma === 1 ? true : false
                                    })
                                    openNotification('Kayıt Başarıyla Eklendi','success')
                                }
                            })
                            .catch((err)=>{
                                openNotification('Kayıt Eklenemedi','error')
                            })
                        }
                        else{
                            openNotification('Kayıt Eklenemedi','error')
                        }
                    })
                    .catch((err)=>{
                        openNotification('Kayıt Eklenemedi','error')
                    })
                }}>Gönder</SubmitDays>
            </ReportContainer>
            <DayPickerGroup>
                <DayPicker disabled={!switchDays || available} onClick={()=>{
                        setDays(prev=>({
                            ...prev,
                            'Pazartesi':!prev.Pazartesi
                        }))
                }} state={days.Pazartesi}>Pazartesi</DayPicker>
                <DayPicker disabled={!switchDays || available} onClick={()=>{
                        setDays(prev=>({
                            ...prev,
                            'Salı':!prev.Salı
                        }))
                }} state={days.Salı}>Salı</DayPicker>
                <DayPicker disabled={!switchDays || available} onClick={()=>{
                        setDays(prev=>({
                            ...prev,
                            'Çarsamba':!prev.Çarsamba
                        }))
                }} state={days.Çarsamba}>Çarsamba</DayPicker>
                <DayPicker disabled={!switchDays || available} onClick={()=>{
                        setDays(prev=>({
                            ...prev,
                            'Perşembe':!prev.Perşembe
                        }))
                }} state={days.Perşembe}>Perşembe</DayPicker>
                <DayPicker disabled={!switchDays || available} onClick={()=>{
                        setDays(prev=>({
                            ...prev,
                            'Cuma':!prev.Cuma
                        }))
                }} state={days.Cuma}>Cuma</DayPicker>
            </DayPickerGroup>
        </ChooseDaysLayout>
    )
}
export default ChooseDays