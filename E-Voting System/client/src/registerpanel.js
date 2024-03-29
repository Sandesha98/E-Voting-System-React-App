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
import {useNavigate} from 'react-router-dom';
import HomePage from './homepage';

function RegisterPanel() {
  var b = {};
    const [selectedImage, setSelectedImage] = useState(null);
    const [count,setCount]=useState(0);
    const [cms_id, setId] = useState('')
    const [obj, setObj] = useState({cmsId:'',name: '',fatherName: '',email:'',department:'',semester:0,cgpa:0, contact_num:''})
    const [userList, setUserList] = useState([])
   const [post_id, setPostId]= useState(0);
   const [postName,setPostName]= useState('');
   const [counter,setCounter] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [img,setImg]= useState([]);
  const [prid,setprid]=useState('')
  const [modalShow, setModalShow] = React.useState(false);
const [cmsError, setCmsError] = useState("");
const [imgError, setImgError] = useState("");
const [touched, setTouched] = useState(false);
const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
      Axios.get("http://localhost:3001/getStudentInfo").then((res)=>{
        setUserList(res.data)
      });
      Axios.get("http://localhost:3001/getPosts").then((res)=>{
        setPostId(res.data[count].post_id)
        setPostName(res.data[count].postName)
        setCounter(res.data.length)
        });
    },[count]);
    const setValues=()=>{
      setTouched(true);
      {userList && userList.map((val)=>{ 
        if(val.cms_id===cms_id)
        {
         setObj({cmsId:val.cms_id, name: val.name, fatherName: val.fatherName, email: val.email,
          department: val.department, semester: val.semester,cgpa: val.cgpa, contact_num: val.contact_num
          })
       
        setAllPosts(allPosts.concat({cms_id,post_id})); 
        console.log(cms_id,post_id) 
        if(touched.cmsId && !isValid){
          setCmsError("CMS is not valid.");
        }         
        if(selectedImage!=null)
          {
            setImg(img.concat(selectedImage))
          }
          if(postName=='Proposer')
          {
              setprid(cms_id)
          }
      }
        
      })}
    }
    const handleReset =()=>{
      let x = document.getElementsByClassName('cms')
      let xx = document.getElementById('imgc')
      xx.value=''
      x[0].value = ''
      setId("");
      setTouched(false);
      setObj({cmsId: '',name: '',fatherName: '',email:'',department:'',semester:0, cgpa:0, contact_num:''});
      setSelectedImage(null)
    }

    const handleCms = (event) => {
      //event.preventDefault();
      let hasError = false;
      if (!cms_id) {
          setCmsError("CMS is required.");
          hasError = true;
      }
       else {
          setCmsError("");
      }
      if (selectedImage==null) {
        setImgError("Picture is required.");
        hasError = true;
        event.preventDefault()
    }
     else {
        setImgError("");
    }
     
    
      if (hasError || !isValid) {
        event.preventDefault()
    }
      // if(!hasError)
      // {
      //  setValues();
      // }
    }
    const handleChange = (event) => {
      const ssn = event.target.value;
      setIsValid(/^\d{3}-\d{2}-\d{4}$/.test(ssn));
    }
    function Next(){
       handleCms();
       handleReset();
      if(post_id>=count)
      {
        setCount(post_id)
      }
      else{
      setCount(count => count+1)  
      }
        
      //console.log(`${postName}Image`);
    }
    function Prev(){
      if(count<=0)
      {
        setCount(0)
      }
      else{
        setCount(count=>count-1)
      }
    //console.log(img);
    }
    
const addData=async(e)=>{
  e.preventDefault();
  handleCms();
  setModalShow(true);
    var formData = new FormData();
    formData.append('tags',JSON.stringify(allPosts));
  formData.append('PrId',JSON.stringify(prid));
  for(let i =0;i<=img.length;i++){
  formData.append('myImage',img[i]);
  }
   const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
   await Axios.post("http://localhost:3001/insert",formData,config);  
}
  return (
    <>
    <Paginationn className="pagee" ac={count}/>
    
    <div className="reg-page" >
    <Form enctype="multipart/form-data">
        <br/>
    <h1 className='hed'>Register Panel</h1>
   
<br/>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <br/><br/><br/>
        <h3>{postName}'s Detail Form</h3>
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
        id="imgc"
        type="file"
        name=""
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
        isInvalid = {!selectedImage && imgError!==""}
        isValid = {selectedImage && touched.selectedImage}
      />
      
        </Form.Group>
        
        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={obj.name} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>F/Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your F/name" value={obj.fatherName}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        

        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>CMS-ID</Form.Label>
        <Form.Control className='cms' name= 'cmsId' placeholder="xxx-xx-xxxx" 
        required
        onMouseOut = {(e)=>{setId(e.target.value)}} onBlur ={setValues}
       // pattern="^\d{3}-\d{2}-\d{4}$" 
        onChange={handleChange}  
        isInvalid={!touched && cmsError!==""}
        isValid={cms_id && isValid}
        />
  <Form.Control.Feedback type="invalid">
        {cmsError}
    </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="abc@iba-suk.edu.pk" value={obj.email}/>
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CGPA</Form.Label>
          <Form.Control value={obj.cgpa}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Semester</Form.Label>
          <Form.Control value={obj.semester}/>
          </Form.Group>
        

       
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Department</Form.Label>
          <Form.Select value={obj.department}>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Education</option>
            <option>Business Administration</option>
            <option>Mathematics</option>
            <option>Media Science</option>
            
          </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control value={obj.contact_num} />
        </Form.Group>
        </Row>
      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="I hereby certify that all of the information provided by me in this application is correct."/>
      </Form.Group> */}
      <br/>
      <>
       {count==(counter-1)?<> 
      <Button variant="primary"  type="Submit" onClick={addData} >
        Submit
      </Button><br/><br/></>:<>
      <Button variant="primary" onClick={Next} >
        Next
      </Button>
      <br/><br/></>}
      </>
      <SubmitPanel
        show={modalShow}
        msg='Panel is registered Successfully'
        onHide={()=>{setModalShow(false);
        navigate(-2);
        }
        } 
      />
    </Form>

    </div>
    
    <br/><br/>
    </>
  );
}

export default RegisterPanel;