import React from 'react'
import Home from './pages/home'
import Customer from './pages/customer'
import Login from './pages/login'
import Product from './pages/product'
import Transaction from './pages/transaction'
import Admin from './pages/admin'
import { Route, Switch } from 'react-router-dom'

export default class Main extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/customer" component={Customer} />
                <Route path="/product" component={Product} />
                <Route path="/transaction" component={Transaction} />
                <Route path="/admin" component={Admin} />
            </Switch>
        )
    }
}