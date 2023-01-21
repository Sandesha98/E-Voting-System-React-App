import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from "react-bootstrap";
import './report.css';
import Table from 'react-bootstrap/Table';
import getWeb3 from './getWeb3';
import $ from 'jquery';
import HelloWorld from './contracts/HelloWorld.json';
import ModalVote from './modalVote';
import Axios from 'axios';
import jsPDF from "jspdf";
import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs'; 

class ReportMain extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
    state = {reportData:[],posts:[],approvedPanels: [], modalShow: false ,panelData:[], winnerNa:'',votee : '' ,storageValue: 0, totalColumns: 0, web3: null, accounts: null, contract: null, balances: '', address:'', amount:'' };
    generateReport= async ()=>{
    const image = await htmlToImage.toPng(this.ref.current);
    var doc = new jsPDF();
    doc.addImage(image, "PNG", 5, 5, 200, 200);
    doc.save("ElectionReport.pdf")
  
  };

   downloadPic = async () => {
    const image = await htmlToImage.toPng(this.ref.current);
    download(image, 'ElectionReport.png');
  } 
    componentDidMount = async () => {
        Axios.get(`http://localhost:3001/getCandidateDetails`).then((res) => {
            this.setState({approvedPanels: res.data});
            console.log(res.data);
        });
        Axios.get(`http://localhost:3001/report`).then((res) => {
          this.setState({reportData :res.data});
          console.log(res.data);
      });
      Axios.get(`http://localhost:3001/getPOstss`).then((res) => {
          this.setState({posts: res.data});
          console.log(res.data);
      });
    
      const table = document.getElementById("my-table"); // assuming the table has an id of "my-table"
      const headers = table.getElementsByTagName("th");
      this.setState({totalColumns: (headers.length-1)*3});

      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
    
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = HelloWorld.networks[networkId];
        const instance = new web3.eth.Contract(
          HelloWorld.abi,
          deployedNetwork && deployedNetwork.address,
        );
     
        this.setState({ web3, accounts, contract: instance },this.fetchData);
      } catch (error) {
     
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
   
    fetchData = async () => {   
      console.log("helo")
      const { accounts, contract } = this.state;
      
     // const response = await contract.methods.winnerName().call();
      const response = await contract.methods.totalVotes().call();
      const response2 = await contract.methods.winnerName().call();
      // let balanceresult = await Promise.all (accounts.map(async (account) => {
      //   return await contract.methods.winnerName().call();
      // } ) );
      console.log("response",response);
      this.setState({ winnerNa: response2});
      this.setState({ storageValue: response});
    };          
  

   
    render() {
     var x = this.state.winnerNa;
     let names = x.split(",");
     names.pop()
     console.log(names)
      return (
            <>
         <div className="report">
          
        <div ref={this.ref}>
        <center><h3>Election Report</h3></center>
        <Table id='my-table' striped bordered hover>
            <thead>
            <tr>
                <center>
                <th>Panel</th></center>
            {this.state.approvedPanels && this.state.approvedPanels.map((val) => {
                    return (   
                     <th colSpan={3}><center>{val.panelName}</center></th>
                        );
                }
                )}
                
                </tr>
                </thead>
            <tbody>
                {console.log(this.state.reportData)}
                {
                    this.state.posts.map((val) => {
                        return (
                            <tr>
                                <th>{val.postName}</th>
                                {this.state.reportData.map((val1) => {
                
                                    if (val.post_id === val1.post_id) {
                                        
                                        return (
                                            <> <td>{val1.name}</td>
                                            <td>{val1.cms_id}</td>
                                            <td>{val1.department} - {val1.semester} </td>
                                            
                                            </>
                                           
                                        );
                                                                        }
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                    <th>Symbol</th>
                    {this.state.approvedPanels.map((val) => {
                        return (
                            <td colSpan={3}>
                           <center><img src={`/uploads/${val.symbol}`} width="100px" ></img> </center>
                            </td>
                        );
                    })}

                </tr>
                <tr>
                  <th>Total Votes</th>
                  <td colSpan={this.state.totalColumns}>
                    <center><h1>{this.state.storageValue}</h1></center>
                  </td>
                </tr>
             <tr>
              <th>Votes</th>
              
                  {names.map((item)=>{
                    return(
                      <td colSpan={3}>
                <center>
                    <span>{item.split(":").slice(1)}</span>
                    </center>
                    </td>
                    );
                  })}
                    
             
             </tr>
            </tbody>
        </Table>
        </div>
        </div>
            <center>
            
            <Button variant='light' onClick={this.downloadPic.bind(this)} >Download as Image</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant='light' onClick={this.generateReport.bind(this)} >Download as PDF</Button>
            
            </center>
            <br/>
            {/* <button id="getName" onClick={this.winner.bind(this)}>SHOW</button>
            <label class="center-label" for="output">OUTPUT </label>
            <div id="output">winnerName : {this.state.winnerNa}</div>
            <div id="output">winnerName : {this.state.storageValue}</div>
            <br></br><br></br> */}
         </>
      );
    }
    }
  
export default ReportMain;