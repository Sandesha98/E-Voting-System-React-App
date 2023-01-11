import logo from './logo.svg';
import './App.css';
import LoginScreen from './loginscreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import NavBarr from './navbar';
import HomePage from './homepage';
import CastVote from './castvote';

import RegisterPanel from './registerpanel';
import PanelStatus from './panelstatus';
import {Routes, Route} from 'react-router-dom';
import PanelRequest from './panelrequest';
import ViewPanelDetails from './viewpaneldetails';
import AllPanelDetails from './allPanelDetails';
import EditScreen from './EditScreen';
function App() {
  return (
    <div>
    <NavBarr/>
    
    <Routes>
      <Route path= '/' element={<LoginScreen/>}/>
      <Route path='/homepage' element={<HomePage/>}/>
       <Route path='homepage/register-panel' element={<RegisterPanel/>}/>
        <Route path='homepage/cast-vote' element={<CastVote/>}/>
      <Route path='homepage/panel-status' element={<PanelStatus/>}/>
      <Route path='panel-request' element={<PanelRequest/>}/>
      <Route path='/panel-request/allPanelDetails' element={<AllPanelDetails/>}/>
      <Route path='homepage/panel-status/allPanelDetails' element={<AllPanelDetails/>}/>
      <Route path='homepage/panel-status/edit-screen' element={<EditScreen/>}/>
    </Routes>
    </div>
        
  );
}

export default App;
