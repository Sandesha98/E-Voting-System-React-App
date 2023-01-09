import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import logo from './logo.jpg'
import './navbar.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Axios  from "axios";
function NavBar() {
  const [votingChecked, setVotingChecked] = useState(false);
  const[admin,setAdmin]=useState([]);
  const [registrationChecked, setRegistrationChecked] = useState(false);
  useEffect(()=>{
    // Axios.get(`http://localhost:3001/getAdminCredentials/${entry.cms_id}`).then((res)=>{
    //   console.log(res.data);
    //   setAdmin(res.data)
    // });
    Axios.get("http://localhost:3001/manageElectionData").then((res)=>{
      console.log(res.data[0]);
      {res.data[0].startRegistration==1?setRegistrationChecked(true):setRegistrationChecked(false)}
      {res.data[0].startVoting==1?setVotingChecked(true):setVotingChecked(false)}
     
  } )
  });
  const onSwitchAction = () => {
   
    setVotingChecked(!votingChecked);
     Axios.post("http://localhost:3001/startVoting",{votingChecked:!votingChecked}).then((res)=>{
     // console.log(res.data);
      //setAllPanelData(res.data);
         }

     );
   };
   const onSwitchAction2 = () => {
   
    setRegistrationChecked(!registrationChecked);
     Axios.post("http://localhost:3001/startRegistration",{registrationChecked: !registrationChecked}).then((res)=>{
      console.log(res.data);
      //setAllPanelData(res.data);
         }

     );
   };
  return (
    <>
    
      <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark" > 
        <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Brand href="#home" className="nav-bar">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
           <Link to='/homepage' style = {{color: 'white'}}> E-Voting System</Link>
            </Navbar.Brand>
            <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
          </Navbar.Collapse>
          <div id='hey'>
          <NavDropdown title="Manage Election" className='navbar-brand' autoClose="outside" id="basic-nav-dropdown">
              <NavDropdown.Item href="#startregistration">
                <Form>
                <Form.Switch
                onChange={onSwitchAction2}
                  id="registration-switch"
                  label="Start Registration"
                  checked = {registrationChecked}
              
                />
                </Form>
                </NavDropdown.Item>
              
              <NavDropdown.Item href="#startvoting" className='rr'>
              <Form>
                <Form.Switch
                  onChange={onSwitchAction}
                  id="voting-switch"
                  label=" Start Voting"
                  checked = {votingChecked}                  
                />
                </Form>
              </NavDropdown.Item>
              </NavDropdown>
              </div>
          <Navbar.Brand href="#logout" className='rr'>
            Logout
          </Navbar.Brand>
        </Container>
      </Navbar>
    
    </>
  );
}

export default NavBar;