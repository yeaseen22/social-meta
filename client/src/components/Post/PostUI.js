import React from 'react';

const PostUI = ({ body, image }) => {
    // StyleSheet Objects..
    const styleMainBox = {
        margin: 10,
        display: 'grid',
        justifyContent: 'center',
    };

    const styleChildBox = {
        background: 'lightgray',
        color: 'black',
        borderRadius: 5,
        border: '1px solid gray',
        padding: 10,
        marginBottom: '0.5rem'
    };

    console.log(body);

    return (
        <div style={styleMainBox}>
            <div style={styleChildBox}>
                <h3>{ body }</h3>
            </div>

            <div style={styleChildBox}>
                <img src={`/postUpload/${image}`} alt="" style={{maxWidth: 800}} />
            </div>
        </div>
    );
};

export default PostUI;