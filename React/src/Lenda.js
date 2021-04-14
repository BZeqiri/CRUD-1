import React,{ Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {ShtoLendet} from './ShtoLendet';
import {EditLendet} from './EditLendet';

export class Lenda extends Component{
    constructor(props){
        super(props);
        this.state={lendet:[], addModalShow:false, editModalshow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'Lenda')
        .then(response=>response.json())
        .then(data=>{
            this.setState({lendet:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteLenden(Id_Lenda){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Lenda/'+Id_Lenda,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {lendet,Id_Lenda,Emri}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ID e Lendes</th>
                        <th>Emri</th>
                        <th>Opcionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lendet.map(Lenda=>
                            <tr key={Lenda.Id_Lenda}>
                                <td>{Lenda.Id_Lenda}</td>
                                <td>{Lenda.Emri}</td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                     onClick={()=>this.setState({editModalShow:true,
                                     Id_Lenda:Lenda.Id_Lenda,
                                     Emri:Lenda.Emri})}>
                                     Update
                                     </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteLenden(Lenda.Id_Lenda)}>
                                        Delete
                                        </Button>

                                        <EditLendet show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        Id_Lenda={Id_Lenda}
                                       Emri={Emri}/>

                                    </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Shto Lenden
                    </Button>

                    <ShtoLendet show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}