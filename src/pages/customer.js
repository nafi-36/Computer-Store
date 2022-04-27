import React from 'react'
import Navbar from '../component/navbar'
import './style.css'
import axios from 'axios'
import CustomerList from '../component/customerList'
import Footer from '../component/footer'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Customer extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            customers: [],
            isModalOpen: false,
            customer_id: "",
            name: "",
            phone: "",
            address: "",
            username: "",
            password: "",
            image: null,
            action: ""
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
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getCustomer = () => {
        let url = "http://localhost:8000/customer"

        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.customer
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        // parameter append => name, value 
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("username", this.state.username)
        form.append("password", this.state.password)
        form.append("image", this.state.image)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/customer"
            axios.post(url, form)
            .then(res => {
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
        else if (this.state.action === "update") {
            url = "http://localhost:8000/customer/" + this.state.customer_id
            axios.put(url, form)
            .then(res => {
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            // customer_id: "",
            name: "",
            phone: "",
            address: "",
            username: "",
            password: "",
            image: null,
            action: "insert"
        })
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            customer_id: item.customer_id,
            name: item.name,
            phone: item.phone,
            address: item.address,
            username: item.username,
            password: "",  // untuk edit password bisa dibuat end-point sendiri 
            image: item.image,
            action: "update"
        })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/customer/" + id
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount = () => {
        this.getCustomer()
    }

    render() {
        return (
            <div className="bgm">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Customer</h6>
                    </div>
                    <button className="btn btn-dark mb-3" onClick={() => this.handleAdd()}>
                        Add Customer
                    </button>
                    <div className="row mt-2">
                        {this.state.customers.map((item, index) => {
                            return (
                                <CustomerList key={index}
                                    nameImage={item.image}
                                    image={"http://localhost:8000/image/customer/" + item.image}
                                    name={item.name}
                                    phone={item.phone}
                                    address={item.address}
                                    username={item.username}
                                    onEdit={() => this.handleEdit(item)}
                                    onDrop={() => this.handleDrop(item.customer_id)}
                                />
                            )
                        })}
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Customer</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-2" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Masukkan nama"
                                        value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name="phone" placeholder="Masukkan no. telepon"
                                        value={this.state.phone} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" placeholder="Masukkan alamat"
                                        value={this.state.address} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Masukkan username"
                                        value={this.state.username} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Masukkan password"
                                        value={this.state.password} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="image" placeholder="Masukkan gambar"
                                        onChange={this.handleFile} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="dark" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" type="submit">
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                    <Footer />
                </div>
            </div>
        )
    }
}