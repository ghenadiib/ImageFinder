import React, { useEffect } from 'react'
import { TextField } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults'

const Search = () => {

const [search, setSearch] = useState("");
const [amount, setAmount] = useState(5);
const apiUrl = "https://pixabay.com/api";
const [images, setImages] = useState([]);

useEffect(() => {
  if (search === '') {
    setImages([]);
  } else {
    (async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/?key=${process.env.REACT_APP_API_KEY}&q=${search}&image_type=photo&per_page=${amount}&safesearch=true`
        );
        setImages(res.data.hits);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    })();
  }
}, [search, amount]);


  return (
    <div className='m-3'>
        <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth={true}  onChange={(event) => setSearch(event.target.value)}/>
        <div className='my-3'>
        <Box sx={{width: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
        <Select sx={{textAlign: 'center'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={amount}
          label="Amount"
          onChange={(event) => setAmount(event.target.value)}
          name='amount'
          
        > 
          <MenuItem sx={{justifyContent: 'center'}} value={5}>5</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}} value={10}>10</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}} value={20}>20</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}} value={30}>30</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}} value={40}>40</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}} value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
    {images.length > 0 ? (<ImageResults images={images} />) : null}
    </div>
  )
}
export default Search;
