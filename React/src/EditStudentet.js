import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditStudentet extends Component{
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
             method:'PUT',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 Id_Studenti:event.target.Id_Studenti.value,
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
            Edit Studentin
         </Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <Row>
         <Col sm={6}>
           <Form onSubmit={this.handleSubmit}>

           <Form.Group controlId="Id_Studenti">
                <Form.Label>ID e Studentit</Form.Label>
                <Form.Control type="text" name="Id_Studenti" required
                 disabled
                 defaultValue={this.props.Id_Studenti}
                 placeholder="Id_Studenti"/>
             </Form.Group>

             <Form.Group controlId="Emri">
                <Form.Label>Emri i Studentit</Form.Label>
                <Form.Control type="text" name="Emri" required
                defaultValue={this.props.Emri}
                 placeholder="Emri"/>
             </Form.Group>

             <Form.Group controlId="Mbiemri">
                <Form.Label>Mbiemri i Studentit</Form.Label>
                <Form.Control type="text" name="Mbiemri" required
                defaultValue={this.props.Mbiemri}
                 placeholder="Mbiemri"/>
             </Form.Group>

             <Form.Group controlId="Lenda">
                <Form.Label>Lenda</Form.Label>
                <Form.Control as="select" defaultValue={this.props.Emri}>
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
                defaultValue={this.props.Datelindja}
                placeholder="Datelindja"
               
                />

               
             </Form.Group>

             <Form.Group>
               <Button variant="primary" type="submit">
                 Update Studentin
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