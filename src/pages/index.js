import styles from './index.css'
import Link from 'umi/link'
import React,{useState,useEffect} from 'react'
import {Upload,message,Button,Icon} from 'antd'
import UploadPhoto from '../components/UploadPhoto.js'

export default function() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  const [fileList, setfileList] = useState([])
  const props = {
    
    onChange:(info)=>{
      let fileList = [...info.fileList]
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      if (info.file.size / 1024 / 1024 > 1|| !info.file.type.startsWith('image')) {
        fileList = fileList.slice(0,-1)
      }
      console.log(fileList)
      setfileList(fileList)

    },
    beforeUpload:(file)=> {
      const isJPG = file.type.startsWith('image')
      if (!isJPG) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        console.log(file)
      
        message.error('Image must smaller than 1MB!')
      }
      return isJPG && isLt2M
    }
  }
  
  return (
    <div className={styles.normal}>
      <Link to='./users'>去用户页面</Link>
      <p>you  clicked  {count}  times</p>
      <button onClick={()=>setCount(count+1)}>click me</button>
      <input type="file" multiple accept='image/*' name="abc" id=""/>
      <UploadPhoto/>
      <div style={{width:'500px',border:'1px solid red',padding:'4px'}}> 
        <Upload {...props} fileList={fileList} disabled={fileList.length >=3}>
          { fileList.length >= 5 ? null : <div style={{ marginTop: '8px',color: '#666'}}> <Icon type="plus" />
        Upload</div> }       
        </Upload></div>
    </div>
  )
}
