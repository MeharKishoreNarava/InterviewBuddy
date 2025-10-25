import React from 'react';
import { Box, Typography, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { Edit as EditIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

// --- Replicating Design Colors and Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40';
const PAGE_BG = '#F4F6F9';
const BACKGROUND_COLOR = '#FFFFFF';
const SUCCESS_TEXT = '#155724';
// SUCCESS_BG removed to fix the warning

// --- Custom Components for Consistency ---

// Component for a Read-Only Detail Field
const DetailDisplayField = ({ label, value }) => (
    <Box 
        sx={{
            p: '10px 15px',
            border: `1px solid ${BORDER_COLOR}`,
            backgroundColor: BACKGROUND_COLOR, // Ensure background is white
            borderRadius: '4px',
            boxSizing: 'border-box',
            height: '100%', // Ensure consistent height for grid items
        }}
    >
        <Typography sx={{ color: TEXT_MUTED, fontSize: '12px', mb: '2px', display: 'block' }}>
            {label}
        </Typography>
        <Typography sx={{ fontWeight: '500', fontSize: '14px', color: TEXT_DARK }}>
            {value}
        </Typography>
    </Box>
);

// Component for an Editable Input Field (re-using modal styles)
const CustomFormItem = ({ label, placeholder, defaultValue, type = 'text', isSelect = false, options = [], ...props }) => (
    <FormControl fullWidth sx={{ mb: '0px' }}> {/* Adjusted mb */}
        <InputLabel shrink htmlFor={label.toLowerCase().replace(/\s/g, '-')} sx={{ 
            color: TEXT_MUTED, 
            fontWeight: 500, 
            fontSize: '14px',
            transform: 'translate(0, -9px) scale(1)'
        }}>
            {label}
        </InputLabel>
        
        {isSelect ? (
            <Select
                id={label.toLowerCase().replace(/\s/g, '-')}
                defaultValue={defaultValue || ''}
                size="small"
                sx={{
                    mt: 1,
                    backgroundColor: BACKGROUND_COLOR, // Ensure select background is white
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER_COLOR },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY_COLOR },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY_COLOR, borderWidth: '1px' },
                    '& .MuiSelect-select': { padding: '10px 12px', fontSize: '14px', color: TEXT_DARK },
                }}
                {...props}
            >
                {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
            </Select>
        ) : (
            <TextField
                id={label.toLowerCase().replace(/\s/g, '-')}
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                variant="outlined"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: BACKGROUND_COLOR, // Ensure input background is white
                        '& fieldset': { borderColor: BORDER_COLOR },
                        '&:hover fieldset': { borderColor: PRIMARY_COLOR },
                        '&.Mui-focused fieldset': { borderColor: PRIMARY_COLOR, borderWidth: '1px' },
                    },
                    '& .MuiInputBase-input': { padding: '10px 12px', fontSize: '14px', color: TEXT_DARK },
                }}
                {...props}
            />
        )}
    </FormControl>
);

