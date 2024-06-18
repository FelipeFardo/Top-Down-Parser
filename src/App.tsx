import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';
import { IoIosInformationCircle } from "react-icons/io";

import ModalDicionario from './components/ModalDicionario';

import Table from './components/Table';
import { useAnalyzer } from './context/useAnalyzer';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const { state: { sentence }, actions: { initSentence, nextPass, changeSentence, iterateNextPass } } = useAnalyzer()


  return (
    <>
      <Toaster />
      <div className="d-flex justify-content-center mt-2">
        <div className="col-md-11">
          <h3 className="m-2 text-center border-bottom pb-3 ">Top-down Parsing</h3>
          <div className="d-flex justify-content-between my-3">

            <div className="input-group w-auto gap-3">
              <input value={sentence} onChange={(e) => changeSentence(e.target.value)} type="text" className="form-control" placeholder="Enter the sentence..." />
              <div className="input-group-append">
                <Button className="btn btn-dark" type="button" onClick={() => initSentence()}>Generate</Button>
              </div>
            </div>


            <Button className="btn btn-warning" onClick={nextPass}>Next</Button>
            <Button className="btn btn-success" onClick={iterateNextPass}>Resolver</Button>
            <Button className="btn btn-dark" onClick={() => setModalShow(true)}>Information</Button>

            <ModalDicionario show={modalShow} onHide={() => setModalShow(false)} />
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
