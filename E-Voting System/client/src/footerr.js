import React from "react";
import './footerr.css';
import logo from './siscLogo.jpeg'
import {FaFacebook, FaInstagram, FaEnvelope, FaLinkedin} from 'react-icons/fa'
export default function Footerr() {
  return (
    <footer
      className="bottom"
      style={{
        background: "black",
        color: "#ffffff",
        textAlign: "justify",
        bottom: 0,
        width: "100%",
        margin: 0,
        padding: 0,
        borderSize: "border-box"
      }}
    >
      
      
      <div className="container">
        
        <div className="row">
        
          <div className="col-md-4 col 12">
          
          <img
          style={{marginTop: 5, marginLeft: 10, borderRadius: 15}}
              alt=""
              src={logo}
              width="70px"
              height="70px"
            
            />  
          </div>  
          <div className="col-md-4 col-12" style={{ marginTop: 5 }}>
            <h4 style={{ color: "lightgrey" }}> Address </h4>
            <ul className="list-unstyled">
              <li>Sukkur IBA University Airport Road Sukkur </li>
            </ul>
          </div>
          <div className="col-md-4 col-12" style={{ marginTop: 5 }}>
            <h4 style={{ color: "lightgrey", textAlign: "justify" }}>
              
              Contact
            </h4 >
            <div>

            <a href="https://www.facebook.com/SISC2k22?mibextid=ZbWKwL">
            <FaFacebook/>
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://instagram.com/sisc.sukkuriba?igshid=YmMyMTA2M2Y=">
            <FaInstagram/>
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href="mailto:sisc@iba-suk.edu.pk">
   <FaEnvelope />
</a>
            </div>
          </div>
          <div
            className="col-12"
            style={{ fontSize: 14, color: "lightgrey", textAlign: "center" }}
          >
            &copy; {new Date().getFullYear()} E-Voting | All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
