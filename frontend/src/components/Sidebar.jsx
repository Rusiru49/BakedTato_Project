import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ProfessionalSidebar = ({ onNavigate, activeSection }) => {
  // Styled components for better organization
  const BrandContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
  }));

  const MenuItem = styled(ListItem)(({ theme, active }) => ({
    padding: theme.spacing(1.5, 3),
    margin: theme.spacing(0.5, 0),
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    ...(active && {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      '& .MuiListItemText-primary': {
        fontWeight: 600,
      }
    })
  }));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: '#1A233A',
          color: '#ECF0F1',
          borderRight: 'none',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
        },
      }}
    >
      <BrandContainer>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 1 }}>
          BAKEDTATO
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Admin Dashboard
        </Typography>
      </BrandContainer>

      <Box sx={{ padding: 2 }}>
        <List>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              button
              onClick={() => onNavigate(item.id)}
              active={activeSection === item.id}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { letterSpacing: 0.5 }
                }}
              />
            </MenuItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', my: 2 }} />

        <MenuItem 
          button 
          onClick={() => onNavigate('logout')}
          sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{
              variant: 'body2',
              sx: { letterSpacing: 0.5 }
            }}
          />
        </MenuItem>
      </Box>
    </Drawer>
  );
};

export default ProfessionalSidebar;