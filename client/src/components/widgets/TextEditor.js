import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from 'draft-js-export-html';
import { makeStyles } from '@mui/styles';

// Stylesheet..
const styles = makeStyles(() => ({
    editorClass: {
        fontSize: '18px',
        padding: '10px',
        border: '1px solid lightgray',
        height: 'auto',
        borderRadius: '5px'
    }
}));

// Component..
const TextEditor = ({ postData, setPostData, editorPlaceholder, type }) => {
    const [editorState, setEditorState] = React.useState({ editorState: EditorState.createEmpty() });
    const classes = styles();

    //Data ConvertToRaw Function..
    // const toRaw = (content) => {
    //     return convertToRaw(content).blocks[0].text;
    // }

    //Data ConvertFromRaw Function..
    // const fromRaw = (rawData) => {
    //     return convertFromRaw(rawData);
    // }

    //Data ConvertFromHTML Function..
    // const fromHTML = (html) => {
    //     return convertFromHTML(html);
    // }

    //Data to Full HTML Function..
    const toHTML = (content) => {
        return stateToHTML(content);
    }

    //On Editor Change Function..
    const onEditorStateChange = (editorState) => {
        let currentContent = editorState.getCurrentContent();
        let html = toHTML(currentContent);

        setEditorState({ ...editorState, editorState, });

        if(type === "postBody"){
            setPostData({...postData, postBody: html});
        }else{
            setPostData(html);
        }
    };

    //Return statement..
    return (
        <Editor
            editorState={editorState.editorState}
            toolbarClassName="toolbarClassName"
            editorClassName={classes.editorClass}
            onEditorStateChange={onEditorStateChange}
            placeholder={editorPlaceholder}
        />
    )
};


export default TextEditor;
