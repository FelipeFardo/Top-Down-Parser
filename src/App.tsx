import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';

import Parser from './components/Parser';

import Table from './components/Table';
import { useAnalyzer } from './context/useAnalyzer';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const { state: { sentence }, actions: { initSentenceSuccess, nextPass, changeSentence, iterateNextPass, initSentenceError } } = useAnalyzer()


  return (
    <>
      <Toaster />
      <div className="d-flex m-auto justify-content-center mt-2" style={{ maxWidth: 1400 }}>
        <div className="col-md-11">
          <h3 className="m-2 text-center border-bottom pb-3 ">Tabular Predictive Top-Down Parser
          </h3>
          <div className="d-flex justify-content-between my-3">

            <div className="input-group w-auto gap-3">
              <input value={sentence} onChange={(e) => changeSentence(e.target.value)} type="text" className="form-control" placeholder="Enter the sentence..." />
              <div className="d-flex input-group-append gap-3">
                <Button className="btn btn-dark" type="button" onClick={() => initSentenceSuccess()}>Generate success</Button>
                <Button className="btn btn-danger" type="button" onClick={() => initSentenceError()}>Generate error</Button>
              </div>
            </div>


            <Button className="btn btn-warning" style={{ width: 90 }} onClick={nextPass}>Next</Button>
            <Button className="btn btn-success" style={{ width: 90 }} onClick={iterateNextPass}>Resolver</Button>
            <Button className="btn btn-dark" style={{ width: 90 }} onClick={() => setModalShow(true)}>Table</Button>

            <Parser show={modalShow} onHide={() => setModalShow(false)} />
          </div>
          <Table />
        </div>
      </div >
      <footer className='border-top pt-3 mt-2 text-center'>
        <p>Developed with ❤️ by <a href="https://github.com/FelipeFardo" target='_blank' rel="noreferrer" className='link-secondary'> Felipe Fardo</a> - Full Stack Developer</p>
      </footer >
    </>
  );
}

export default App;
