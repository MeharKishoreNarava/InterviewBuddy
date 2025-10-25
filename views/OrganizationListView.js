import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PersonOutline as PersonOutlineIcon } from '@mui/icons-material';

// --- Replicating Design Colors and Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40';
const PAGE_BG = '#F4F6F9';
const BACKGROUND_COLOR = '#FFFFFF';
const SUCCESS_TEXT = '#155724';
const SUCCESS_BG = '#d4edda';
const PENDING_BG = '#F0AD4E20'; // Custom for pending status

// Dummy Data
const organizations = [
    { id: 1, name: 'GITAM Institute of Technology', pendingRequests: 45, status: 'Active' },
    { id: 2, name: 'Loyola College', pendingRequests: 12, status: 'Pending' },
    { id: 3, name: 'KL University', pendingRequests: 0, status: 'Active' },
];

// Custom TableCell for consistent styling
const CustomTableCell = ({ children, isHeader = false, width = 'auto', textAlign = 'left', ...props }) => (
    <TableCell
        sx={{
            width: width,
            textAlign: textAlign,
            padding: '12px 16px', // Adjusted padding
            color: isHeader ? TEXT_MUTED : TEXT_DARK,
            fontSize: isHeader ? '12px' : '14px',
            fontWeight: isHeader ? 500 : 400,
            borderBottom: `1px solid ${BORDER_COLOR}`, // Consistent border
            '&:first-of-type': { pl: '16px' }, // Left padding for first column
            '&:last-of-type': { pr: '16px' }  // Right padding for last column
        }}
        {...props}
    >
        {children}
    </TableCell>
);

const OrganizationListView = ({ onAddClick, onViewUsersClick, onEditClick, onDeleteClick }) => {
    return (
        <Box sx={{ p: 4, backgroundColor: PAGE_BG, minHeight: '100%', boxSizing: 'border-box' }}>
            <Paper sx={{ p: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                {/* Header Section */}
                <Box sx={{ p: '20px 25px', borderBottom: `1px solid ${BORDER_COLOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: BACKGROUND_COLOR, borderRadius: '8px 8px 0 0' }}>
                    <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '600', color: TEXT_DARK }}>
                        B2B organizations
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onAddClick}
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
                        + Add organization
                    </Button>
                </Box>

                {/* Table Container */}
                <TableContainer>
                    <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0', backgroundColor: BACKGROUND_COLOR }}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell isHeader width="5%">Sr. No</CustomTableCell>
                                <CustomTableCell isHeader width="35%">Organization</CustomTableCell>
                                <CustomTableCell isHeader width="20%">Pending requests</CustomTableCell>
                                <CustomTableCell isHeader width="20%">Status</CustomTableCell>
                                <CustomTableCell isHeader width="20%" textAlign="right">Action</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {organizations.map((org, index) => (
                                <TableRow key={org.id}>
                                    <CustomTableCell>{index + 1}</CustomTableCell>
                                    <CustomTableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Small placeholder icon/logo */}
                                            <Box sx={{ 
                                                width: '32px', height: '32px', borderRadius: '4px', backgroundColor: PAGE_BG, 
                                                border: `1px solid ${BORDER_COLOR}`, mr: 1, 
                                                display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                            }}>
                                                <PersonOutlineIcon sx={{ fontSize: '18px', color: TEXT_MUTED }} />
                                            </Box>
                                            <Typography sx={{ fontWeight: 500, color: TEXT_DARK }}>{org.name}</Typography>
                                        </Box>
                                    </CustomTableCell>
                                    <CustomTableCell>{org.pendingRequests}</CustomTableCell>
                                    <CustomTableCell>
                                        <Chip
                                            label={org.status}
                                            size="small"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '12px',
                                                height: '24px',
                                                borderRadius: '12px',
                                                color: org.status === 'Active' ? SUCCESS_TEXT : TEXT_MUTED,
                                                backgroundColor: org.status === 'Active' ? SUCCESS_BG : PENDING_BG,
                                                border: 'none',
                                                '.MuiChip-label': { px: '8px' }
                                            }}
                                        />
                                    </CustomTableCell>
                                    <CustomTableCell textAlign="right">
                                        <IconButton size="small" onClick={() => onEditClick(org.id)} sx={{ color: TEXT_MUTED, opacity: 0.8, mr: 1.5 }}>
                                            <EditIcon sx={{ fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => onDeleteClick(org.id)} sx={{ color: TEXT_MUTED, opacity: 0.8 }}>
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

export default OrganizationListView;