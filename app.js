const img = document.getElementById('imagen')
const entrada = document.getElementById('entrada')
const uploadBar = document.getElementById('img-upload')

const UPLOAD_URL ='https://api.cloudinary.com/v1_1/dozang2vt/image/upload'
const PRESET = 'wgv3o4oo'

entrada.addEventListener('change',async(e)=>{
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('file',file)
    formData.append('upload_preset',PRESET)

    const res = await axios.post(UPLOAD_URL,formData,{
        Headers:{
            'content-type':'multipart/form-data'
        },
        onUploadProgress(e){
            console.log(Math.round((e.loaded * 100) / e.total));
            const progress = Math.round((e.loaded * 100) / e.total)
            uploadBar.innerText = `${Math.round((e.loaded * 100) / e.total)}%`
            uploadBar.style.width = `${Math.round((e.loaded * 100) / e.total)}%`
            uploadBar.ariaValueNow = `${Math.round((e.loaded * 100) / e.total)}%`
        }
    })
    console.log(res);
    img.src = res.data.secure_url
})