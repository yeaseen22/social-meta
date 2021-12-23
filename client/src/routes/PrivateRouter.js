import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../redux/actions/UserActions';


class PrivateRoute extends React.Component {
    // constructor method..
    constructor(props) {
        super(props);

        // dispatching auth action method..
        this.props.dispatch(auth());
    }

    // rendering method..
    render() {
        const { login } = this.props.User;

        // when restricted loading is false..
        if (!this.props.restrictionLoading) {
            return <Outlet />;
        }

        // when restricted loading is true..
        if (this.props.restrictionLoading) {
            if (login) {
                if (!login.isAuth) {
                    return <Navigate to={'/login'} />;
                }
            } else {
                return <Outlet />;
            }
        }
    }
}

// mapStateToProps..
const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps)(PrivateRoute);