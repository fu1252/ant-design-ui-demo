import { Upload,message, Icon, Modal } from 'antd'
import React from 'react'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class UploadPhoto extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  };

  handleChange = info => {
    let fileList = [...info.fileList]
    if (info.file.size / 1024 / 1024 > 1|| !info.file.type.startsWith('image')) {
      fileList = fileList.slice(0,-1)
    }
    console.log(info)
    
    this.setState({ fileList })
  };
 handleBeforeUpload=(file)=> {
   const isJPG = file.type.startsWith('image')
   if (!isJPG) {
     message.error('You can only upload JPG file!')
   }
   const isLt2M = file.size / 1024 / 1024 < 1
   if (!isLt2M) {  
     message.error('Image must smaller than 1MB!')
   }
   return isJPG && isLt2M
 }
 render() {
   const { previewVisible, previewImage, fileList } = this.state
   const uploadButton = (
     <div>
       <Icon type="plus" />
       <div className="ant-upload-text">Upload</div>
     </div>
   )
   return (
     <div className="clearfix">
       <Upload
         accept={'image/*'}
         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
         listType="picture-card"
         fileList={fileList}
         onPreview={this.handlePreview}
         onChange={this.handleChange}
         beforeUpload={this.handleBeforeUpload}
         disabled={fileList.length >=2}
       >
         {fileList.length >= 3 ? null : uploadButton}
       </Upload>
       <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
         <img alt="example" style={{ width: '100%' }} src={previewImage} />
       </Modal>
     </div>
   )
 }
}

export default UploadPhoto


// react hook 写法：
// import React,{useState,useEffect} from 'react'
// import {Upload,message,Button,Icon} from 'antd'

// export default function() {
//   const [fileList, setfileList] = useState([])
//   const props = {
//     onChange:(info)=>{
//       let fileList = [...info.fileList]
//       fileList = fileList.map(file => {
//         if (file.response) {
//           file.url = file.response.url
//         }
//         return file
//       })
//       if (info.file.size / 1024 / 1024 > 1|| !info.file.type.startsWith('image')) {
//         fileList = fileList.slice(0,-1)
//       }
//       console.log(fileList)
//       setfileList(fileList)

//     },
//     beforeUpload:(file)=> {
//       const isJPG = file.type.startsWith('image')
//       if (!isJPG) {
//         message.error('You can only upload JPG file!')
//       }
//       const isLt2M = file.size / 1024 / 1024 < 1
//       if (!isLt2M) {
//         console.log(file)
      
//         message.error('Image must smaller than 1MB!')
//       }
//       return isJPG && isLt2M
//     }
//   }
  
//   return (
//     <div className={styles.normal}>
//       <UploadPhoto/>
//       <div style={{width:'500px',border:'1px solid red',padding:'4px'}}> 
//         <Upload {...props} fileList={fileList}>
//           { fileList.length >= 3 ? null : <div style={{ marginTop: '8px',color: '#666'}}> <Icon type="plus" />
//         Upload</div> }       
//         </Upload></div>
//     </div>
//   )
// }
