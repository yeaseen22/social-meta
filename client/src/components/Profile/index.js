import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    // rendering method..
    render(){

        console.log(this.props);

        return (
            <h1>Welcome to Profile here!</h1>
        );
    }
}

// mapStateToProps Function..
const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps)(Profile);