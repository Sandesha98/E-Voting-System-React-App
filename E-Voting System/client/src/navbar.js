import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import logo from './logo.jpg'
import './navbar.css';
import getWeb3 from './getWeb3';
import HelloWorld from './contracts/HelloWorld.json';
import {Link,  useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Axios  from "axios";
import LoginScreen from './loginscreen';
import { set } from 'react-hook-form';
function NavBarr(props) {
  const [votingChecked, setVotingChecked] = useState(false);
  const [registrationChecked, setRegistrationChecked] = useState(false);
  const [reportChecked, setReportChecked] = useState(false);
  const [chkreport, setChkreport] = useState(false);
  const [web3,setWeb3] = useState(null);
  const [accounts,setaccounts] = useState(null);
  const [contract,setcontract] = useState(null);
  const [panelData,setPanelData] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{


    const connectWeb3 = async()=>{
    const web3 = await getWeb3();
    
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("hey",accounts);
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HelloWorld.networks[networkId];
      const instance = new web3.eth.Contract(
        HelloWorld.abi,
        deployedNetwork && deployedNetwork.address,
      );
     // instance.options.address = accounts[0];
      console.log(instance)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance },this.fetchData);
      setWeb3(web3);
      setaccounts(accounts);
      setcontract(instance);
    }
    connectWeb3();
    // Axios.get(`http://localhost:3001/getAdminCredentials/${entry.cms_id}`).then((res)=>{
    //   console.log(res.data);
    //   setAdmin(res.data)
    // });
    Axios.get("http://localhost:3001/manageElectionData").then((res)=>{
      console.log(res.data[0]);
      {res.data[0].startRegistration==1?setRegistrationChecked(true):setRegistrationChecked(false)}
      {res.data[0].startVoting==1?setVotingChecked(true):setVotingChecked(false)}
      {res.data[0].generateReport==1?setReportChecked(true):setReportChecked(false)}
  } )
  });
  const onSwitchAction = async () => {
   
    setVotingChecked(!votingChecked);
    console.log(!votingChecked);
     Axios.post("http://localhost:3001/startVoting",{votingChecked:!votingChecked}).then((res)=>{
     // console.log(res.data);
      //setAllPanelData(res.data);
         }

     );
     if(!votingChecked){
      console.log("hey")
      // Get network provider and web3 instance.
      
      Axios.get("http://localhost:3001/getCandidateDetails").then((res)=>{
        console.log(res.data);
        res.data.map((item)=>{
          console.log(item.panelName);
          contract.methods.addPanel(item.panelName).send({from: accounts[0]});
        })
        //this.setState({panelData:res.data});
       setPanelData(res.data)
      });
      
    }
     if(document.getElementById('voting-switch').checked==true){
      document.getElementById('registration-switch').disabled = true
      document.getElementById('report-switch').disabled = true
     }
     else{
      document.getElementById('registration-switch').disabled = false
      document.getElementById('report-switch').disabled = false
     }
   };
   

   const onSwitchAction2 = () => {
   
    setRegistrationChecked(!registrationChecked);
     Axios.post("http://localhost:3001/startRegistration",{registrationChecked: !registrationChecked}).then((res)=>{
      console.log(res.data);
      //setAllPanelData(res.data);
         }

     );
     if(document.getElementById('registration-switch').checked==true){
      document.getElementById('report-switch').disabled = true
      document.getElementById('voting-switch').disabled = true
     }
     else{
      document.getElementById('report-switch').disabled = false
      document.getElementById('voting-switch').disabled = false
     }
   };

   

   const onSwitchAction1 = () => {
   
    setReportChecked(!reportChecked);
    console.log(reportChecked);
    Axios.post("http://localhost:3001/generateReport",{reportChecked: !reportChecked}).then((res)=>{
    console.log(res.data);
      //setAllPanelData(res.data);
     
        }
        
     );
    {((document.getElementById('report-switch').checked==true)) ? document.getElementById('report').style.display='inline' : document.getElementById('report').style.display='' }
   if(document.getElementById('report-switch').checked==true){
    document.getElementById('registration-switch').disabled = true
    document.getElementById('voting-switch').disabled = true
   }
   else{
    document.getElementById('registration-switch').disabled = false
    document.getElementById('voting-switch').disabled = false
   }
   };
   const handleLogout=()=>{
    document.getElementById('hey').style.display='';
    document.getElementById('logout').style.display='';
    document.getElementById('report').style.display='';
    console.log("DONE")
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('isLoggedIn')
    navigate('/')
   }
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
          <div id="report">
          <Navbar.Brand  onClick={()=>navigate('/report')}>
            Report
          </Navbar.Brand>
          </div>
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

              <NavDropdown.Item href="#generateReport" className='rr'>
              <Form>
                <Form.Switch
                  onChange={onSwitchAction1}
                  id="report-switch"
                  label=" Generate Report"
                  checked = {reportChecked}                  
                />
                </Form>
              </NavDropdown.Item>


              </NavDropdown>
              </div>
              
              <div id="logout">
          <Navbar.Brand href=""  className='rr' onClick={handleLogout}>
            Logout
          </Navbar.Brand>
          </div>
          
        </Container>
      </Navbar>
    
    </>
  );
}

export default NavBarr;