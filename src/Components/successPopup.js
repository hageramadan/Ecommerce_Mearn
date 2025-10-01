import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: '1rem',
    maxWidth: '450px',
    width: '90%'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem'
}));

const EmailBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  backgroundColor: '#f3f4f6',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  marginTop: '1rem'
}));

const SuccessPopup = ({ open, onClose, email }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="success-dialog-title"
      aria-describedby="success-dialog-description"
    >
      <DialogContent>
        <IconWrapper>
          <CheckCircleOutlineIcon 
            sx={{ 
              fontSize: 64, 
              color: '#22c55e'
            }} 
          />
        </IconWrapper>
        
        <DialogTitle 
          id="success-dialog-title" 
          sx={{ 
            textAlign: 'center', 
            fontSize: '1.75rem', 
            fontWeight: 700,
            padding: '0 0 1rem 0'
          }}
        >
          Registration Successful!
        </DialogTitle>
        
        <Typography
          id="success-dialog-description"
          sx={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: 1.6
          }}
        >
          Please check your email and verify your account to complete the registration process.
        </Typography>
        
        <EmailBox>
          <EmailIcon sx={{ color: '#6b7280' }} />
          <Typography 
            sx={{ 
              color: '#374151', 
              fontWeight: 500,
              fontSize: '0.95rem'
            }}
          >
            {email}
          </Typography>
        </EmailBox>
      </DialogContent>
      
      <DialogActions sx={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#000000',
            color: 'white',
            padding: '0.875rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1f2937'
            }
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default SuccessPopup;