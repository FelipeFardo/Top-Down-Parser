import { useEffect, useRef } from "react";
import { useAnalyzer } from "../context/useAnalyzer";
import { Button } from "react-bootstrap";

const Analyzer = () =>{
  const { state: { resolver, iteration } } = useAnalyzer()
  const tableRef = useRef(null);

  
  useEffect(() => {
    const scrollContainer = document.getElementById('table');

    if (iteration<=1) document.getElementById('tablecontainer').scrollTo({top: 0,behavior: 'smooth'});
  
    let linhaDesejada=scrollContainer.rows[iteration];
    linhaDesejada.scrollIntoView({ behavior: 'smooth' });
  }, [iteration])

  return (
  <div className="table-wrapper-scroll-y my-custom-scrollbar" id="tablecontainer" style={{height:"65vh",overflow: "auto"}} ref={tableRef}>
    <table className="table table-bordered table-striped" id="table"  style={{fontSize:13}}>

    <thead className="sticky-top">
      <tr className="text-center">
        <th scope="col" ></th>
        <th scope="col" >Pile</th>
        <th scope="col" >Entry</th>
        <th scope="col" >Action</th>
      </tr>
      </thead>
      <tbody className="text-center">
        {resolver.map((row, rowIndex)=>(
          <tr key={rowIndex}>
            <td>{rowIndex+1}</td>
            {row.map((td, tdIndex)=><td key={tdIndex}>{td}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )}

export default Analyzer;