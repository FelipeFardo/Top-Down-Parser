
import Modal from 'react-bootstrap/Modal';
import { useAnalyzer } from '../context/useAnalyzer';
import { Button } from 'react-bootstrap';


const Information = (props) =>{
  const { state: { terminals, topEntry, globalProduction,action }, actions: { nextPass } } = useAnalyzer()

  let formatedTable = []
  let table = []
  const formatTable = () => {
    globalProduction.forEach(item => {
    formatedTable.push({
      key: item.key,
      row: {}
    })

    terminals.forEach(t => {
        formatedTable[formatedTable.length - 1].row[t] = '';
    });

    formatedTable.forEach((_item, indexItem)=>{
      
      globalProduction[indexItem].list.forEach(rule => {
        rule.initial.forEach(terminal => {
          formatedTable[indexItem].row[terminal] = `${rule.nonTerminal} -> ${rule.production}`
        });
      })
      })  
    });

    formatedTable.forEach((item)=>{
      const row = []
      row.push(item.key)
      delete item.row.$;

      Object.keys(item.row).sort().forEach((nonTerminal)=>{
          row.push(item.row[nonTerminal])
      })
      row.push([])
      table.push(row)

    })
    

  } 
  formatTable()
   
  return (
       <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-5'>
        <div className='d-flex justify-content-around'>
          <div>
            <h5>Grammar</h5>
            <p className='m-0 p-0'>S ::= aBa | AB | dA</p>
            <p className='m-0 p-0'>A ::= bA | c</p>
            <p className='m-0 p-0'>B ::= bA | cC | dAa | ε</p>
            <p className='m-0 p-0'>C ::= aCA | b</p>
          </div>
          <div>
            <h5>First</h5>
            <p className='m-0 p-0'>{"S = {a, b, c, d}"}</p>
            <p className='m-0 p-0'>{"A = {b, c}"}</p>
            <p className='m-0 p-0'>{"B = {b, c, d, ε}"}</p>
            <p className='m-0 p-0'>{"C = {a, b}"}</p>
          </div>
          <div>
            <h5>Follow</h5>
            <p className='m-0 p-0'>{"S = {$}"}</p>
            <p className='m-0 p-0'>{"A = {a, b, c, d, $}"}</p>
            <p className='m-0 p-0'>{"B = {a, $}"}</p>
            <p className='m-0 p-0'>{"C = {a, b, c, $}"}</p>
          </div>
        </div>

        <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
          <h5>Table of Parsing</h5>
          <table className="table table-bordered table-striped">
            <thead className="sticky-top">
              <tr>
                <th></th>
                {terminals.map((terminal)=>
                <th className='text-center' key={terminal}>{terminal}</th>)}
              </tr>
           </thead>
            <tbody>
              {table.map((nonTerminals)=> (
                <tr key={nonTerminals[0]}>
                 {nonTerminals.map((nonTerminal, nonTerminalIndex)=>(
                nonTerminalIndex === 0 
                  ? <th className='text-center' key={nonTerminalIndex}>{nonTerminal}</th>
                  : <td
                  className={`'text-center'
                    ${action===nonTerminal
                      && topEntry===terminals[nonTerminalIndex-1]
                      && !!action
                    ?'bg-success':
                      ''
                  }`}
                  key={nonTerminalIndex}>{nonTerminal}</td>
                  ))}
                </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>

)}

export default Information;

