import React from 'react';
import { CardMedia } from '@mui/material';

const Uploader = ({ customStyle, postData, setPostData }) => {
    // show image when picked..
    const showImage = (image) => (
        image &&
        <CardMedia
            mx={3}
            component="img"
            height="300"
            image={postData.imagePreview}
            alt="Paella dish"
        />
    );

    // when changing the files read image..
    const readImages = async(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        // console.log('Reading image -->> ', file);

        reader.onloadend = () => {
            setPostData({...postData, imageFile: file, imagePreview: reader.result});
        };
        reader.readAsDataURL(file);
    }

    // console.log('Image URL here :- ', imageURL);

    // The Returning statement here..
    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={readImages}
                style={customStyle}
            />

            {/*------ Image showing after uploading this ------*/}
            { showImage(postData.imagePreview) }
        </>
    )
}

export default Uploader;
