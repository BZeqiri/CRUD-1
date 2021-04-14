import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class ShtoLendet extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
  
     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Lenda",{
             method:'POST',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 Emri:event.target.Emri.value
             })
         })

         .then(res=>res.json())
         .then(result=>{
             alert(result);

         },
         (error)=>{
             alert('Failed');
         })
        }


    render(){
        return (
            <div className="container">

<Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
            Shto Lenden
         </Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <Row>
         <Col sm={6}>
           <Form onSubmit={this.handleSubmit}>
             <Form.Group controlId="Id_Lendes">
                <Form.Label>Emri i Lendes</Form.Label>
                <Form.Control type="text" name="Emri" required placeholder="Emri"/>
             </Form.Group>
             <Form.Group>
               <Button variant="primary" type="submit">
                 Shto Lenden
               </Button>
             </Form.Group>
           </Form>
         </Col>
       </Row>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>          
            
          </div>
      )
   }
}