import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const ListForm = ({ list, handleAdd, handleDelete, handleChange, label }) => {
  return (
    <Grid container>
      {list.map((element, index) => (
        <Grid 
          key={index} 
          container 
          xs={12} 
          spacing={1} 
          alignItems={'center'} 
          justifyContent='space-around'>

          <Grid xs={11}>
            <TextField
              margin="normal"
              multiline
              required
              fullWidth
              label={label}
              type="text"
              id="requirements"
              value={element}
              onChange={e => handleChange(index, e)}
            />
          </Grid>
          <Grid xs={1}>
            <IconButton onClick={() => handleDelete(index)} color="primary" aria-label="remove-platform">
              <RemoveCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid xs={1}>
        <IconButton onClick={handleAdd} color="primary" aria-label="add field">
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </ Grid>
  )
}

export default ListForm;