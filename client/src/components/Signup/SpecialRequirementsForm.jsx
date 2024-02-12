import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2/Grid2';


const SpecialRequirementsForm = ({ requirements, setRequirements }) => {

  const handleAdd = () => {
    setRequirements(oldReqs => [...oldReqs, '']);
  };

  const handleDelete = (deletedIndex) => {
    setRequirements(oldReqs => oldReqs.filter((_, index) => index !== deletedIndex))
  }

  const handleChange = (index, newValue) => {
    setRequirements(oldReqs => oldReqs.slice(0, index).concat([newValue, ...oldReqs.slice(index+1)]))
  }

  return (
    <Box>
      <FormLabel>Add your special requirements</FormLabel>
      {requirements.map((requirement, index) => (
        <Grid key={index} container alignItems={'center'} justifyContent='space-around'>
          <Grid xs={10}>
            <TextField
              margin="normal"
              multiline
              required
              fullWidth
              label="write any special requirement"
              type="text"
              id="requirements"
              value={requirement}
              onChange={e => handleChange(index, e.target.value)}
            />
          </Grid>
          <Grid xs={1}>
            <IconButton onClick={() => handleDelete(index)} color="primary" aria-label="remove-platform">
              <RemoveCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <IconButton onClick={handleAdd} color="primary" aria-label="add field">
        <AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default SpecialRequirementsForm;