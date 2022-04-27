import React from 'react'
import Person from '@mui/icons-material/Person'
import People from '@mui/icons-material/People'
import Money from '@mui/icons-material/AttachMoney'
import Cart from '@mui/icons-material/ShoppingCart'
import Navbar from '../component/navbar'
import './style.css'
import axios from 'axios'
import Footer from '../component/footer'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            adminName: "",
            adminCount: 0,
            custCount: 0,
            prodCount: 0,
            tranCount: 0
        }
        // cek di local storage apakah ada token (sudah login) 
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
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

    // mendapatkan nama admin
    getAdmin = () => {
        let admin = localStorage.getItem('name')
        let url = "http://localhost:8000/store/admin"

        axios.get(url)
        .then(res => {
            this.setState({
                adminName: admin,
                adminCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getCust = () => {
        let url = "http://localhost:8000/customer"

        axios.get(url)
        .then(res => {
            this.setState({
                custCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getProd = () => {
        let url = "http://localhost:8000/product"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                prodCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getTran = () => {
        let url = "http://localhost:8000/transaksi"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    tranCount: res.data.count
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    componentDidMount = () => {
        this.getAdmin()
        this.getCust()
        this.getProd()
        this.getTran()
    }

    render() {
        return (
            <div className="bg">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Dashboard Admin</h6>
                    </div>
                    <div className='alert bg-dark text-white text-center mb-4'>
                        <h1 className="text-bold"><i>HY! WELCOME BACK {this.state.adminName.toUpperCase()}</i></h1>
                    </div><hr />
                    <div className="d-flex justify-content-around p-1">
                        <div className="card col-6 bg-dark m-1">
                            <div className="card-body row">
                                <div className="col-3 p-4">
                                    <Person sx={{ fontSize: 90 }} className="text-white" />
                                </div>
                                <div className="col-9 p-4">
                                    <h2 className="text-light">𝘛𝘰𝘵𝘢𝘭 𝘈𝘥𝘮𝘪𝘯</h2>
                                    <h2 className="text-white"><i>{this.state.adminCount}</i></h2>
                                </div>
                            </div>
                        </div>
                        <div className="card col-6 bg-dark m-1">
                            <div className="card-body row">
                                <div className="col-3 p-4">
                                    <People sx={{ fontSize: 90 }} className="text-white" />
                                </div>
                                <div className="col-9 p-4">
                                    <h2 className="text-light">𝘛𝘰𝘵𝘢𝘭 𝘊𝘶𝘴𝘵𝘰𝘮𝘦𝘳</h2>
                                    <h2 className="text-white"><i>{this.state.custCount}</i></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around p-1">
                        <div className="card col-6 bg-dark m-1">
                            <div className="card-body row">
                                <div className="col-3 p-4">
                                    <Cart sx={{ fontSize: 90 }} className="text-white" />
                                </div>
                                <div className="col-9 p-4">
                                    <h2 className="text-light">𝘛𝘰𝘵𝘢𝘭 𝘗𝘳𝘰𝘥𝘶𝘤𝘵</h2>
                                    <h2 className="text-white"><i>{this.state.prodCount}</i></h2>
                                </div>
                            </div>
                        </div>
                        <div className="card col-6 bg-dark m-1">
                            <div className="card-body row">
                                <div className="col-3 p-4">
                                    <Money sx={{ fontSize: 90 }} className="text-white" />
                                </div>
                                <div className="col-9 p-4">
                                    <h2 className="text-light">𝘛𝘰𝘵𝘢𝘭 𝘛𝘳𝘢𝘯𝘴𝘢𝘤𝘵𝘪𝘰𝘯</h2>
                                    <h2 className="text-white"><i>{this.state.tranCount}</i></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}