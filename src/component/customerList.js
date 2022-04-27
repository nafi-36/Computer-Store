import React from 'react'
import Delete from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/EditOutlined'

export default class CustomerList extends React.Component {
    render() {
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-body row d-flex align-items-center">
                    <div className="col-sm-3">
                        <img alt={this.props.nameImage} src={this.props.image} 
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-6 align-items-center">
                        <h5><b>Name : {this.props.name}</b></h5>
                        <h6>Phone : {this.props.phone}</h6>
                        <h6>Address : {this.props.address}</h6>
                        <h6>Username : {this.props.username}</h6>
                    </div>
                    <div className="col-sm-3 d-flex justify-content-center">
                        <button className="btn btn-info m-1" onClick={this.props.onEdit}><span><Edit /> </span>Edit</button>
                        <button className="btn btn-dark m-1" onClick={this.props.onDrop}><span><Delete /> </span>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}