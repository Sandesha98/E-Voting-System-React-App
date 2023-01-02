import './loginscreen.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState} from "react";
import './paginationn.css';
import Axios from 'axios';
import Paginationn from './pagination';
import SubmitPanel from './SubmitPanel';
import {useNavigate, useLocation} from 'react-router-dom';
import HomePage from './homepage';
function EditScreen() {
  var b = {};
      const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [count,setCount]=useState(0);
    const [cms_id, setId] = useState('')
    const [obj, setObj] = useState({cms_id:'',name: '',fatherName: '',email:'',department:'',semester:0,cgpa:0, contact_num:''})
    const [userList, setUserList] = useState([])
   const [counter,setCounter] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [img,setImg]= useState([]);
  const [prid,setprid]=useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
      Axios.get(`http://localhost:3001/getStudents/${location.state.cms}`).then((res)=>{
        setUserList((res.data)[count])
        setCounter((res.data).length)
        console.log(res.data);
      });
    },[count]);
    

    const setValues=()=>{
     let n = document.getElementById('n');
     let fn = document.getElementById('fn');
     let em = document.getElementById('em');
     let c = document.getElementById('c');
     let s = document.getElementById('s');
     let d = document.getElementById('d');
     let cn = document.getElementById('cn');
      Axios.get(`http://localhost:3001/fetchData/${cms_id}`).then((res)=>{
        n.value= (res.data[0]).name;
        fn.value = (res.data[0]).fatherName;
        em.value=(res.data[0]).email;
        c.value=(res.data[0]).cgpa;
        s.value=(res.data[0]).semester;
        d.value =(res.data[0]).department;
        cn.value=(res.data[0]).contact_num;
        
      });
      setAllPosts(allPosts.concat({cms_id: cms_id, candidate_id: userList.candidate_id, post_id: userList.post_id, panel_id: userList.panel_id}))
    }
    const handleReset =()=>{
      let x = document.getElementsByClassName('cms')
      let xx = document.getElementById('myImage')
      xx.value=''
      x[0].value = ''
      setObj({cms_id: '',name: '',fatherName: '',email:'',department:'',semester:0, cgpa:0, contact_num:''});
      setSelectedImage(null)
    }
    function Next(){
      if(selectedImage!=null)
          {
            setImg(img.concat(selectedImage))
          }
      handleReset();
      if(count>=counter)
      {
        setCount(0)
      }
      else{
      setCount(count => count+1)  
      }
    //  var cn = document.getElementById('cm');
     // cn.value=userList.cms_id  
    }
    function Prev(){
      if(count<=0)
      {
        setCount(0)
      }
      else{
        setCount(count=>count-1)
      }
    }
    
const sendData=async(e)=>{
  // setModalShow(true);
  e.preventDefault();
  var formData = new FormData();
  formData.append('dataa',JSON.stringify(allPosts));
  for(let i =0;i<=img.length;i++){
  formData.append('myImage',img[i]);
  }
   const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
   await Axios.post("http://localhost:3001/update",formData,config);  
}
  return (    
        <>
    {console.log(counter)}
         {userList &&  
         <> 
        <Paginationn className="pagee" ac={count}/>
        <div className="reg-page" >
    <Form enctype="multipart/form-data">
        <br/>
    <h1 className='hed'>Edit Panel</h1>
   
<br/>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <br/><br/><br/>
        <h3>{userList.postName}'s Detail Form</h3>
        </Form.Group>
        <Form.Group as={Col}>
        <div style={{border: '2px solid black', width: '180px', height: '120px'}}>
        {selectedImage && (
            <>
        <img alt="not found" width={"176px"}  height={"116px"} src={URL.createObjectURL(selectedImage)} />
        </>
      )}
            
        </div>
        <br/>

       
        <Form.Control
        id="myImage"
        type="file"
        name=""
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          
        }}
      />
      
        </Form.Group>
   
        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" id='n' value={userList.name}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>F/Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your F/name" id = 'fn' value={userList.fatherName}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        

        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>CMS-ID</Form.Label>
        <Form.Control className='cms' name= 'cmsId' id='cm' placeholder={userList.cms_id} onMouseOut = {(e)=>{setId(e.target.value)}} onBlur ={setValues}/>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="abc@iba-suk.edu.pk" id = 'em' value={userList.email}/>
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CGPA</Form.Label>
          <Form.Control id = 'c' value={userList.cgpa}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Semester</Form.Label>
          <Form.Control id ='s' value={userList.semester}/>
          </Form.Group>
        

       
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Department</Form.Label>
          <Form.Select id='d' value={userList.department}>
            
            <option>Electrical Department</option>
            <option>Education Department</option>
            <option>Business Department</option>
            <option>Mathematics Department</option>
            <option>Media Science Department</option>
            <option>Computer Science Department</option>
          </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control id='cn' value={userList.contact_num}/>
        </Form.Group>
        </Row>
      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="I hereby certify that all of the information provided by me in this application is correct."/>
      </Form.Group> */}
      <br/>
      <>
      {count==(counter-1)?<> 
      <Button variant="primary" onClick={sendData}>
        Submit
      </Button><br/><br/></>:<>
      <Button variant="primary" onClick={Next} >
        Next
      </Button>
      <br/><br/></>}
      </>
      {/* <SubmitPanel
        show={modalShow}
        onHide={()=>{setModalShow(false);
        navigate(-2);
        }
        } 
      /> */}
    </Form>

    </div>
    
    <br/><br/>
    </>
    }
    </>

  );
}

export default EditScreen;