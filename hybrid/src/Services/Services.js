const loginRequest = async({username}) => {
    let responseData = undefined
    await fetch(`http://localhost/backendPHP/login.php?username=${username}`)
    .then(response => response.json())
    .then(data => {
        if(data.length>0){
            responseData = data
        }
        else{
            responseData = {message:'Kullanıcı Adı Bulunamadı'}
        }
    })
    .catch((err) => {
        console.log('Get Error',err)
        responseData = {message:'Sunucuya Bağlanılamadı'}
    })
    return responseData
}
export{
    loginRequest,
}