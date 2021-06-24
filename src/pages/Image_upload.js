import { React, useState } from 'react';
import Dropzone from '../components/Dropzone'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export default function Image_map() {
    const [image, setImage] = useState(null);
    const [latitude, setLat] = useState(null);
    const [longtitude, setLng] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const onResetHandler = () => {
        setImage(null);
        setLat(null);
        setLng(null)
        document.getElementById("latitude").value = ''
        document.getElementById("longtitude").value = ''
    };
    const onSubmitHandler = () => {
      if(!image || !latitude || !longtitude){
        setSuccess(false)
      }
      else{
        setLoading(true)
        const url = "http://localhost:5000/image_upload";
        var data = {
          "location": {
            "type": "Point",
            "coordinates": [parseFloat(longtitude), parseFloat(latitude)]
          },
          "image": image,
        }
        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        .then((res) => {
          console.log(res.status)
          setLoading(null)
          onResetHandler()
          setSuccess(true)
        })
        .catch((error) => console.error("Error:", error))
      }
    };

    const inputStyles = makeStyles((theme) => ({
      root: {
        height: "10px",
        width: "120px",
        margin: "0 30px 58px 0"
      },
    }));
    const submitbuttonStyles = makeStyles((theme) => ({
      root:{
        height: "40px",
        width: "100px",
        margin: "16px 0 10px 10px",
        padding: "0 14px 0 0",
        position: 'relative',
        left: '550px'
      },
    }));
    const resetbuttonStyles = makeStyles((theme) => ({
      root:{
        height: "40px",
        width: "100px",
        margin: "16px 0 10px 10px",
        padding: "0 14px 0 0",
        position: 'relative',
        left: '525px'
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
    const LoadingStyles = makeStyles((theme) => ({
      root:{
        position: 'relative',
         left: '375px',
        margin: "100px 0 100px ",
      },
    }));
    const input_class = inputStyles();
    const submit_button_class = submitbuttonStyles();
    const card_class = cardStyles();
    const reset_button_class = resetbuttonStyles();
    const loading_class = LoadingStyles();

    return(
        <>
          {(success === true) && <Alert severity="success" onClose={() => setSuccess(null)}>Upload Successfully</Alert>}
          {(success === false) && <Alert severity="error" onClose={() => setSuccess(null)}>Fill whole form  — <strong>Idiot!!!!!!!!</strong></Alert>}
          <div className="container">
            <Card className={card_class.root}>
              <CardContent>
                <Typography className={card_class.title} color="textSecondary" gutterBottom>
                  Image Upload
                </Typography>
              </CardContent>
              <div>
                <div style={{ marginLeft:'260px'}}>
                  <TextField className={input_class.root} id='latitude' label="Latitude" variant="outlined" onChange={e => setLat(e.target.value)}/>
                  <TextField className={input_class.root} id="longtitude" label="Longtitude" variant="outlined" onChange={e => setLng(e.target.value)}/>
                </div>
                {!image && !loading && <Dropzone setImage={setImage} />}
                {image && !loading && (
                    <>
                      <div style={{position:'relative', left:'300px'}}>
                        <p style={{position:'relative', left:'35px', marginBottom:"10px"}}>
                            👇 your image
                        </p>
                        <img className="rounded-md w-full" src={image} style={{height:"200px", width:'200px'}}/>
                      </div>
                    </>
                )}
                {loading && <CircularProgress className={loading_class.root}/>}
              </div>
              <CardActions>
                <Button 
                  className={reset_button_class.root}
                  color="primary"
                  variant="contained"
                  align="justify"
                  onClick={onResetHandler}>
                  {" "}Reset{" "}
                </Button>
                <Button 
                  className={submit_button_class.root}
                  color="primary"
                  variant="contained"
                  align="justify"
                  onClick={onSubmitHandler}>
                  {" "}Submit{" "}
                </Button>
              </CardActions>
            </Card>
        </div>
      </>
    )
}