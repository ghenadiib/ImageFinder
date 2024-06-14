import React, { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ImageResults = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={1}>
      {images.map((image) => (
        <Grid item key={image.id} xs={12} sm={6} lg={3}>
          <ImageListItem sx={{ height: 'auto' }}>
            <img
              style={{ height: '200px', objectFit: 'cover' }}
              srcSet={`${image.webformatURL}?w=248&h=100&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.webformatURL}?w=248&h=100&fit=crop&auto=format`}
              alt={image.tags}
              loading="lazy"
            />
            <ImageListItemBar
              title={image.tags}
              subtitle={`by ${image.user}`}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`info about ${image.tags}`}
                  onClick={() => handleClickOpen(image)}
                >
                  <ZoomInIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </Grid>
      ))}
      
      {/* Dialog component */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="image-dialog-title"
        aria-describedby="image-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="image-dialog-title">{selectedImage ? selectedImage.tags : ''}</DialogTitle>
        <DialogContent>
          <img
            style={{ maxWidth: '100%', height: 'auto' }}
            src={selectedImage ? selectedImage.largeImageURL : ''}
            alt={selectedImage ? selectedImage.tags : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ImageResults;
