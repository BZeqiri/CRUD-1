import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class ShtoStudentet extends Component{
    constructor(props){
        super(props);
        this.state={lendet:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Lenda')
        .then(response=>response.json())
        .then(data=>{
            this.setState({lendet:data});
        });
    }
     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Studenti",{
             method:'POST',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 Emri:event.target.Emri.value,
                 Mbiemri:event.target.Mbiemri.value,
                 Lenda:event.target.Lenda.value,
                 Datelindja:event.target.Datelindja.value
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

             <Form.Group controlId="Emri">
                <Form.Label>Emri i Studentit</Form.Label>
                <Form.Control type="text" name="Emri" required
                 placeholder="Emri"/>
             </Form.Group>

             <Form.Group controlId="Mbiemri">
                <Form.Label>Mbiemri i Studentit</Form.Label>
                <Form.Control type="text" name="Mbiemri" required
                 placeholder="Mbiemri"/>
             </Form.Group>


             <Form.Group controlId="Lenda">
                <Form.Label>Lenda</Form.Label>
                <Form.Control as="select">
                {this.state.lendet.map(Lenda=>
                    <option key={Lenda.Id_Lenda}>
                        {Lenda.Emri}
                    </option>)}

                </Form.Control>
             </Form.Group>

             <Form.Group controlId="Datelindja">
                <Form.Label>Datelindja</Form.Label>
                <Form.Control 
                type="date"
                name="Datelindja"
                required
                placeholder="Datelindja"
                />

               
             </Form.Group>

             <Form.Group>
               <Button variant="primary" type="submit">
                 Shto Studentin
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