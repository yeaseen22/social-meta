import React from 'react';
import { connect } from 'react-redux';
import Appbar from '../components/Navigation/Appbar';
import { Container } from '@mui/material';

const Layout = (props) => {

    console.log('this is from layout', props);

    if (props.User.login) {
        if (!props.User.login.isAuth) {
            return <>{props.children}</>;
        }

        if (props.User.login.isAuth) {
            return (
                <>
                    <Appbar />
                    <Container>
                        {props.children}
                    </Container>
                </>
            );
        }
    }

    return (
        <>
            {props.children}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps)(Layout);