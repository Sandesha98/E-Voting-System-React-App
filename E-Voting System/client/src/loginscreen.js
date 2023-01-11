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
  
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [entry,setEntry] = useState({});
   const [user, setUser] = useState([]);
   const [admin, setAdmin] = useState([]);
   const [userLogin, setUserLogin] = useState(false);
   const [adminLogin, setAdminLogin] = useState(false);
   const [sem, setSem]= useState();
   const [isAdmin, setIsAdmin] = useState(false);
   const [post, setPost] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(()=>{
     Axios.get(`http://localhost:3001/getCredentials/${entry.cms_id}`).then((res)=>{
      console.log(res.data);
      setUser(res.data);

      
    });
    Axios.get(`http://localhost:3001/getAdminCredentials/${entry.cms_id}`).then((res)=>{
      console.log(res.data[0].Post);
      if(res.data[0].Post=='CDC'){
        document.getElementById('hey').style.display='inline';
        console.log("DONE")
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
        sessionStorage.setItem('adminData', JSON.stringify(adminData));
        sessionStorage.setItem('post',JSON.stringify(adminData.post));
        sessionStorage.setItem('isAdminLoggedIn', true);
      }
    return(
    <>
    <div className="containerrr">
    <div className="login-page">  
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={vote} alt="Login"/>
        </div>
        <Form onFinish={handleSubmit}
          name="login-form"
          initialValues={{ remember: true }}
       
        >
          <p className="form-title">Log In</p>
          <br/>
          
          <Form.Item
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

         

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"  onClick={(adminLogin) ? handleAdminLogin() : ((userLogin) ? handleUserLogin() : false)} >
              LOGIN
              
            </Button>
          </Form.Item>
          
        </Form>
      </div>      
    </div>
    {user && user.map((val)=>{
              
            if(entry.cms_id === val.cms_id && entry.password === val.password){
              setSem(val.semester) 
              setUserLogin(true);
              document.getElementById('logout').style.display='inline';
            }
    })
   
    }
      {admin && admin.map((val)=>{ 
              if(entry.cms_id === val.Employee_id && entry.password === val.Password){
                setAdminLogin(true);
                setIsAdmin(true);
                setPost(val.Post);
                document.getElementById('logout').style.display='inline';
               // document.getElementById('logout').style.display='inline';
              }
      })}
    </div>
    </>
   
   );
   
}

export default LoginScreen;