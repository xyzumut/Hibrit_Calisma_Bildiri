import React, { useEffect, useState } from 'react'
import {DashboardContainer, DashboardTable} from './Dashboard.style'
import { Spin } from 'antd';
import { GetAlert } from '../../Components/AllComponents';

const Dashboard = () => {
    const [loading,setLoading] = useState(true)
    const [datas,setDatas]=useState([])
    useEffect(()=>{
        fetch('http://localhost/backendPHP/getDashboardDatas.php?op=getDashboard')
        .then(response => response.json())
        .then((data) => {
            setDatas(data)
            setLoading(false)
        })
        .catch((err) => {
            setDatas(['Hata Oluştu, Lütfen Tekrar Deneyin'])
            setLoading(false)
        })
    },[])
    return(
        <DashboardContainer>
            {   
                loading ? <Spin size="large" style={{display:'block'}}/> :
                datas !=='Veri Yok' && datas[0]!== 'Hata Oluştu, Lütfen Tekrar Deneyin' ?
                <DashboardTable>
                    <thead>
                        <tr>
                            <th>İsim</th>
                            <th>Pazartesi</th>
                            <th>Salı</th>
                            <th>Çarşamba</th>
                            <th>Perşembe</th>
                            <th>Cuma</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {    
                            datas.map((data,key)=>{return(
                                <tr key={key}>
                                    <td>{data.username}</td>
                                    <td>{(data.pazartesi === 1 || data.pazartesi === '1' ? 'İş Yerinde' : (data.pazartesi === 0 || data.pazartesi === '0' ? 'Uzaktan' : 'Hata'))}</td>
                                    <td>{(data.sali === 1 || data.sali === '1' ? 'İş Yerinde' : (data.sali === 0 || data.sali === '0' ? 'Uzaktan' : 'Hata'))}</td>
                                    <td>{(data.carsamba === 1 || data.carsamba === '1' ? 'İş Yerinde' : (data.carsamba === 0 || data.carsamba === '0' ? 'Uzaktan' : 'Hata'))}</td>
                                    <td>{(data.persembe === 1 || data.persembe === '1' ? 'İş Yerinde' : (data.persembe === 0 || data.persembe === '0' ? 'Uzaktan' : 'Hata'))}</td>
                                    <td>{(data.cuma === 1 || data.cuma === '1' ? 'İş Yerinde' : (data.cuma === 0 || data.cuma === '0' ? 'Uzaktan' : 'Hata'))}</td>
                                    <td>{(data.kontrol==='1' || data.kontrol===1 ? 'Tamam' : 'Beklemede')}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </DashboardTable> :
                datas[0] === 'Hata Oluştu, Lütfen Tekrar Deneyin' ? 
                <div style={{width:'100%'}}>
                    <GetAlert message={datas[0]} closable={false} messageType={'error'}></GetAlert>
                </div>
                : 
                <h1> Henüz Kayıt Eklenmedi </h1>
            }
        </DashboardContainer>
    )
}
export default Dashboard