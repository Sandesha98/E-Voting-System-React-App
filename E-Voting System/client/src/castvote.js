import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from "react-bootstrap";
import './homepage.css';
import getWeb3 from './getWeb3';
import $ from 'jquery';
import HelloWorld from './contracts/HelloWorld.json';
import ModalVote from './modalVote';
import Axios from 'axios';


class CastVote extends Component {
 
    state = {modalShow: false ,panelData:[], winnerNa:'',votee : '' ,storageValue: 0, web3: null, accounts: null, contract: null, balances: '', address:'', amount:'' };
    
    componentDidMount = async () => {
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
       // instance.options.address = accounts[0];
        
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance },this.fetchData);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
    
    // runExample = async () => {
    //   const { accounts, contract } = this.state;
    
    //   // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.winnerName().call();
    //   let balanceresult = await Promise.all (accounts.map(async (account) => {
    //     return await contract.methods.winnerName().call();
    //   } ) );
      
    //   // Update state with the result.
    //   this.setState({ storageValue: response, balances: balanceresult });
    // };
    
    // Fectch panels name from database
    fetchData = async () => {           
    Axios.get("http://localhost:3001/getCandidateDetails").then((res)=>{
    console.log(res.data);
    this.setState({panelData:res.data});
   this.fetchPanels();
  });          
  }

  fetchPanels = async () => {
    const { accounts, contract } = this.state;
   

    {this.state.panelData.map((item) => {
      console.log(item.id);
      contract.methods.addPanel(item.panelName).send({from: accounts[0]});

    })}
    // for(let i=0;i<r.length;i++){
    // contract.methods.addPanel(r[i].id).send({from: accounts[0]});
    // // let panelnames = await Promise.all (accounts.map(async (account) => {
    // //   return await contract.methods.addPanel(r[i]).call(account);
    // // } ) );
    //   //  console.log(contract);
    // }  
  }
    castevote = async (NAME)=>{
    
    const { accounts, contract } = this.state;
     // const { accounts, contract } = this.state;
      //var NAME = $("input[type='radio'][name='count']:checked").val();
      //const response = await contract.methods.vote(NAME).call();
      contract.methods.vote(NAME).send({from: accounts[0]});
    
      console.log(NAME);
      //console.log(this.state.winnerNa);
      
    }
    mmSet (){
      this.setState({modalShow: true});
    }
    mnSet (){
      this.setState({modalShow: false});
    }
    winner = async ()=>{
      const { accounts, contract } = this.state;
     // const response = await contract.methods.winnerName().call();
      const response = await contract.methods.winnerName().call();
      // let balanceresult = await Promise.all (accounts.map(async (account) => {
      //   return await contract.methods.winnerName().call();
      // } ) );
      //console.log(response);
      this.setState({ winnerNa: response});
    }
    render() {
      if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
      return (
            <>
        <Container>
            <Row className='con'>
                {this.state.panelData.map((data, k) => (
                    <Col key={k} md={6} sm={8} lg={4}>
                        <center>
                        <Card border="primary" style={{ width: '20rem', height: '24rem'}}>
                            <Card.Img src={`/uploads/${data.symbol}`} width='320px' height='200px' />

                            <Card.Body>
                                <Card.Title>{data.panelName}</Card.Title>
                                {/* <Card.Text>{`${data.description.substring(0,120)}`}</Card.Text>
                                */}
                            </Card.Body>
                            <Button variant="outline-primary" onClick={this.castevote.bind(this,data.panelName)}>Vote</Button>
                        </Card>
                        <br/>
                        </center>
                    </Col>
                ))}
            </Row>
<br></br><br></br>
<button id="getName" onClick={this.winner.bind(this)}>SHOW</button>
            <label class="center-label" for="output">OUTPUT </label>
            <div id="output">{this.state.winnerNa}</div>
            <br></br><br></br>
            <ModalVote
        show={this.state.modalShow}
        onHide={this.mnSet.bind(this) } 
        // title={playerData.title}
        // description = {playerData.description}
      />
        </Container>





        {/* <div id="div-vote">
          <div>
            <h1>Panel 111</h1>
            <input type="radio" id="Panel 111" name="count" value="Panel 111" />
          </div>
    
          <div>
            <h1>Panel 112</h1>
            <input type="radio" id="Panel 112" name="count" value="Panel 112" />
          </div>
    
          <div>
            <h1>Panel 113</h1>
            <input type="radio" id="Panel 113" name="count" value="Panel 113" />
    
            <br />
    
            <button id="setName" onClick={this.castevote.bind(this)}>VOTE</button>
           
          </div>
        </div>
        <div class="container">
          <div>
           <button id="getName" onClick={this.winner.bind(this)}>SHOW</button>
            <label class="center-label" for="output">OUTPUT </label>
            <div id="output">{this.state.winnerNa}</div>
          </div>
        </div>
        <div class="container">
          <div>
            <label class="center-label" for="errorHolder">ERROR</label>
            <div id="errorHolder">None</div>
          </div>
        </div> */}
        </>
      );
    }
    }
    
    export default CastVote;
// export default function CastVote() {
//     const [panelData, setPanelData] = useState([]);
//     const [modalShow, setModalShow] = React.useState(false);
//     useEffect(() => {
//         Axios.get("http://localhost:3001/getCandidateDetails").then((res)=>{
//             console.log(res.data);
//            setPanelData(res.data);
//               });      
//     }, [])

//     return (
        
//         <>
//         {console.log(panelData)}

        
        
//         <br/><br/>
       
//         </>
//     )
// }

