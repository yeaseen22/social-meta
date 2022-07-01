import React from 'react';
import { Modal, Typography, Box, InputBase } from '@mui/material';
import { RestorePageRounded, Search as SearchIcon, EditLocationAlt as EditLocationAltIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import NotFound from '../../widgets/NotFound';
import { connect } from 'react-redux';
import { showAllUsers } from '../../../redux/actions/UserActions';
import FoundUser from './FoundUser';

// Styling Components..
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100ch',
        },
    },
}));

// The Stylesheet here...
const styleModalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    boxShadow: 24,
    p: 1,
    borderRadius: 2
};

const styleSearchBar = {
    padding: 0,
    margin: 0,
    border: '1px solid lightgray',
    marginBottom: 10,
    width: '100%',
};

// SearchModal here..
const SearchModal = (props) => {
    const { open, handleClose } = props;
    const [searchKeyPressed, setSearchKeyPressed] = React.useState(false);
    const [foundData, setFoundData] = React.useState(true);
    const [searchText, setSearchText] = React.useState('');
    const [AllUsers, setAllUsers] = React.useState([]);
    const [filteredUsers, setFilteredUsers] = React.useState([]);

    // React Hook UseEffect..
    React.useEffect(() => {
        props.dispatch(showAllUsers());
    }, []);

    // console.log('--- Props --- ', props);

    // OnChange handler Function..
    const handleSearchKeyChange = (event) => {
        const searchValue = event.target.value;
        setSearchText(searchValue);

        // Put all users inside the Array Hook..
        setAllUsers(props.users.allUsers);
        // console.log('See All Users Array == ', AllUsers);

        // Make Filter for the Search data..
        const filteredData = AllUsers.filter(item => {
            const firstname = item.firstname.toLowerCase();
            const lastname = item.lastname.toLowerCase();
            let userValue = searchValue.toLowerCase();
            userValue = userValue.split(' ', 1).toString();

            if (firstname === userValue){
                return firstname === userValue;
            }

            if (lastname === userValue){
                return lastname === userValue;
            }
        });

        // console.log('Getting the new Filtered data -- ', filteredData);
        // Make Filtered Data put into the React Hook..
        setFilteredUsers(filteredData);

        if (searchValue.length > 0) {
            setSearchKeyPressed(true);
        } else {
            setSearchKeyPressed(false);
        }
    };

    console.log("Filtered OR Search Result -- ", filteredUsers);

    // Founded Data..
    const foundedData = (handleClose) => {
        if (filteredUsers.length > 0) {
            return (
                <>
                    {filteredUsers.map(user => {
                        return (
                            <FoundUser 
                                key={user._id} 
                                handleClose={handleClose} 
                                userId={user._id}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                email={user.email}
                                title={user.title}
                                profilePhoto={user.profilePhoto}
                            />
                        );
                    })}
                </>
            );
        }
        return notFoundedData();
    }

    // Not Founded Data..
    const notFoundedData = () => {
        return (
            <NotFound msg="Not Found Any Result!" color="gray" size={50} />
        );
    };

    // returning statement...
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                arial-labelledby="modal-modal-description"
                arial-describedby="modal-modal-description"
            >
                <Box sx={styleModalBox}>
                    {/* ---- Search Bar ---- */}
                    <Search style={styleSearchBar}>
                        <SearchIconWrapper>
                            {!searchKeyPressed ? <SearchIcon /> : <LoadingButton loading style={{ marginLeft: '-20px' }} />}
                        </SearchIconWrapper>
                        <StyledInputBase
                            style={{ width: '100%', fontSize: '20px' }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchKeyChange}
                        />
                    </Search>

                    {/* ---- Select Search For ----- */}
                    <EditLocationAltIcon />
                    
                    {/* ----- Search Result Data Area ----- */}
                    { !foundData ? notFoundedData() : foundedData(handleClose) }
                </Box>
            </Modal>
        </>
    );
};

// MapStateToProps..
const mapStateToProps = (state) => {
    return {
        users: state.User
    };
};

export default connect(mapStateToProps, null)(SearchModal);