import React, { useRef, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { ProfileLayout, ProfilePicture, DefaultImage, ProfileContent, Username, PasswordChangeContainer, AdminContainer} from './Profile.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { Popover, notification } from 'antd';
import { GetAlert, Input, SubmitButton, Select, } from '../AllComponents'
const Profile = () => {
    const fileRef = useRef()
    const inputRef = useRef()
    const updatePasswordRef = useRef()
    const updatePasswordAgainRef = useRef()
    const initialUpdatePasswordState = {
        show:false,
        message:'',
        messageType:'error',
    }
    const [updatePasswordState,setUpdatePasswordState] = useState(initialUpdatePasswordState)
    const {user, setUser} = useAuth()
    const [message,setMessage]=useState(false)
    const newUserUsernameRef = useRef()
    const newUserPasswordRef = useRef()
    const newUserTypeRef = useRef()
    let fullPath = null 
    try {
        fullPath = require('../../uploads/'+user.profile_path)
    } catch (error) {}
    
    /* eğer profil resmi kaydı yoksa sql'de user.profile_path boştur yani ==='' true döner  */
    const SetProfilePicture = () => {
        return(
            <span>
                {message && <GetAlert message={'Lütfen Dosya Seçiniz'} messageType={'warning'} onClose={()=>{
                    setMessage(false)   
                }}/>}
                <br/>
                <input ref={fileRef} type="file" name="profile" id="imageInput"/>
                <button ref={inputRef} type="submit" onClick={async ()=>{
                    if (fileRef.current.files[0]) {
                        const image = fileRef.current.files[0]
                        const username = user.username//context içinden geldi
                        let formData = new FormData();
                        formData.append('profile',image)
                        formData.append('username',username)
                        await fetch('http://localhost/backendPHP/upload.php',{
                            method:'post',
                            body:formData
                        })
                        .then((response) => {
                            return response.json()
                        })
                        .then((responsePath) => {
                            setUser(prev => {
                                return{
                                    ...prev,
                                    profile_path : responsePath
                                }
                            })
                        })
                    } 
                    else {
                        setMessage(true)   
                    }
                }}> Gönder </button>
            </span>
        )
    }
    const PasswordChange = () => {
        return(
            <div style={{'display':'flex','justifyContent':'center','alignItems':'center','flexDirection':'column'}}>
                {updatePasswordState.show && <GetAlert message={updatePasswordState.message} messageType={updatePasswordState.messageType} onClose={()=>{
                    setUpdatePasswordState(prev => ({
                        ...prev,
                        show:false
                    }))
                }}></GetAlert>}
                <Input placeholder={'Yeni Şifreyi Girin'} ref={updatePasswordRef}/>
                <Input placeholder={'Yeni Şifreyi Tekrar Girin'} ref={updatePasswordAgainRef}/>
                <SubmitButton type='submit' onClick={async()=>{
                    if (updatePasswordRef.current.value===updatePasswordAgainRef.current.value) {
                        const newPassword = updatePasswordRef.current.value;
                        let formData = new FormData();
                        formData.append('newPassword',newPassword)
                        formData.append('username',sessionStorage.getItem('username'))
                        formData.append('operation','passwordUpdate')
                        fetch('http://localhost/backendPHP/changePassword.php',{
                            method:'post',
                            body:formData,
                        })
                        .then(response => response.json())
                        .then((data)=>{
                            console.log(data)
                            if (data==='Şifre Güncellendi') {
                                setUpdatePasswordState({
                                    show:true,
                                    message:data,
                                    messageType:'success'
                                })
                            }
                            else{
                                setUpdatePasswordState({
                                    message:'Bir Hata Oluştu',
                                    messageType:'error',
                                    show:true
                                })
                            }
                        })
                        .catch((err)=>{
                            setUpdatePasswordState({
                                message:'Sunucu Bağlantısı Yok',
                                messageType:'error',
                                show:true
                            })
                        })
                    }
                    else{
                        setUpdatePasswordState({
                            message:'Şifreler Aynı Olmalı',
                            messageType:'warning',
                            show:true
                        })
                    }
                }}>Şifreyi Güncelle</SubmitButton>
            </div>
        )
    }
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
    const newUser = () => {
        return(
            <div style={{'display':'flex','justifyContent':'center','alignItems':'center','flexDirection':'column'}}>
                <Input placeholder={'Kullanıcı Adı'} type={'username'} ref={newUserUsernameRef}/>
                <Input placeholder={'Şifre'} type={'password'} ref={newUserPasswordRef}/>
                <Select items={[{type:'Kullanıcı',id:0},{type:'Admin',id:1}]} ref={newUserTypeRef}></Select>
                <SubmitButton type='submit' onClick={async()=>{
                    const newUsername = newUserUsernameRef.current.value
                    const newUserPassword = newUserPasswordRef.current.value
                    const newUserType = newUserTypeRef.current.value
                    const formData = new FormData()
                    formData.append('op','addUser')
                    formData.append('username',newUsername)
                    formData.append('password',newUserPassword)
                    formData.append('usertype',newUserType)
                    await fetch('http://localhost/backendPHP/newUser.php',{
                        method:'post',
                        body:formData
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if(data==='İşlem Başarılı'){
                            openNotification(data,'success')
                        }
                        else{
                            openNotification(data,'error')
                        }
                    })
                    .catch((err)=>{
                        openNotification('Hata','error')
                    })
                    newUserUsernameRef.current.value = ''
                    newUserPasswordRef.current.value = ''
                }}>Yeni Kullanıcı Ekle</SubmitButton>
            </div>
        )
    }
    return(
        <ProfileLayout>
            <ProfilePicture>
                <Popover content={SetProfilePicture} title="Profil Resmi Yükle" trigger="click">
                    <div><FontAwesomeIcon icon={faPlus}/></div>
                    {
                        fullPath ? <img src={fullPath} alt={'Profile'} /> : <DefaultImage>{user.username[0]}</DefaultImage>
                    }
                </Popover>
            </ProfilePicture>
            <ProfileContent>
                <Username>{user.username}</Username>
                <PasswordChangeContainer>
                    <Popover content={PasswordChange} placement="bottom" title={<b>Şifre Değiştir</b>} trigger="click">
                        Şifre Değiştir
                    </Popover>
                </PasswordChangeContainer>
            </ProfileContent>
            {   user.userType.toString() === '1' &&
                <AdminContainer>
                    <Popover content={newUser} placement="bottom" title={<b>Yeni Kullanıcı Bilgileri</b>} trigger="click">
                        Yeni Kullanıcı Kaydı
                    </Popover>
                </AdminContainer>
            }
        </ProfileLayout>
    )
}
export default Profile