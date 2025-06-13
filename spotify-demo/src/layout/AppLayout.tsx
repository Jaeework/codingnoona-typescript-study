import { Home, Search } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material'
import { NavLink, Outlet } from 'react-router'
import React from 'react';
import Library from './components/Library';
import Navbar from './components/Navbar';
import LibraryHead from './components/LibraryHead';

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "350px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "10px 8px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
    borderRadius: "4px",
  },
  "&.active": {
    color: theme.palette.text.primary
  }
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <Home />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <Search />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox height="100%">
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  )
}

export default AppLayout
