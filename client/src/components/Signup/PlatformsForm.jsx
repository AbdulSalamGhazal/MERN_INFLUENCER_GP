import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

const platformOptions = [
  'YouTube',
  'X',
  'Snapchat',
  'Instagram',
  'Facebook',
  'TikTok'
]

// const getRemainingPlatforms = platforms => {
//   const addedPlatforms = platforms.map(p => p.name);
//   return platformOptions.filter(platform => addedPlatforms.includes(platform));
// }

const PlatformRow = ({
  index,
  platformName, handleNameChange,
  url, handleUrlChange,
  handleRemovePlatform,
  removable
}) => {
  return (
    <Grid container spacing={1} alignItems={'center'} justifyContent={'space-around'}>
      <Grid xs={3}>
        {/* <FormControl required fullWidth> */}
          {/* <InputLabel id="platform">Platform</InputLabel> */}
          <TextField
            margin='normal'
            fullWidth
            required
            select
            id="platform"
            value={platformName}
            label="Platform"
            onChange={e => handleNameChange(index, e.target.value)}
          >
            {platformOptions.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>)}
          </TextField>
        {/* </FormControl> */}
      </Grid>
      <Grid xs={8}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="platform URL"
          type="url"
          id="platformUrl"
          autoComplete="url"
          value={url}
          onChange={e => handleUrlChange(index, e.target.value)}
        />
      </Grid>
      {removable &&
        <Grid xs={1}>
          <IconButton onClick={() => handleRemovePlatform(index)} color="primary" aria-label="remove-platform" sx={{mt: 1}}>
            <RemoveCircleIcon />
          </IconButton>
        </Grid>
      }
    </Grid>
  )
}

const PlatformsForm = ({ platforms, setPlatforms, avgCost, setAvgCost }) => {

  const handleAddPlatform = () => {
    setPlatforms(oldPlatforms => [...oldPlatforms, { name: '', url: '' }]);
  };

  const handleDeletePlatform = (deletedIndex) => {
    setPlatforms(oldPlatforms => oldPlatforms.filter((_, index) => index !== deletedIndex))
  }

  const handlePlatformNameChange = (changedIndex, newName) => {
    setPlatforms(oldPlatforms => oldPlatforms.map((platform, index) => (
      index === changedIndex ? { ...platform, name: newName } : platform
    )))
  }

  const handlePlatformUrlChange = (changedIndex, newUrl) => {
    setPlatforms(oldPlatforms => oldPlatforms.map((platform, index) => (
      index === changedIndex ? { ...platform, url: newUrl } : platform
    )))
  }

  return (
    <Box>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Average cost"
        type="number"
        id="avgCost"
        value={avgCost}
        onChange={e => setAvgCost(e.target.value)}
      />
      <FormControl margin='normal' fullWidth>
        <FormLabel>Add your social media accounts</FormLabel>
        {platforms.map((platform, index) => (
          <PlatformRow
            key={index}
            index={index}
            platformName={platform.name}
            handleNameChange={handlePlatformNameChange}
            url={platform.url}
            handleUrlChange={handlePlatformUrlChange}
            handleRemovePlatform={handleDeletePlatform}
            removable={platforms.length > 0} />
        ))}
      </FormControl>
      <IconButton onClick={handleAddPlatform} color="primary" aria-label="add field">
        <AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default PlatformsForm;