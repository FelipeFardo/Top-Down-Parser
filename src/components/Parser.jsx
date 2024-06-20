
import Modal from 'react-bootstrap/Modal';
import { useAnalyzer } from '../context/useAnalyzer';
import { Button } from 'react-bootstrap';


const Information = (props) =>{
  const { state: { terminals, resolver, log, topEntry, globalProduction,action }, actions: { nextPass,iterateNextPass } } = useAnalyzer()

  let formatedTable = []
  let table = []

  const read = log[log.length-1]
  let pile = resolver.length> 0 ? resolver[resolver.length-1][0].split('').reverse() : '$S'.split('').reverse()
  let entry = resolver.length> 0 ? resolver[resolver.length-1][1].split(''): '$'.split('')


  const readLog =  resolver.length> 0 ? resolver[resolver.length-1][2].includes('Read') : ''

  if (read === pile[0] && read === entry[0]){
      pile= pile.slice(1)
      entry=  entry.slice(1)
  }

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
        Table of Parsing
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
          <table className="table table-bordered table-striped">
            <thead className="sticky-top">
              <tr>
                <th className='text-center'>Pile</th>
                <th></th>
                {terminals.map((terminal)=>
                <th className='text-center' key={terminal}>{terminal}</th>)}
              </tr>
           </thead>
            <tbody>
              <tr className=''>
                <td rowSpan={7} className='text-center' style={{verticalAlign: 'bottom'}}>
                    {pile.map((char, charIndex)=> <span key={charIndex}> {char} <br/></span >)}
                </td>
                </tr>
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
              <tr>
                <td className={`text-center justify-content-center py-3 ${readLog?'bg-success' : ''}`}>Read log</td>
                <td  className='text-left justify-content-center py-3' colSpan="4">
                  {log}
                </td>
                <td className='d-flex justify-content-center '>
                  <Button style={{width:90}} className="btn btn-warning" onClick={nextPass}>Next</Button>
                </td>
              </tr>
              <tr  className='p-3'>
                <td className='text-center py-3'>Entry</td>
                <td  className='text-left  justify-content-center py-3' colSpan="4">
                  {entry}
                </td>
                <td className='d-flex justify-content-center py-3'>
                  <span>
                   <Button style={{width:90}} className="btn btn-success" onClick={iterateNextPass}>Resolver</Button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>

)}

export default Information;

