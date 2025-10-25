import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, EmailOutlined, PhoneAndroidOutlined, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

// --- Replicating Design Colors and Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40';
const PAGE_BG = '#F4F6F9';
const BACKGROUND_COLOR = '#FFFFFF';

// Status and Role Colors
const SUCCESS_TEXT = '#155724';
const ADMIN_TEXT = '#007BFF';
const ADMIN_BG = '#EBF6FF';
const COORDINATOR_TEXT = '#856404';
const COORDINATOR_BG = '#FFF3CD';

const userData = [
    { id: 1, name: 'Dave Richards', role: 'Admin' },
    { id: 2, name: 'Abhishek Hari', role: 'Co-ordinator' },
    { id: 3, name: 'Nishta Gupta', role: 'Admin' },
];

// --- Custom Components ---

// Component for Role Tags
const RoleChip = ({ role }) => {
    const isPrimary = role === 'Admin';
    const colors = isPrimary 
        ? { text: ADMIN_TEXT, bg: ADMIN_BG }
        : { text: COORDINATOR_TEXT, bg: COORDINATOR_BG };

    return (
        <Chip
            label={role}
            size="small"
            sx={{
                fontWeight: 500,
                fontSize: '12px',
                height: '24px',
                borderRadius: '12px',
                color: colors.text,
                backgroundColor: colors.bg,
                border: 'none',
                '.MuiChip-label': { px: '8px' }
            }}
        />
    );
};

// Component for a custom table cell to match font/padding
const CustomTableCell = ({ children, isHeader = false, width = 'auto', textAlign = 'left', ...props }) => (
    <TableCell
        sx={{
            width: width,
            textAlign: textAlign,
            padding: '12px 16px', // Adjusted padding
            color: isHeader ? TEXT_MUTED : TEXT_DARK,
            fontSize: isHeader ? '12px' : '14px',
            fontWeight: isHeader ? 500 : 400,
            borderBottom: `1px solid ${BORDER_COLOR}`,
            '&:first-of-type': { pl: '16px' }, // Left padding for first column
            '&:last-of-type': { pr: '16px' }  // Right padding for last column
        }}
        {...props}
    >
        {children}
    </TableCell>
);


const OrganizationUsersView = ({ onAddUserClick, onBackClick }) => {
    
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
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}> {/* Align to flex-start for top alignment */}
                        {/* Organization Icon/Logo Placeholder */}
                        <Box sx={{
                            width: '70px', height: '70px', backgroundColor: PAGE_BG, borderRadius: '8px',
                            mr: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            border: `1px solid ${BORDER_COLOR}`
                        }}>
                            <AccountCircleIcon sx={{ color: TEXT_MUTED, fontSize: '36px' }} /> {/* Larger icon */}
                        </Box>
                        
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: TEXT_DARK, m: 0, fontSize: '20px' }}>
                                GITAM Institue of Technology
                            </Typography>
                            <Box sx={{ fontSize: '14px', color: TEXT_MUTED, mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                <EmailOutlined sx={{ fontSize: '16px', mr: 0.5 }} /> gitam@gitam.in
                            </Box>
                            <Box sx={{ fontSize: '14px', color: TEXT_MUTED, mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                <PhoneAndroidOutlined sx={{ fontSize: '16px', mr: 0.5 }} /> 91 - 9676456543
                            </Box>
                            <Typography sx={{ fontSize: '14px', color: PRIMARY_COLOR, mt: 0.5 }}>
                                Gitam.edu
                            </Typography>
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
                    <Button onClick={onBackClick} sx={{ 
                        p: '10px 15px', color: TEXT_MUTED, textTransform: 'none', borderRadius: 0, fontSize: '14px',
                        '&:hover': { background: 'none' }
                    }}>
                        Basic details
                    </Button>
                    <Button sx={{ 
                        p: '10px 15px', color: PRIMARY_COLOR, borderBottom: `2px solid ${PRIMARY_COLOR}`, 
                        fontWeight: 'bold', textTransform: 'none', borderRadius: 0, fontSize: '14px',
                        '&:hover': { background: 'none' }
                    }}>
                        Users
                    </Button>
                </Box>

                {/* --- Users Table Header & Add User Button --- */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px', px: '25px', backgroundColor: BACKGROUND_COLOR }}>
                    <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', color: TEXT_DARK, m: 0 }}>
                        Users
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onAddUserClick}
                        sx={{
                            backgroundColor: PRIMARY_COLOR,
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '8px 15px',
                            borderRadius: '4px',
                            '&:hover': { backgroundColor: PRIMARY_COLOR, opacity: 0.9 },
                        }}
                    >
                        + Add user
                    </Button>
                </Box>

                {/* --- Users Table --- */}
                <TableContainer sx={{ borderRadius: '0 0 8px 8px' }}>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0', backgroundColor: BACKGROUND_COLOR }}>
                        <TableHead>
                            <TableRow sx={{ borderBottom: `1px solid ${BORDER_COLOR}` }}>
                                <CustomTableCell isHeader width="5%">Sr. No</CustomTableCell>
                                <CustomTableCell isHeader width="35%">User name</CustomTableCell>
                                <CustomTableCell isHeader width="30%">Role</CustomTableCell>
                                <CustomTableCell isHeader width="30%" textAlign="right">Action</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((user, index) => (
                                <TableRow key={user.id}>
                                    <CustomTableCell sx={{ color: TEXT_DARK }}>{index + 1}</CustomTableCell>
                                    <CustomTableCell sx={{ fontWeight: 500 }}>{user.name}</CustomTableCell>
                                    <CustomTableCell>
                                        <RoleChip role={user.role} />
                                    </CustomTableCell>
                                    <CustomTableCell textAlign="right">
                                        <IconButton size="small" sx={{ color: TEXT_MUTED, opacity: 0.8, mr: 1.5 }}>
                                            <EditIcon sx={{ fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton size="small" sx={{ color: TEXT_MUTED, opacity: 0.8 }}>
                                            <DeleteIcon sx={{ fontSize: '18px' }} />
                                        </IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default OrganizationUsersView;