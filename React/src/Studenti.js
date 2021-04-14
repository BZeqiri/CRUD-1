import React,{ Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {ShtoStudentet} from './ShtoStudentet';
import {EditStudentet} from './EditStudentet';

export class Studenti extends Component{
    constructor(props){
        super(props);
        this.state={studentet:[], addModalShow:false, editModalshow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'Studenti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({studentet:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteStudentin(Id_Studenti){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Studenti/'+Id_Studenti,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {studentet,Id_Studenti,Emri,Mbiemri,Lenda,Datelindja}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ID e Sudentit</th>
                        <th>Emri</th>
                        <th>Mbimeri</th>
                        <th>Lenda</th>
                        <th>Datelindja</th>
                        <th>Opcionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentet.map(Studenti=>
                            <tr key={Studenti.Id_Studenti}>
                                <td>{Studenti.Id_Studenti}</td>
                                <td>{Studenti.Emri}</td>
                                <td>{Studenti.Mbiemri}</td>
                                <td>{Studenti.Lenda}</td>
                                <td>{Studenti.Datelindja}</td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                     onClick={()=>this.setState({editModalShow:true,
                                        Id_Studenti:Studenti.Id_Studenti,
                                        Emri:Studenti.Emri,
                                        Mbiemri:Studenti.Mbiemri,
                                        Lenda:Studenti.Lenda,
                                     Datelindja:Studenti.Datelindja})}>
                                     Update
                                     </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteStudentin(Studenti.Id_Studenti)}>
                                        Delete
                                        </Button>

                                        <EditStudentet show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        Id_Studenti={Id_Studenti}
                                        Emri={Emri}
                                        Mbiemri={Mbiemri}
                                        Lenda={Lenda}
                                        Datelindja={Datelindja}/>

                                    </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Shto Studentin
                    </Button>

                    <ShtoStudentet show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}