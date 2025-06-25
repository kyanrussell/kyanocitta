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

const Logo = styled.img`
  object-fit: scale-down;
  margin-right: 1rem;
  height: 100%;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerTitle = styled.h1`
  display: flex;
  align-items: center;
  color: aliceblue;
  position: absolute;
  height: 40%;
  bottom: 5%;
  font-size: xxx-large;
  text-shadow: 0 0 8px rgba(0,0,0,0.7);
  text-align: center;
  margin: 0 0 0 10%;

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
        <BannerTitle>
          <Logo src="/kyanocitta/images/stja_round.png" alt="Logo" />
          kyanocitta
        </BannerTitle>
      </Banner>

      {/* Navigation Bar */}
      <Nav>
        <NavList>
          <DropdownWrapper>
            <DropButton>Blog ▼</DropButton>
            <DropdownContent>
              <li><Link to="/blog"> Blog </Link></li>
              <li><Link to="/midway"> Midway </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>Seawatch ▼</DropButton>
            <DropdownContent>
              <li><Link to="/seawatch/guide"> Guide </Link></li>
              <li><Link to="/seawatch/compare"> Compare Species </Link></li>
              <li><Link to="/seawatch/calendar"> Calendar </Link></li>
              <li><Link to="/seawatch/highlights"> Highlights </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>Gallery ▼</DropButton>
            <DropdownContent>
              <li><Link to="/identification"> Identification </Link></li>
              <li><Link to="/birds"> Birds </Link></li>
              <li><Link to="/plants"> Plants </Link></li>
              <li><Link to="/landscapes"> Landscapes </Link></li>
            </DropdownContent>
          </DropdownWrapper>

          <DropdownWrapper>
            <DropButton>More ▼</DropButton>
            <DropdownContent>
              <li><Link to="/about"> About </Link></li>
            </DropdownContent>
          </DropdownWrapper>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

