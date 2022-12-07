import Pagination from 'react-bootstrap/Pagination';
import './paginationn.css';


export default function Paginationn({ac}){
  let active = ac+1;
  let items = [];
  for (let number = 1; number <= 7; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  
  
  return(
        <>
        <div>
    <Pagination size="sm" bsPrefix='pagee'>{items}</Pagination>
    <br />

    
  </div>
        </>
    );
}