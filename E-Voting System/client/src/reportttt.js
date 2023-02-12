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
    state = {panRes:[],reportData:[],posts:[],approvedPanels: [], modalShow: false ,panelData:[], winnerNa:'',votee : '' ,storageValue: 0, totalColumns: 0, web3: null, accounts: null, contract: null, balances: '', address:'', amount:'' };
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
      let pan = [];
      
     // const response = await contract.methods.winnerName().call();
      const response = await contract.methods.totalVotes().call();
      const response2 = await contract.methods.winnerName().call();
      const response3 = await contract.methods.panelsCount().call();
      for(var i=0;i<response3;i++){
      const response4 = await contract.methods.panels(i).call();
     
      pan.unshift(response4);
      }
      const response5 = await contract.methods.winningProposal().call();
      const response6 = await contract.methods.panels(response5).call();
      // let balanceresult = await Promise.all (accounts.map(async (account) => {
      //   return await contract.methods.winnerName().call();
      // } ) );
      console.log("pan",pan[0].name);
      this.setState({panRes:pan});
      console.log("response",response);
      this.setState({ winnerNa: response6.name});
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
                {/* {this.state.panRes && this.state.panRes.map((val) => {
                    return (
                        <th colSpan={3}><center>{val.name}</center></th>
                    );
                }
                )} */}
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
              {console.log("panres",this.state.panRes)}
              <th>Votes</th>
              {/* {this.state.panRes && this.state.panRes.map((val2) => {
                     this.state.approvedPanels && this.state.approvedPanels.map((val) => {
                       if(val.panelName === val2.name){
                          console.log("val",val.panelName, "val 2",val2.voteCount);
                      //if(val2.name === "B"){
                    return (
                       
                    );
                    }
                  })})} */}
       { this.state.approvedPanels.map((approvedPanel) => {
let matchingPanRes =  this.state.panRes.find(pan => pan.name === approvedPanel.panelName);
  return matchingPanRes ?   <td colSpan={3}><center>{matchingPanRes.voteCount}</center></td>: null;
})
}
              {/* {this.state.approvedPanels && this.state.approvedPanels.map((val) => {
                    {this.state.panRes && this.state.panRes.map((val2) => {
                     
                      if(val.panelName === val2.name){
                         console.log("val",val.panelName, "val 2",val2.voteCount);
                    return (
                        <td><center>{val2.name}</center></td>
                    );
                }
                }
                )}
                })
              }
             
              */}
             </tr>

             <tr>
              <th>Winner</th>
          
              <th colSpan={this.state.totalColumns}><center>{this.state.winnerNa}</center></th>
          
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
       
         </>
      );
    }
    }
  
export default ReportMain;