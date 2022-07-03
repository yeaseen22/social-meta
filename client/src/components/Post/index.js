import React from 'react';
import { readPost } from '../../redux/actions/PostActions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostUI from './PostUI';
import NotFound from '../widgets/NotFound';

const Post = (props) => {
    const { postId } = useParams();
    // Hook of react useEffect..
    React.useEffect(() => {
        props.dispatch(readPost(postId));
    }, []);

    console.log('POST == Specific here', props);

    if (props.Post) {
        if (props.Post.readPost){
            if (props.Post.readPost.post) {
                const { body, image, updatedAt, createdAt } = props.Post.readPost.post[0];

                // Returning statement..
                return (
                    <PostUI
                        body={body}
                        image={image}
                        updatedAt={updatedAt}
                        createdAt={createdAt}
                    />
                );
            }
        }
    }

    // returning statement..
    return <NotFound msg="Loading..." color="gray" size={100} />;
};


// MapStateToProps..
const mapStateToProps = (state) => {
    return {
        Post: state.Post
    };
};

export default connect(mapStateToProps, null)(Post);