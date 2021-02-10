import React, { useState } from 'react';
import axios from 'axios';

import {
  Typography,
  MenuItem,
  TextField,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import validationSchema from '../../../Utils/validations/addNewHouse';

import useStyles from './style';

function AddHouse() {
  const classes = useStyles();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Gaza');
  const [category, setCategory] = useState('Apartment');
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathRooms] = useState(1);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState(10);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // eslint-disable-next-line consistent-return
  const handleChange = ({ target: { value, name } }) => {
    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'description':
        setDescription(value);
        break;
      case 'rooms':
        setRooms(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'bathrooms':
        setBathRooms(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'area':
        setArea(value);
        break;
      case 'image':
        setImage(value);
        break;
      default:
        return '';
    }
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const houseData = {
        title,
        description,
        location,
        category,
        rooms,
        bathrooms,
        price,
        area,
        image,
      };
      console.log(houseData);
      setLoading(true);
      await validationSchema.validate(houseData, { abortEarly: false });
      await axios.post(`api/v1/houses`, houseData);
      setLoading(false);
      setTitle('');
      setDescription('');
      setRooms(1);
      setBathRooms(1);
      setPrice(0);
      setArea(10);
      setImage('');
      return houseData;
    } catch (err) {
      setError(err.response ? err.response.data.message : err.errors[0]);
      setLoading(false);
    }
  };

  const locations = ['Gaza', 'Khanyunis', 'ALwosta', 'Rafah', 'North'];
  const categories = ['Apartment', 'Single-Family', 'studio', 'roof'];

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || 'Congrats! Signed up Successfully'}
        </Alert>
      </Snackbar>
      <Typography
        variant="h3"
        component="h2"
        color="primary"
        className={classes.header}
      >
        Add New House
      </Typography>
      <form className={classes.form}>
        <Input
          value={title}
          className={classes.input}
          variant="outlined"
          type="text"
          onChange={handleChange}
          label="Title"
          name="title"
          required
        />
        <Input
          className={classes.input}
          variant="outlined"
          type="text"
          onChange={handleChange}
          value={description}
          label="Description"
          name="description"
          required
        />
        <TextField
          className={classes.input}
          variant="outlined"
          select
          onChange={handleChange}
          value={location}
          label="Location"
          name="location"
          required
        >
          {locations.map((city, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={idx} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.input}
          variant="outlined"
          select
          onChange={handleChange}
          value={category}
          label="Category"
          name="category"
          required
        >
          {categories.map((cat, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={idx} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Input
          className={classes.numberInput}
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={rooms}
          label="Rooms"
          name="rooms"
          required
        />
        <Input
          className={classes.numberInput}
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={bathrooms}
          label="Bathrooms"
          name="bathrooms"
          required
        />
        <Input
          className={classes.numberInput}
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={area}
          label="Area"
          name="area"
          required
        />
        <Input
          className={classes.numberInput}
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={price}
          label="Price"
          name="price"
          required
        />
        <Input
          className={classes.input}
          variant="outlined"
          type="text"
          onChange={handleChange}
          value={image}
          label="Image"
          name="image"
          required
        />
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          event={handleSubmit}
        >
          {loading ? <CircularProgress size={25} /> : 'Add'}
        </Button>
      </form>
    </div>
  );
}

export default AddHouse;
