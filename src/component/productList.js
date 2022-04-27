import React from 'react'
import Delete from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/EditOutlined'

export default class ProductList extends React.Component {
    render() {
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row d-flex align-items-center">
                    <div className="col-sm-4">
                        <img alt={this.props.nameImage} src={this.props.image} 
                        className="img rounded" height="200" />
                    </div>
                    <div className="col-sm-5 align-items-center">
                        <h5><b>Name : {this.props.name}</b></h5>
                        <h6>Price : {this.props.price}</h6>
                        <h6>Stock : {this.props.stock}</h6>
                    </div>
                    <div className="col-sm-3 d-flex justify-content-center">
                        <button className="btn btn-warning m-1" onClick={this.props.onEdit}><span><Edit /> </span>Edit</button>
                        <button className="btn btn-dark m-1" onClick={this.props.onDrop}><span><Delete /> </span>Delete</button>
                    </div>
                </div>
            </div>

            // <div className="card col-sm-3 p-2 m-1">
            //     <img className="card-img-top" src={this.props.image} alt={this.props.image} />
            //     <div className="card-body">
            //         <h5 className="card-title">{this.props.name}</h5>
            //         <p className="card-text">Price : {this.props.price}</p>
            //         <p className="card-text">Stock : {this.props.stock}</p>
            //         <div className="d-flex justify-content-center">
            //             <button className="btn btn-warning m-1" onClick={this.props.onEdit}><span><Edit /> </span>Edit</button>
            //             <button className="btn btn-dark m-1" onClick={this.props.onDrop}><span><Delete /> </span>Delete</button>
            //         </div>
            //     </div>
            // </div>

            // <div className="card col-sm-12 my-1">
            //     <div className="row g-0 align-items-center">
            //         <div className="col-md-4">
            //             <img className="img-fluid rounded-start" width="300" src={this.props.image} alt={this.props.image} />
            //         </div>
            //         <div className="col-md-8">
            //             <div className="card-body">
            //                 <h5 className="card-title">{this.props.name}</h5>
            //                 <p className="card-text">Price : {this.props.price}</p>
            //                 <p className="card-text">Stock : {this.props.stock}</p>
            //                 <div className="d-flex justify-content-left">
            //                     <button className="btn btn-warning m-1" onClick={this.props.onEdit}><span><Edit /> </span>Edit</button>
            //                     <button className="btn btn-dark m-1" onClick={this.props.onDrop}><span><Delete /> </span>Delete</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}