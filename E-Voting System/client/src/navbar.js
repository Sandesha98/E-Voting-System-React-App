import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.jpg'
import './navbar.css';
import {Link} from 'react-router-dom';
function NavBar() {
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
            <Navbar.Brand href="#contact" >
            Contact Us 
          </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    </>
  );
}

export default NavBar;