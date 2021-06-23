import React, {useMemo, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as  FaIcons from 'react-icons/fa';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  paddingTop: '80px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '60%',
  height: '250px'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function StyledDropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Do whatever you want with the file contents
        const str = reader.result;
        props.setImage(str);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
                    onDrop, 
                    accept: 'image/*', 
                    noClick: true, 
                    noKeyboard: true, 
                    maxFiles:1
                  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const buttonStyles = makeStyles((theme) => ({
    root: {
      height: "40px",
      width: "150px",
      margin: "16px 0 0 10px",
      padding: "0 16px 0 0", 
      position: 'relative',
      right: "8px"
    },
  }));
  
  const button_class = buttonStyles();
  
  let uploadIcon = {
    height: "30px",
    width: "30px",
    position: "relative",
    marginBottom: '10px'
  }

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <FaIcons.FaUpload style={uploadIcon}/>
        <p>Drag and drop some files here, or click to select files</p>
        <Button
          className={button_class.root}
          variant="contained"
          color="primary"
          align="justify"
          onClick={open}
        >
          {" "}Select File{" "}
        </Button>
      </div>
    </div>
  );
}
