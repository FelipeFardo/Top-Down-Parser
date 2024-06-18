import { useEffect, useRef } from "react";
import { useAnalyzer } from "../context/useAnalyzer";

const Analyzer = () =>{
  const { state: { resolver, iteracao } } = useAnalyzer()
  const tableRef = useRef(null);

  
  useEffect(() => {
    const scrollContainer = document.getElementById('table');

    if (iteracao<=1) document.getElementById('tablecontainer').scrollTo({top: 0,behavior: 'smooth'});
  
    let linhaDesejada=scrollContainer.rows[iteracao];
    linhaDesejada.scrollIntoView({ behavior: 'smooth' });
  }, [iteracao])

  return (
  <div className="table-wrapper-scroll-y my-custom-scrollbar" id="tablecontainer" style={{height:"65vh",overflow: "auto"}} ref={tableRef}>
    <table className="table table-bordered table-striped" id="table"  style={{fontSize:13}}>

    <thead className="sticky-top">
      <tr className="text-center">
        <th scope="col" >{iteracao}</th>
        <th scope="col" >Pilha</th>
        <th scope="col" >Entrada</th>
        <th scope="col" >Ação</th>
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