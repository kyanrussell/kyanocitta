import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const gitSha = process.env.REACT_APP_GIT_SHA || "unknown";

// Styled Components
const HeaderContainer = styled.header`
  width: 100%;
  text-align: center;
  background-color: steelblue;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 25vh;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerTitle = styled.h1`
  color: aliceblue;
  position: absolute;
  top: 75%;
  left: 45%;
  transform: translate(-100%, -50%);
  font-size: 3rem;
  text-shadow: 0 0 8px rgba(0,0,0,0.7);
  margin: 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const Nav = styled.nav`
  background-color: steelblue;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const DropButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

// Dropdown Content
const DropdownContent = styled.ul`
  display: none;
  position: absolute;
  background-color: white;
  min-width: 120px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
  list-style: none;
  padding: 0;

  li {
    list-style: none;
  }

  a {
    display: block;
    color: black;;
    text-decoration: none;
    padding: 10px;

    &:hover {
      background-color: #ddd;
    }
  }
`;

// Show dropdown on hover
const DropdownWrapper = styled.div`
  position: relative;

  &:hover ${DropdownContent} {
    display: block;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* Banner Image */}
      <Banner>
        <BannerImage src="https://inaturalist-open-data.s3.amazonaws.com/photos/429421290/original.jpeg" alt="Banner" />
        <BannerTitle> kyanocitta </BannerTitle>
      </Banner>

      {/* Navigation Bar */}
      <Nav>
        <NavList>
          <DropdownWrapper>
            <DropButton>Blog ▼</DropButton>
            <DropdownContent>
              <li><Link to="/"> Blog </Link></li>
              <li><Link to="/midway"> Midway </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>Resources ▼</DropButton>
            <DropdownContent>
              <li><Link to="/Seawatch"> Seawatch </Link></li>
              <li><Link to="/Identification"> Identification </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>Gallery ▼</DropButton>
            <DropdownContent>
              <li><Link to="/Birds"> Birds </Link></li>
              <li><Link to="/Plants"> Plants </Link></li>
              <li><Link to="/Landscapes"> Landscapes </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>More ▼</DropButton>
            <DropdownContent>
              <li><Link to="/About"> About </Link></li>
            </DropdownContent>
          </DropdownWrapper>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

