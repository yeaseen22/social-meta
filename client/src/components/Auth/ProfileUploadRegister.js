import React from 'react';
import { Grid, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';
import "../../css/profileUploadRegister.css";
import { connect } from 'react-redux';
import { profileUpload } from '../../redux/actions/UserActions';
import { useNavigate } from 'react-router-dom';
import BackdropLoading from '../widgets/BackdropLoading';

// Image Uploader..
const ImgUpload = ({ onChange, src }) => (
    <label className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img className="file-upload-img" for="photo-upload" src={src} />
        </div>
        <input id="photo-upload" type="file" name="file" onChange={onChange} />
    </label>
);

// Edit Pic..
const Edit = ({ onSubmit, children }) => (
    <div className="card">
        <form onSubmit={onSubmit} className="form-file-upload" encType="multipart/form-data">
            <h1>Select Profile</h1>
            {children}

            {/* Get into the next point */}
            <button type="submit" className="next">
                <Button endIcon={<NavigateNextIcon style={{ color: 'white' }} />}>
                    <span style={{ color: 'white' }}>Next</span>
                </Button>
            </button>
        </form>
    </div>
);


// When uploaded then show Pic..
const Profile = ({ onSubmit, src }) => {
    // useNavigate react-router-dom hook to redirect..
    const navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(false);

    const submitRedirect = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/login');
            window.location.reload();
        }, 2000);
    };

    if (!isLoading){
        return (
            <div className="card">
                <form onSubmit={onSubmit} className="form-file-upload" encType="multipart/form-data">
                    <h1>Your Profile</h1>
                    <label className="custom-file-upload fas">
                        <div className="img-wrap" >
                            <img className="file-upload-img" for="photo-upload" src={src} />
                        </div>
                    </label>
    
                    {/* when completes the profile set */}
                    <button type="submit" className="next" onClick={submitRedirect}>
                        <Button endIcon={<CheckIcon style={{ color: 'white' }} />}>
                            <span style={{ color: 'white' }}>Complete</span>
                        </Button>
                    </button>
                </form>
            </div>
        );
    }else{
        return <BackdropLoading />
    }

   
}

// Main Component..
class UploadProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: 'avatar',
            imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
            active: 'edit',
        };
    }

    // photo upload method..
    photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();

        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        }
        reader.readAsDataURL(file);
    }

    // onSubmit method handle..
    handleSubmit = e => {
        e.preventDefault();
        let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
        this.setState({
            active: activeP,
        })

        // creating object for image file store..
        const formData = new FormData();
        formData.append('id', this.props.User.register.user._id);
        formData.append('file', this.state.file);

        // dispatching data to redux store..
        this.props.dispatch(profileUpload(formData));
    }

    // rendering method..
    render() {
        const { imagePreviewUrl, active } = this.state;

        // console.log('Rendered Props', this.props);
        // console.log('Progress -->> ', this.state);

        // Returninig statement..
        return (
            <React.Fragment>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {(active === 'edit') ? (
                        <Edit onSubmit={this.handleSubmit}>
                            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
                        </Edit>
                    ) : (
                        <Profile
                            onSubmit={this.handleSubmit}
                            src={imagePreviewUrl}
                        />
                    )}
                </Grid>
            </React.Fragment>
        )
    }
}

// move redux store to props..
const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps)(UploadProfile);