// --- Main Component ---
const OrganizationDetailsView = ({ onViewUsersClick }) => {
    
    return (
        <Box sx={{ p: 4, backgroundColor: PAGE_BG, minHeight: '100%', boxSizing: 'border-box' }}>
            <Paper sx={{ p: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                
                {/* --- Breadcrumb Navigation --- */}
                <Box sx={{ p: '15px 25px', borderBottom: `1px solid ${BORDER_COLOR}`, backgroundColor: BACKGROUND_COLOR, borderRadius: '8px 8px 0 0' }}>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '14px' }}>
                        &gt; Manage B2B organizations &gt; Organization details
                    </Typography>
                </Box>

                {/* --- Organization Header & Status --- */}
                <Box sx={{ p: '20px 25px', borderBottom: `1px solid ${BORDER_COLOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: BACKGROUND_COLOR }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Organization Logo Placeholder */}
                        <Box sx={{ 
                            width: '60px', height: '60px', borderRadius: '8px', backgroundColor: PAGE_BG, 
                            border: `1px solid ${BORDER_COLOR}`, mr: '15px',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                             <AccountCircleIcon sx={{ fontSize: '30px', color: TEXT_MUTED }} />
                        </Box>
                        
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: TEXT_DARK, m: 0, fontSize: '20px' }}>
                                Massachusetts Institute of Technology
                            </Typography>
                            <Box sx={{ fontSize: '12px', color: TEXT_MUTED, mt: 0.5 }}>
                                @mitdevops | 
                                <a href="#!" style={{ color: PRIMARY_COLOR, textDecoration: 'none', marginLeft: '5px', fontWeight: 500 }}>
                                    Org.details
                                </a>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: '5px' }}>
                        <Typography sx={{ fontSize: '12px', color: SUCCESS_TEXT, fontWeight: '500', mr: '10px' }}>
                            <Box component="span" sx={{ fontSize: '16px', lineHeight: 0, verticalAlign: 'middle', mr: 0.5 }}>&bull;</Box> Active
                        </Typography>
                        <Button sx={{ color: PRIMARY_COLOR, textTransform: 'none', fontWeight: 500, fontSize: '14px', p: '5px 10px' }}>
                            Change status
                        </Button>
                    </Box>
                </Box>

                {/* --- Tabs / Navigation --- */}
                <Box sx={{ borderBottom: `1px solid ${BORDER_COLOR}`, mb: '25px', display: 'flex', px: '25px', backgroundColor: BACKGROUND_COLOR }}>
                    <Button sx={{ 
                        p: '10px 15px', 
                        color: PRIMARY_COLOR, 
                        borderBottom: `2px solid ${PRIMARY_COLOR}`, 
                        fontWeight: 'bold',
                        borderRadius: 0,
                        textTransform: 'none',
                        fontSize: '14px',
                        '&:hover': { background: 'none' }
                    }}>
                        Basic details
                    </Button>
                    <Button onClick={onViewUsersClick} sx={{ 
                        p: '10px 15px', 
                        color: TEXT_MUTED,
                        textTransform: 'none',
                        borderRadius: 0,
                        fontSize: '14px',
                        '&:hover': { background: 'none' }
                    }}>
                        Users
                    </Button>
                </Box>

                {/* --- Profile Section Header --- */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER_COLOR}`, pb: '10px', mb: '20px', px: '25px', backgroundColor: BACKGROUND_COLOR }}>
                    <Typography variant="h6" sx={{ fontSize: '16px', margin: 0, fontWeight: '600', color: TEXT_DARK }}>
                        Profile
                    </Typography>
                    <Button startIcon={<EditIcon sx={{ fontSize: '14px' }} />} sx={{ color: PRIMARY_COLOR, textTransform: 'none', fontSize: '14px', p: '5px 10px' }}>
                        Edit
                    </Button>
                </Box>

                {/* --- Organization Details Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '0 0 15px 0', color: TEXT_DARK }}>
                        Organization details
                    </Typography>
                    
                    <Grid container spacing={2}> {/* Adjusted spacing */}
                        <Grid item xs={6}>
                            <DetailDisplayField label="Organization Type" value="Training/Coaching" />
                        </Grid>
                        <Grid item xs={6}>
                            <DetailDisplayField label="Timezone is set to" value="System" />
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Contact Details Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '30px 0 15px 0', color: TEXT_DARK }}>
                        Contact details
                    </Typography>
                    
                    <Grid container spacing={2}>
                        {/* Row 1: Name & Primary Email */}
                        <Grid item xs={6}>
                            <CustomFormItem label="Name" defaultValue="Taylor Swift" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomFormItem label="Primary Admin ID that is Email" defaultValue="taylor@gmail.com" type="email" />
                        </Grid>
                        
                        {/* Row 2: Secondary Email & Primary Phone */}
                        <Grid item xs={6}>
                            <CustomFormItem label="Secondary Email" defaultValue="gibson@gmail.com" type="email" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomFormItem label="Primary Phone No. that is Contact" defaultValue="+91 - 93475294013" />
                        </Grid>
                        
                        {/* Row 3: Secondary Phone Number (with code selector) - Simulating composite field */}
                        <Grid item xs={6} /> {/* Keep this to align the phone number field to the right */}
                        <Grid item xs={6}>
                             <InputLabel shrink sx={{ color: TEXT_MUTED, fontWeight: 500, fontSize: '14px', transform: 'translate(0, -9px) scale(1)' }}>
                                Secondary Phone No.
                            </InputLabel>
                            <Box sx={{ display: 'flex', gap: '10px', mt: 1 }}>
                                <CustomFormItem isSelect label="Code" defaultValue="+91" options={['+91', '+1']} sx={{ flexBasis: '30%', mr: 1 }} /> {/* Small adjustment */}
                                <CustomFormItem label="Number" defaultValue="93475294013" sx={{ flexBasis: '70%' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Maximum Allowed Coordinators Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '30px 0 15px 0', color: TEXT_DARK }}>
                        Maximum Allowed Coordinators
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomFormItem isSelect label="Maximum Allowed Coordinators" defaultValue="Upto 5 Coordinators" options={['Upto 5 Coordinators', 'Upto 10 Coordinators']} />
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Timezone Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '30px 0 15px 0', color: TEXT_DARK }}>
                        Timezone
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomFormItem isSelect label="Timezone" defaultValue="India Standard Time" options={['India Standard Time', 'EST', 'PST']} />
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Language Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '30px 0 15px 0', color: TEXT_DARK }}>
                        Language
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomFormItem isSelect label="Languages for Organization" defaultValue="English" options={['English', 'Hindi']} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomFormItem isSelect label="Region" defaultValue="India/Countries" options={['India/Countries', 'USA/Countries']} />
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Official Website URL Section --- */}
                <Box sx={{ px: '25px', backgroundColor: BACKGROUND_COLOR, pb: '30px', borderRadius: '0 0 8px 8px' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 'bold', m: '30px 0 15px 0', color: TEXT_DARK }}>
                        Official Website URL
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomFormItem label="Official Website URL" defaultValue="www.mit.edu" type="url" />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default OrganizationDetailsView;