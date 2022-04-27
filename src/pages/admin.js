import React from 'react'
import Navbar from '../component/navbar'
import Footer from '../component/footer'
import axios from "axios"
import { Modal, Button, Form } from 'react-bootstrap'

export default class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            action: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            // fillPassword: true,
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getAdmin = () => {
        let url = "http://localhost:8000/store/admin"

        axios.get(url)
            .then(res => {
                this.setState({
                    admins: res.data.admin
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    Add = () => {
        this.setState({
            action: "insert",
            admin_id: 0,
            name: "",
            username: "",
            password: "",
            // fillPassword: true,
            isModalOpen: true
        })
    }

    Edit = item => {
        this.setState({
            action: "update",
            admin_id: item.admin_id,
            name: item.name,
            username: item.username,
            password: "",
            // fillPassword: false,
            isModalOpen: true
        })
    }

    saveAdmin = e => {
        e.preventDefault()
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        // if (this.state.fillPassword) {
        //     form.password = this.state.password
        // }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/store/admin"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getAdmin()
                    this.handleColse()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8000/store/admin/" + this.state.admin_id
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getAdmin()
                    this.handleColse()
                })
                .catch(error => console.log(error))
        }
        this.setState({
            isModalOpen: false
        })
    }

    dropAdmin = id => {
        let url = "http://localhost:8000/store/admin/" + id
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getAdmin()
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

    componentDidMount() {
        this.getAdmin()
    }

    render() {
        return (
            <div className="bgv">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Admin</h6>
                    </div>
                    <button className="btn btn-dark mb-4" onClick={() => this.Add()}>
                        Add Admin
                    </button>
                    <div className="card bg-dark p-3">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                            onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-light m-1"
                                            onClick={() => this.dropAdmin(item.admin_id)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Admin</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.saveAdmin(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-2" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Masukkan nama"
                                        value={this.state.name} onChange={e => this.setState({ name: e.target.value })} required />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Masukkan username"
                                        value={this.state.username} onChange={e => this.setState({ username: e.target.value })} required />
                                </Form.Group>
                                {/* {this.state.action === "update" && this.state.fillPassword === false ? (
                                    <Button variant="dark" onClick={() => this.setState({ fillPassword: true })}>
                                        Change Password
                                    </Button>
                                ) : ( */}
                                    <Form.Group className="mb-2" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Masukkan password"
                                            value={this.state.password} onChange={e => this.setState({ password: e.target.value })} required />
                                    </Form.Group>
                                {/* )} */}
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
                        {/* <div className="modal fade" id="modal_admin">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-info text-white">
                                        <h4>Form Admin</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={e => this.saveAdmin(e)}>
                                            Admin Name
                                            <input type="text" className="form-control mb-1"
                                                value={this.state.name}
                                                onChange={e => this.setState({
                                                    name: e.target.value
                                                })}
                                                required
                                            />
                                            Username
                                            <input type="text" className="form-control mb-1"
                                                value={this.state.username}
                                                onChange={e => this.setState({
                                                    username: e.target.value
                                                })}
                                                required
                                            />
                                            {this.state.action === "update" &&
                                                this.state.fillPassword === false ? (
                                                <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                    onClick={() => this.setState({
                                                        fillPassword: true
                                                    })}>
                                                    Change Password
                                                </button>
                                            ) : (
                                                <div>
                                                    Password
                                                    <input type="password" class
                                                        Name="form-control mb-1"
                                                        value={this.state.password}
                                                        onChange={e => this.setState({ password: e.target.value })}
                                                        required />
                                                </div>
                                            )}
                                            <button type="submit" className="btn btn-block btn-success">
                                                Simpan
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </Modal>
                    <Footer />
                </div>
            </div>
        )
    }


}