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
  return (
    <div className={styles.normal}>
      <Link to='./users'>去用户页面</Link>
      <p>you  clicked  {count}  times</p>
      <button onClick={()=>setCount(count+1)}>click me</button>
      <input type="file" multiple accept='image/*' name="abc" id=""/>
      <UploadPhoto/>
    </div>
  )
}
