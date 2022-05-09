import React from 'react'
import Navbar from '../component/navbar'
import './style.css'
import axios from 'axios'
import ProductList from '../component/productList'
import Footer from '../component/footer'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            products: [],
            isModalOpen: false,
            product_id: "",
            name: "",
            price: "",
            stock: "",
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
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getProduct = () => {
        let url = "http://localhost:8000/product"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    products: res.data.product
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
        form.append("price", this.state.price)
        form.append("stock", this.state.stock)
        form.append("image", this.state.image)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/product"
            axios.post(url, form, this.headerConfig())
                .then(res => {
                    this.getProduct()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        else if (this.state.action === "update") {
            url = "http://localhost:8000/product/" + this.state.product_id
            axios.put(url, form, this.headerConfig())
                .then(res => {
                    this.getProduct()
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
            price: "",
            stock: "",
            image: null,
            action: "insert"
        })
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            image: item.image,
            action: "update"
        })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/product/" + id
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            axios.delete(url, this.headerConfig())
                .then(res => {
                    console.log(res.data.message)
                    this.getProduct()
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
        this.getProduct()
    }

    render() {
        return (
            <div className="bgn">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Product</h6>
                    </div>
                    <button className="btn btn-dark mb-3" onClick={() => this.handleAdd()}>
                        Add Product
                    </button>
                    <div className="row mt-2">
                        {this.state.products.map((item, index) => {
                            return (
                                <ProductList key={index}
                                    nameImage={item.image}
                                    image={"http://localhost:8000/image/product/" + item.image}
                                    name={item.name}
                                    price={item.price}
                                    stock={item.stock}
                                    onEdit={() => this.handleEdit(item)}
                                    onDrop={() => this.handleDrop(item.product_id)}
                                />
                            )
                        })}
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Product</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-2" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Masukkan nama"
                                        value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" name="price" placeholder="Masukkan harga"
                                        value={this.state.price} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="text" name="stock" placeholder="Masukkan stok"
                                        value={this.state.stock} onChange={this.handleChange} />
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
                                <Button variant="warning" type="submit">
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