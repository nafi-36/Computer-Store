import React from 'react'
import Navbar from '../component/navbar'
import './style.css'
import axios from 'axios'
import Footer from '../component/footer'
import { Modal, Button } from 'react-bootstrap'

export default class Transaction extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transactions: [],
            selectTransaction: [],
            isModalOpen: false,
            transaksi_id: "",
            customer_id: "",
            customer_name: "",
            time: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        else {
            window.location = '/login'
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    getTransaction = () => {
        let url = "http://localhost:8000/transaksi"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    transactions: res.data.transaksi
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    getAmount = (detail) => {
        let total = 0
        detail.map(item => {
            total += Number(item.price) * Number(item.qty)
        })
        return total
    }

    details = (item) => {
        let date = new Date(item.waktu)
        let tm = `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
        this.setState({
            selectTransaction: item.detail_transaksi,
            isModalOpen: true,
            transaksi_id: item.transaksi_id,
            customer_id: item.customer.customer_id,
            customer_name: item.customer.name,
            time: tm
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount = () => {
        this.getTransaction()
    }

    render() {
        return (
            <div className="bgb">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Transaction</h6>
                    </div>
                    <div className="card bg-dark p-3">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>ID Transaksi</th>
                                    <th>Customer Name</th>
                                    <th>Customer Address</th>
                                    <th>Total Amount</th>
                                    <th>Date</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            {this.state.transactions.map((item, index) => {
                                return (
                                    <tbody>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.transaksi_id}</td>
                                            <td>{item.customer.name}</td>
                                            <td>{item.customer.address}</td>
                                            <td>Rp.{this.getAmount(item.detail_transaksi)},-</td>
                                            <td>{this.convertTime(item.waktu)}</td>
                                            <td>
                                                <button className="btn btn-light" onClick={() => this.details(item)}>Lihat Detail</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detail of Transaction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <h4>Customer : {this.state.customer_name}</h4>
                                <h6>Time : {this.state.time}</h6>
                                <hr />
                                <table className="table table-bordered table-light mb-0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.selectTransaction.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.product.name}</td>
                                                    <td>{item.product.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td>Rp.{item.product.price * item.qty},-</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td colSpan="4"><h5>Total</h5></td>
                                            <td>Rp.{this.getAmount(this.state.selectTransaction)},-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Footer />
                </div>
            </div>
        )
    }
}