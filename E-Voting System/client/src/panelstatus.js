import './panelstatus.css';
import Button from 'react-bootstrap/Button';
import {useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
function PanelStatus(){
    const location = useLocation();
    const [statuss, setStatus] = useState([]);
   const navigate= useNavigate();    
    useEffect(()=>{
        Axios.get(`http://localhost:3001/getStatus/${location.state.cms_id}`).then((res)=>{
          setStatus(res.data[0])
          console.log(res.data);
        });
      // console.log(location.state.cms_id);
      },[]);
      const handleClick=(x)=>{
        console.log(x);
        Axios.post('http://localhost:3001/sendId', {panelId: location.state.cms_id});
        navigate('allPanelDetails', {state: {isAdmin: false}});
       }
    return(
        <>
        <div className="pan-stat" >
        <center> <h3>{statuss.Status}</h3></center>
          {(statuss.Status=='Approved') ?<>
          <center>   <h5>Congratulations! Your panel is approved.</h5></center>
          <h5>Panel Name: {statuss.panelName}</h5>
          <h5>Panel Symbol:</h5>
           <img src={`/uploads/${statuss.symbol}`} alt='panel symbol'></img>
          </>
          :<><h6>Feedback: {(statuss.feedback) ? statuss.feedback : 'NA'}</h6></> }
    
        <div className='div-feed'>
        {(statuss.Status == 'Pending') || (statuss.feedback!== '') ? 
        <Button variant="primary" onClick={()=>navigate('edit-screen', 
        {state:{cms: location.state.cms_id}})}>Edit</Button> : false}
        <Button variant="primary" onClick={handleClick}>View</Button>
        </div>
        <div>
        </div>
        </div>
        </>
    )
}

export default PanelStatus;