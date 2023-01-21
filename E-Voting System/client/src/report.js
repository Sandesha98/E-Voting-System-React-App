import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import './report.css';
import getWeb3 from './getWeb3';
import $ from 'jquery';
import HelloWorld from './contracts/HelloWorld.json';

function Report() {
    const [reportData, setReportData] = useState([]);
    const [approvedPanels, setApprovedPanels] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect( async () => {
        Axios.get(`http://localhost:3001/report`).then((res) => {
            setReportData(res.data);
            console.log(res.data);
        });
        Axios.get(`http://localhost:3001/getPOstss`).then((res) => {
            setPosts(res.data);
            console.log(res.data);
        });
        Axios.get(`http://localhost:3001/getCandidateDetails`).then((res) => {
            setApprovedPanels(res.data);
            console.log(res.data);
        });

       
    }, []);


    return (
        <div className="report">
        <Table striped bordered hover>
            <thead>
            <tr>
                <center>
                <th>Panel</th></center>
            {approvedPanels && approvedPanels.map((val) => {
                    return (   
                     <th colSpan={3}><center>{val.panelName}</center></th>
                        );
                }
                )}
                
                </tr>
                </thead>
            <tbody>
                {console.log(reportData)}
                {
                    posts.map((val) => {
                        return (
                            <tr>
                                <th>{val.postName}</th>
                                {reportData.map((val1) => {
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
                    {approvedPanels.map((val) => {
                        return (
                            <td colSpan={3}>
                           <center><img src={`/uploads/${val.symbol}`} width="100px" ></img> </center>
                            </td>
                        );
                    })}

                </tr>
             
            </tbody>
        </Table>
        </div>
    );
}

export default Report;