import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

  export default function NavSection({ data = [], ...other }) {
    return (
      <Box {...other}>
        <List disablePadding sx={{ p: 1 }}>
          {data.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </List>
      </Box>
    );
  }

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: '#f4f0ec',
          fontWeight: 'fontWeightBold',
        },
        '&:hover': {
          bgcolor: '#f4f0ec', // Change this to the desired hover background color
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
