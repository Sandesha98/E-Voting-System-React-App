import './loginscreen.css';
import vote from './vote.jpg'
import {Form,Input,Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import HomePage from './homepage';
import NavBarr from './navbar';
function LoginScreen(){
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [entry,setEntry] = useState({});
   const [user, setUser] = useState([]);
   const [admin, setAdmin] = useState([]);
   const [checkid, setCheckid] = useState(false);
   const [userLogin, setUserLogin] = useState(false);
   const [adminLogin, setAdminLogin] = useState(false);
   const [sem, setSem]= useState();
   const [isAdmin, setIsAdmin] = useState(false);
   const [post, setPost] = useState('');
   const [generateReport, setGenerateReport] = useState('0');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(()=>{
     Axios.get(`http://localhost:3001/getCredentials/${entry.cms_id}`).then((res)=>{
      console.log(res.data);
      if(res.data==0){
        setCheckid(true);
      }
      setUser(res.data);   
    });
    Axios.get("http://localhost:3001/generateReport").then((res)=>{
      if(res.data[0].generateReport==1){
      setGenerateReport((res.data[0]).generateReport);
      }
          });
    Axios.get(`http://localhost:3001/getAdminCredentials/${entry.cms_id}`).then((res)=>{
      console.log(res.data);
      if(res.data==0){
        setCheckid(true);
      }
      if(res.data[0].Post=='CDC'){
        document.getElementById('hey').style.display='inline';
        
      }
     
     
      setAdmin(res.data)
    });

  },[entry.cms_id]);
  function handlemanage(){
    if(admin[0].Post=='CDC'){
     
      console.log("DONE CSS")
    }
  }
  
    const handleChange = (e) => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const handleSubmit=()=>{
      setEntry({cms_id: inputs.cms_id , password: inputs.password});
     
      }

      const handleUserLogin = () =>{
        navigate('homepage',{state:{sem:sem, cms_id: entry.cms_id}});
        const userData = {
          cms_id: entry.cms_id,
          password: entry.password,
          sem: sem,
        }
      if(generateReport==1){
        document.getElementById('report').style.display='inline';
      
      }
        sessionStorage.setItem('data', JSON.stringify(userData));
        sessionStorage.setItem('isLoggedIn', true);
      }
       const handleAdminLogin = () =>{
        navigate('panel-request', {state:{isAdmin: isAdmin, post: post}})
        const adminData = {
          cms_id: entry.cms_id,
          password: entry.password,
          post: post
        }
        console.log("This is generate report",generateReport);
        if(generateReport==1){
          document.getElementById('report').style.display='inline';
        }
        sessionStorage.setItem('adminData', JSON.stringify(adminData));
        sessionStorage.setItem('post',JSON.stringify(adminData.post));
        sessionStorage.setItem('isAdminLoggedIn', true);
      }
      const loginn = () =>{
       // ((adminLogin) ? handleAdminLogin() : ((userLogin) ? handleUserLogin() : false))
      if(adminLogin)
      {
        handleAdminLogin();
      }
      else if(userLogin){
        handleUserLogin();
      }
      else if(form.isFieldsTouched()){
        setCheckid(true);
      }
    }
    return(
    <>
    
    {user && user.map((val)=>{
              
              if(entry.cms_id === val.cms_id && entry.password === val.password){
                setSem(val.semester) 
                setUserLogin(true);
                         
                document.getElementById('logout').style.display='inline';
              
              }
              else{
                console.log(checkid);
                setCheckid(true);
              }
              
      })
     
      }
        {admin && admin.map((val)=>{ 
                if(entry.cms_id === val.Employee_id && entry.password === val.Password){
                  setAdminLogin(true);
                  setIsAdmin(true);
                 
                  setPost(val.Post);
                  document.getElementById('logout').style.display='inline';
                
                }
                
              else{
                console.log(checkid);
                setCheckid(true);
              }
        })}
    <div className="containerrr">
    <div className="login-page">  
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={vote} alt="Login" />
        </div>
        <Form onFinish={handleSubmit} form={form}
          name="login-form"
          initialValues={{ remember: true }}
       
        >
          <p className="form-title">Log In</p>
          <br/>
          
          <Form.Item
          shouldUpdate={true}
            name="username"
            rules={[{ required: true, message: 'Please input your CMS-ID' }]}
          >
            <Input
              name="cms_id"
              placeholder="CMS-ID"
              onChange={handleChange}
              value={inputs.cms_id}
            />
          </Form.Item>

          <Form.Item
          shouldUpdate={true}
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={inputs.password}
              
            />
          </Form.Item>


          {/* {checkid && <p className="error">Invalid Credentials</p>} */}
          
          <Form.Item >
            <Button type="primary" htmlType="submit" className="login-form-button"  onClick={((adminLogin) ? handleAdminLogin() : ((userLogin) ? handleUserLogin() : false))} >
              LOGIN

            </Button>
          
          </Form.Item>
         
          
        </Form>
        
      </div>      
    </div>
    </div>
    </>
   
   );
   
}

export default LoginScreen;