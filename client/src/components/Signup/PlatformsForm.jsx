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
import Grid from '@mui/material/Unstable_Grid2/Grid2';

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
    <Grid container spacing={1} alignItems={'center'}>
      <Grid xs={4}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="platform">Platform</InputLabel>
          <Select
            labelId="platform"
            id="platform"
            value={platformName}
            label="Platform"
            onChange={e => handleNameChange(index, e.target.value)}
          >
            {platformOptions.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="platform URL"
          type="url"
          id="platformUrl"
          // autoComplete="image"
          value={url}
          onChange={e => handleUrlChange(index, e.target.value)}
        />
      </Grid>
      {removable &&
        <Grid>
          <IconButton onClick={() => handleRemovePlatform(index)} color="primary" aria-label="remove-platform">
            <RemoveCircleIcon />
          </IconButton>
        </Grid>
      }
    </Grid>
  )
}

const PlatformsForm = ({ platforms, setPlatforms }) => {

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
      <IconButton onClick={handleAddPlatform} color="primary" aria-label="add field">
        <AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default PlatformsForm;