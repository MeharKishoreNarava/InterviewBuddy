import React from 'react'; // FIX: Removed 'useState' from React import
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography, Box, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// --- Replicating Design Colors and Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40';
const BACKGROUND_COLOR = '#FFFFFF';
const PAGE_BG = '#F4F6F9';

const AddOrganizationModal = ({ open, handleClose }) => {
    // Custom TextField for consistent styling
    const CustomTextField = ({ label, placeholder, type = 'text', ...props }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel shrink htmlFor={props.id} sx={{ 
                color: TEXT_MUTED, 
                fontWeight: 500, 
                fontSize: '14px',
                transform: 'translate(0, -9px) scale(1)' // Adjust label position
            }}>
                {label}
            </InputLabel>
            <TextField
                id={props.id}
                placeholder={placeholder}
                type={type}
                variant="outlined"
                fullWidth
                size="small" // Makes the input field smaller, matching image
                InputLabelProps={{ shrink: true }}
                sx={{
                    mt: 1, // Space between label and input
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: BACKGROUND_COLOR,
                        '& fieldset': {
                            borderColor: BORDER_COLOR,
                        },
                        '&:hover fieldset': {
                            borderColor: PRIMARY_COLOR,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: PRIMARY_COLOR,
                            borderWidth: '1px',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px 12px', // Matches original input style
                        fontSize: '14px',
                        color: TEXT_DARK,
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: TEXT_MUTED,
                        opacity: 1,
                    },
                }}
                {...props}
            />
        </FormControl>
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen // This makes it take full screen initially, we will override with custom PaperProps
            PaperProps={{
                sx: {
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: '500px', // Matches the width in your image
                    m: 0, // Remove default margin
                    borderRadius: 0, // No border radius for right-aligned drawer look
                    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: BACKGROUND_COLOR,
                },
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Light backdrop, as per image background
                    },
                },
            }}
        >
            {/* Modal Header */}
            <DialogTitle sx={{
                borderBottom: `1px solid ${BORDER_COLOR}`,
                p: '20px 30px', // Matches original padding
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: BACKGROUND_COLOR, // Ensure header background is white
            }}>
                <Typography variant="h6" sx={{ margin: 0, fontSize: '22px', fontWeight: '600', color: TEXT_DARK }}>
                    Add Organization
                </Typography>
                <IconButton onClick={handleClose} sx={{ color: TEXT_MUTED, fontSize: '20px' }}>
                    <CloseIcon sx={{ fontSize: '24px' }} />
                </IconButton>
            </DialogTitle>

            {/* Modal Body (Form Fields) */}
            <DialogContent sx={{ p: '25px 30px', flexGrow: 1, overflowY: 'auto', backgroundColor: BACKGROUND_COLOR }}>
                <Box component="form" noValidate autoComplete="off">
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <CustomTextField id="org-name" label="Name of the organization" placeholder="Text" />
                        <CustomTextField id="org-slug" label="Slug" placeholder="Type here" />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', mt: 1 }}>
                        <CustomTextField id="org-mail" label="Organization mail" placeholder="Type here" type="email" />
                        <CustomTextField id="org-contact" label="Contact" placeholder="Type here" />
                    </Box>

                    {/* Additional fields if needed, mimicking layout from earlier versions */}
                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel shrink htmlFor="org-type" sx={{ 
                                color: TEXT_MUTED, 
                                fontWeight: 500, 
                                fontSize: '14px',
                                transform: 'translate(0, -9px) scale(1)'
                            }}>
                                Organization Type
                            </InputLabel>
                            <Select
                                id="org-type"
                                value="" // Controlled component value
                                onChange={() => {}} // Handle change
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    mt: 1,
                                    backgroundColor: BACKGROUND_COLOR,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: BORDER_COLOR,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: PRIMARY_COLOR,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: PRIMARY_COLOR,
                                        borderWidth: '1px',
                                    },
                                    '& .MuiSelect-select': {
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        color: TEXT_MUTED, // Placeholder color
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <Typography sx={{ color: TEXT_MUTED }}>Select Type</Typography>
                                </MenuItem>
                                <MenuItem value="training">Training/Coaching</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel shrink htmlFor="org-address" sx={{ 
                                color: TEXT_MUTED, 
                                fontWeight: 500, 
                                fontSize: '14px',
                                transform: 'translate(0, -9px) scale(1)'
                            }}>
                                Address
                            </InputLabel>
                            <TextField
                                id="org-address"
                                placeholder="Enter address..."
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mt: 1,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: BACKGROUND_COLOR,
                                        '& fieldset': {
                                            borderColor: BORDER_COLOR,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: PRIMARY_COLOR,
                                            borderWidth: '1px',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        color: TEXT_DARK,
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: TEXT_MUTED,
                                        opacity: 1,
                                    },
                                }}
                            />
                        </FormControl>
                    </Box>

                </Box>
            </DialogContent>

            {/* Modal Footer */}
            <DialogActions sx={{
                borderTop: `1px solid ${BORDER_COLOR}`,
                p: '15px 30px', // Matches original padding
                justifyContent: 'flex-end',
                backgroundColor: BACKGROUND_COLOR,
            }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        padding: '8px 20px',
                        border: `1px solid ${BORDER_COLOR}`,
                        backgroundColor: BACKGROUND_COLOR,
                        mr: '10px',
                        borderRadius: '4px',
                        color: TEXT_MUTED, // Cancel text color is lighter
                        fontWeight: '500',
                        fontSize: '14px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: PAGE_BG, // Slight hover effect
                            borderColor: TEXT_MUTED,
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        padding: '8px 20px',
                        backgroundColor: PRIMARY_COLOR,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '14px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: PRIMARY_COLOR,
                            opacity: 0.9,
                        }
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrganizationModal;