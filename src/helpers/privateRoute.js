import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

class PrivateRoute extends Component {
    render() {
        const Component = this.props.privateComponent
        const token = Cookies.get('_T0123')
        const role = Cookies.get('_P01e')
        let profile
        if (role) {
            profile = JSON.parse(atob(role))
        }

        return (
            <Route {...this.props} render={(props) => {
                if (token) {
                    if (profile.role === 'ADMIN') {
                        if (this.props.name === 'admin') {
                            return <Component {...props} />
                        } else {
                            return <Redirect to="/admin" />
                        }
                    } else {
                        return <Redirect to="/" />
                    }
                } else {
                    return <Redirect to='/auth' />
                }
            }}></Route>
        )
    }
}

export default PrivateRoute
