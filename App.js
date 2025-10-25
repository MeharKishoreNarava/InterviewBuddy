import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material'; // FIX 1: Added IconButton
import { Menu as MenuIcon, Notifications as NotificationsIcon, HelpOutline as HelpOutlineIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material'; // Added specific icons

// Import all 5 design components
import OrganizationListView from './views/OrganizationListView';
import OrganizationDetailsView from './views/OrganizationDetailsView';
import OrganizationUsersView from './views/OrganizationUsersView';
import AddOrganizationModal from './components/AddOrganizationModal';
import AddUserModal from './components/Addusermodal'; 

// --- Centralized Constants ---
const PRIMARY_COLOR = '#6f42c1';
const BORDER_COLOR = '#EEEEEE';
const TEXT_MUTED = '#6C757D';
const TEXT_DARK = '#343A40'; // FIX 2: Defined TEXT_DARK
const PAGE_BG = '#F4F6F9';
const BACKGROUND_COLOR = '#FFFFFF';

function App() {
    // State to manage the active view displayed in the main content area
    const [activeView, setActiveView] = useState('list'); // 'list', 'details', 'users'

    // States to manage the visibility of the two modals
    const [isAddOrgModalOpen, setIsAddOrgModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    // Handlers for Modals
    const handleOpenOrgModal = () => setIsAddOrgModalOpen(true);
    const handleCloseOrgModal = () => setIsAddOrgModalOpen(false);
    const handleOpenUserModal = () => setIsAddUserModalOpen(true);
    const handleCloseUserModal = () => setIsAddUserModalOpen(false);

    // Generic Logo component for header
    const HeaderLogo = () => (
        <Box sx={{
            width: '40px',
            height: '40px',
            backgroundColor: PRIMARY_COLOR,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            mr: 2
        }}>
            LOGO
        </Box>
    );

    // --- Dynamic Component Rendering ---
    const renderActiveView = () => {
        const commonHandlers = {
            onAddClick: handleOpenOrgModal,
            onEditClick: (id) => setActiveView('details'),
            onViewUsersClick: () => setActiveView('users'),
            onAddUserClick: handleOpenUserModal,
            onBackClick: () => setActiveView('details'),
        };

        switch (activeView) {
            case 'list':
                return <OrganizationListView {...commonHandlers} />;
            case 'details':
                return <OrganizationDetailsView {...commonHandlers} />;
            case 'users':
                return <OrganizationUsersView {...commonHandlers} />;
            default:
                return <OrganizationListView {...commonHandlers} />;
        }
    };

    return (
        <Box sx={{ fontFamily: 'system-ui, sans-serif', backgroundColor: PAGE_BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* --- Top Header Bar and Navigation --- */}
            <Box sx={{ p: '10px 20px', backgroundColor: BACKGROUND_COLOR, borderBottom: `1px solid ${BORDER_COLOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" sx={{ color: TEXT_MUTED, mr: 1 }}><MenuIcon /></IconButton>
                    <HeaderLogo />
                    <Typography variant="body1" sx={{ color: TEXT_DARK, fontWeight: 'bold' }}>
                        B2B ADMIN PANEL
                    </Typography>
                </Box>
                
                {/* Right-aligned Icons and Navigation Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Icons */}
                    <IconButton size="small" sx={{ color: TEXT_MUTED }}><NotificationsIcon /></IconButton>
                    <IconButton size="small" sx={{ color: TEXT_MUTED }}><HelpOutlineIcon /></IconButton>
                    <IconButton size="small" sx={{ color: TEXT_MUTED }}><AccountCircleIcon /></IconButton>
                    
                    {/* Navigation Buttons (for easy testing/showcase) */}
                    <Box sx={{ ml: 2, borderLeft: `1px solid ${BORDER_COLOR}`, pl: 2 }}>
                        <Button onClick={() => setActiveView('list')} sx={{ color: activeView === 'list' ? PRIMARY_COLOR : TEXT_MUTED, fontWeight: activeView === 'list' ? 'bold' : 'normal' }}>List</Button>
                        <Button onClick={() => setActiveView('details')} sx={{ color: activeView === 'details' ? PRIMARY_COLOR : TEXT_MUTED, fontWeight: activeView === 'details' ? 'bold' : 'normal' }}>Details</Button>
                        <Button onClick={() => setActiveView('users')} sx={{ color: activeView === 'users' ? PRIMARY_COLOR : TEXT_MUTED, fontWeight: activeView === 'users' ? 'bold' : 'normal' }}>Users</Button>
                    </Box>
                </Box>
            </Box>

            {/* --- Main Content Area (Active View) --- */}
            <Box sx={{ flexGrow: 1 }}>
                {renderActiveView()}
            </Box>

            {/* --- Modals (Pop up over the active view) --- */}
            
            <AddOrganizationModal 
                open={isAddOrgModalOpen} 
                handleClose={handleCloseOrgModal}
            />

            <AddUserModal 
                open={isAddUserModalOpen} 
                handleClose={handleCloseUserModal}
            />
        </Box>
    );
}

export default App;