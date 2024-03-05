import { forwardRef } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import patterns from '../../utils/patterns';

const getPlatfromIcom = (platform) => {
  switch (platform) {
    case 'youtube':
      return <YouTubeIcon />
    case 'facebook':
      return <FacebookIcon />
    case 'X':
      return <XIcon />
    case 'instagram':
      return <InstagramIcon />
    default:
      return null;
  }
}

const PlatformInput = forwardRef(({ removable, handleDelete, link, ...probs }, ref) => {
  return (
    <TextField
      ref={ref}
      {...probs}
      type="url"
      autoComplete="url"
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            {getPlatfromIcom(link?.match(patterns.platformsPattern)?.groups?.platform)}
            {removable &&
              <>
                <Divider orientation="vertical" flexItem variant='middle' />
                <IconButton color="primary" edge='end' onClick={handleDelete}>
                  <RemoveCircleOutlineIcon color='action' />
                </IconButton>
              </>
            }
          </InputAdornment>,
      }}
    />
  )
})

PlatformInput.displayName = 'PlatformInput'
export default PlatformInput