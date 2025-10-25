import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography, Box, IconButton, MenuItem, InputLabel, FormControl,
    Paper
} from '@mui/material';
import { Close as CloseIcon, ArrowDropDown } from '@mui/icons-material';

// --- Replicating Design Colors and Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40';
const BACKGROUND_COLOR = '#FFFFFF';
const PAGE_BG = '#F4F6F9';

const roleOptions = ['Admin', 'Co-ordinator'];

const AddUserModal = ({ open, handleClose }) => {
    // State to control the visibility and value of the simulated dropdown
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(true); // Default open to match image
    const [selectedRole, setSelectedRole] = useState('Select an option');

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setIsRoleDropdownOpen(false);
    };

    // Custom TextField for consistent styling
    const CustomTextField = ({ label, placeholder, ...props }) => (
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
                variant="outlined"
                fullWidth
                size="small"
                value={props.value} // Use value for controlled input
                onChange={props.onChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                    mt: 1, 
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: BACKGROUND_COLOR,
                        '& fieldset': { borderColor: BORDER_COLOR },
                        '&.Mui-focused fieldset': { borderColor: PRIMARY_COLOR, borderWidth: '1px' },
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        fontSize: '14px',
                        color: TEXT_DARK,
                    },
                    '& .MuiInputBase-input::placeholder': { color: TEXT_MUTED, opacity: 1 },
                }}
            />
        </FormControl>
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            PaperProps={{
                sx: {
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: '450px', // Matches the width in the image
                    m: 0,
                    borderRadius: 0,
                    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: BACKGROUND_COLOR,
                },
            }}
            slotProps={{
                backdrop: {
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
                },
            }}
        >
            {/* Modal Header */}
            <DialogTitle sx={{
                borderBottom: `1px solid ${BORDER_COLOR}`,
                p: '20px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography variant="h6" sx={{ margin: 0, fontSize: '22px', fontWeight: '600', color: TEXT_DARK }}>
                    Add User
                </Typography>
                <IconButton onClick={handleClose} sx={{ color: TEXT_MUTED }}>
                    <CloseIcon sx={{ fontSize: '24px' }} />
                </IconButton>
            </DialogTitle>

            {/* Modal Body (Form Fields) */}
            <DialogContent sx={{ p: '25px 30px', flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
                <Box component="form" noValidate autoComplete="off">
                    
                    {/* Name of the user */}
                    <CustomTextField id="user-name" label="Name of the user" placeholder="Type here" />

                    {/* Choose user role (Simulated Dropdown Container) */}
                    <Box sx={{ mb: 3 }}>
                        <InputLabel shrink sx={{ color: TEXT_MUTED, fontWeight: 500, fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                            Choose user role
                        </InputLabel>
                        
                        {/* Selected Value Display (Custom Input/Button) */}
                        <Button
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            fullWidth
                            variant="outlined"
                            endIcon={<ArrowDropDown sx={{ color: TEXT_MUTED, fontSize: '16px' }} />}
                            sx={{
                                mt: 1,
                                height: '40px',
                                justifyContent: 'space-between',
                                textTransform: 'none',
                                color: selectedRole === 'Select an option' ? TEXT_MUTED : TEXT_DARK,
                                fontWeight: 400,
                                fontSize: '14px',
                                borderColor: BORDER_COLOR,
                                backgroundColor: isRoleDropdownOpen ? PAGE_BG : BACKGROUND_COLOR, // Highlight background when open
                                '&:hover': { borderColor: PRIMARY_COLOR, backgroundColor: isRoleDropdownOpen ? PAGE_BG : BACKGROUND_COLOR },
                            }}
                        >
                            {selectedRole}
                        </Button>
                    </Box>

                    {/* Dropdown Menu (Positioned Absolutely) */}
                    {isRoleDropdownOpen && (
                        <Paper sx={{
                            position: 'absolute',
                            top: '210px', // Adjusted to sit directly under the role selection button
                            left: '30px',
                            width: 'calc(100% - 60px)',
                            border: `1px solid ${BORDER_COLOR}`,
                            borderRadius: '4px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 2005,
                            py: 0.5
                        }}>
                            {roleOptions.map((role) => (
                                <MenuItem
                                    key={role}
                                    onClick={() => handleRoleSelect(role)}
                                    selected={role === selectedRole}
                                    sx={{
                                        py: 1.2,
                                        px: 2,
                                        fontSize: '14px',
                                        color: TEXT_DARK,
                                        fontWeight: role === selectedRole ? '600' : '400',
                                        backgroundColor: role === selectedRole ? `${PAGE_BG} !important` : BACKGROUND_COLOR,
                                        '&:hover': {
                                            backgroundColor: PAGE_BG,
                                        }
                                    }}
                                >
                                    {role}
                                </MenuItem>
                            ))}
                        </Paper>
                    )}
                </Box>
            </DialogContent>

            {/* Modal Footer */}
            <DialogActions sx={{
                borderTop: `1px solid ${BORDER_COLOR}`,
                p: '15px 30px',
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
                        fontWeight: '500',
                        fontSize: '14px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: PRIMARY_COLOR, opacity: 0.9 }
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;