import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Button, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  marginLeft: '175px',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export default function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
                    onDrop:  acceptedFiles => {
                      setFiles(acceptedFiles.map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                      })))}, 
                    accept: 'image/*', 
                    noClick: true, 
                    noKeyboard: true, 
                    maxFiles:1
                  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

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

  const inputStyles = makeStyles((theme) => ({
    root: {
      height: "10px",
      width: "120px",
      margin: "0 30px 58px 0"
    },
  }));
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
  const submitbuttonStyles = makeStyles((theme) => ({
    root:{
      height: "40px",
      width: "100px",
      margin: "16px 0 10px 10px",
      padding: "0 14px 0 0",
      position: 'relative',
      left: '650px'
    },
  }));
  const cardStyles = makeStyles({
    root: {
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20px',
      width: '800px',
      boxShadow:"0px 0px 9px #6C6C6C",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const input_class = inputStyles();
  const button_class = buttonStyles();
  const submit_button_class = submitbuttonStyles();
  const card_class = cardStyles();
  
  let uploadIcon = {
    height: "30px",
    width: "30px",
    position: "relative",
    marginBottom: '10px'
  }

  return (
    <div className="container">
      <Card className={card_class.root}>
        <CardContent>
          <Typography className={card_class.title} color="textSecondary" gutterBottom>
            Image Upload
          </Typography>
        </CardContent>
        <form>
          <div style={{ marginLeft:'260px'}}>
            <TextField className={input_class.root} id="outlined-primary" label="Latitude" variant="outlined" />
            <TextField className={input_class.root} id="outlined-primary" label="Longtitude" variant="outlined" />
          </div>
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
        </form>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
        <CardActions>
          <Button 
            className={submit_button_class.root}
            color="primary"
            variant="contained"
            align="justify">
            {" "}Submit{" "}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
