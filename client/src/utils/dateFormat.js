import moment from 'moment';

const formatDate = (DATE) => {  
    const formattedDate = moment(DATE).format("D MMMM YYYY");
    return formattedDate;
};

export default formatDate;