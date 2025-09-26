import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Payment,
  Star,
  CheckCircle,
  VideoLibrary,
  Description,
  Quiz,
  School,
  Close
} from '@mui/icons-material';
import api from '../utils/api';

const SubscriptionDialog = ({ 
  open, 
  onClose, 
  courseId, 
  courseName, 
  year, 
  onSubscriptionSuccess 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/api/subscription/initiate', {
        courseId,
        year: parseInt(year),
        phoneNumber: phoneNumber.replace(/\D/g, '') // Remove non-digits
      });

      setPaymentInitiated(true);
      setSuccess('Payment request sent! Please check your phone for M-Pesa prompt and enter your PIN to complete the payment.');
      
      // Poll for payment status
      pollPaymentStatus(response.data.subscription.id);

    } catch (err) {
      setError(err.response?.data?.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (subscriptionId) => {
    let attempts = 0;
    const maxAttempts = 36; // Poll for 6 minutes (10s intervals)

    const checkStatus = async () => {
      try {
        // First try the regular status endpoint
        const response = await api.get(`/api/subscription/status/${subscriptionId}`);
        const subscription = response.data.subscription;

        if (subscription.status === 'completed') {
          setSuccess('🎉 Payment successful! Your premium subscription is now active.');
          setTimeout(() => {
            onSubscriptionSuccess(subscription);
            handleClose();
          }, 2000);
          return;
        } else if (subscription.status === 'failed') {
          setError('❌ Payment failed. Please try again or check your M-Pesa balance.');
          setPaymentInitiated(false);
          return;
        }

        // If still pending after 2 minutes, try querying M-Pesa directly
        if (attempts > 12) {
          try {
            const queryResponse = await api.get(`/api/subscription/query/${subscriptionId}`);
            const queriedSubscription = queryResponse.data.subscription;
            
            if (queriedSubscription.status === 'completed') {
              setSuccess('🎉 Payment confirmed! Your premium subscription is now active.');
              setTimeout(() => {
                onSubscriptionSuccess(queriedSubscription);
                handleClose();
              }, 2000);
              return;
            } else if (queriedSubscription.status === 'failed') {
              setError('❌ Payment failed. Please try again.');
              setPaymentInitiated(false);
              return;
            }
          } catch (queryErr) {
            console.log('Direct M-Pesa query failed, continuing with regular polling');
          }
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          setError('⏰ Payment timeout. If you completed the payment, please wait a few minutes and refresh the page.');
          setPaymentInitiated(false);
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000);
        } else {
          setError('Unable to verify payment status. Please contact support if payment was deducted.');
          setPaymentInitiated(false);
        }
      }
    };

    setTimeout(checkStatus, 3000); // Start checking after 3 seconds
  };

  const handleClose = () => {
    setPhoneNumber('');
    setError('');
    setSuccess('');
    setPaymentInitiated(false);
    setLoading(false);
    onClose();
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('254')) {
      return digits;
    } else if (digits.startsWith('0')) {
      return '254' + digits.substring(1);
    } else if (digits.startsWith('7') || digits.startsWith('1')) {
      return '254' + digits;
    }
    return digits;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Star />
        <Box>
          <Typography variant="h6">Premium Subscription</Typography>
          <Typography variant="caption">
            {courseName} - Year {year}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {!paymentInitiated ? (
          <>
            {/* Subscription Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                KSH 100
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  / month
                </Typography>
              </Typography>
              <Chip 
                label="1 Month Access" 
                color="primary" 
                size="small" 
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Get premium access to Year {year} content for {courseName}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Features */}
            <Typography variant="h6" gutterBottom>
              What's Included:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <VideoLibrary color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Premium Video Lectures"
                  secondary="Stream high-quality lecture recordings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Description color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Downloadable Notes"
                  secondary="Download PDF notes for offline study"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Quiz color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="CATs & Past Exams"
                  secondary="Access to premium assessment materials"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Course-Specific Access"
                  secondary="Valid only for this course and year"
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Payment Form */}
            <Typography variant="h6" gutterBottom>
              M-Pesa Payment:
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="0712345678 or 254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              helperText="Enter your M-Pesa registered phone number"
              sx={{ mb: 2 }}
            />

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                You will receive an M-Pesa prompt on your phone. Enter your M-Pesa PIN to complete the payment.
              </Typography>
            </Alert>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Processing Payment...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your phone for M-Pesa prompt and enter your PIN
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        {!paymentInitiated && (
          <Button
            variant="contained"
            onClick={handlePayment}
            disabled={loading || !phoneNumber}
            startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Processing...' : 'Pay KSH 100'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog;
