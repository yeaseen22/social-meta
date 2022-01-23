import React, {useState} from 'react';

const Uploader = ({ customStyle }) => {
    // Recoil's Hook..
    const [postItems, setPostItems] = useState({postBody: ''});
    const [imageURL, setImageURL] = useState(null);


    // show image when picked..
    const showImage = (image) => (
        image &&
        <img
            src={imageURL}
            style={{
                height: '300px',
                width: '100%',
                marginTop: '0.5rem',
                border: '2px solid lightgray',
                borderRadius: '5px'
            }}
            alt="Not Founded Cover Post!"
        />
    );

    // when changing the files read image..
    const readImages = async(e) => {
        const file = e.target.files[0];
        const filename = file.name;
        console.log('Reading image -->> ', filename);
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
            {/*{ showImage(imageURL) }*/}
        </>
    )
}

export default Uploader;
