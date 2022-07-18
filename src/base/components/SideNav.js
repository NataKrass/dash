import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar, MenuItem, List, InlineLink, Block } from 'base/styled';
import { useLocation } from 'react-router-dom';
import {selectRouteByKey} from 'navigation/routes.js';
import styled from 'styled-components';
import { arrayOf, shape, bool, string, elementType } from 'prop-types';
import { ReactComponent as Arrow } from 'assets/images/arrow.svg';
import img from 'assets/images/angle_left.svg';
import Responsive from 'context/responsive';
import Terms from './Terms';

const StyledLink = styled(InlineLink)`
  color: ${props => props.active ? props.theme.colors.accentRed : props.theme.colors.black};
  display: flex;
  align-items: center;
  &:hover, .active {
    color: ${props => props.theme.colors.accentRed};
    svg {
      fill: ${props => props.theme.colors.accentRed}; 
    }
  }
  svg {
    fill: ${props => props.active ? props.theme.colors.accentRed : props.theme.colors.black};
    margin-right: 10px;
  }
`;

const ListNav = styled(List)`
  position: relative;
  .leads,
  .company {
    position: absolute;
    right: -210px;
    display: none;
  }
  .leads {
    top: -14px;
  }
  .company {
    top: 15%;
    right: -195px;
  }
  .leadsItem {
    &:hover {
      .leads {
        display: block;
      }
    }
  }
  .companyItem {
    &:hover {
      .company {
        display: block;
      }
    }
  }
  .beta {
    margin-top: 35px;
  }
  @media (max-width: 768px) {
    .leads {
      top: 50px;
      right: auto;
      left: -65px;
      background: #fff;
      width: 215px;
    }
    .company {
      top: 200px;
      right: auto;
      left: -65px;
      background: #fff;
      width: 215px;
    }
    a {
      padding-left: 28px;
    }
    .leadsItem, .companyItem {
      a {
        position: absolute;
        z-index: -2;
        background: url(${img}) no-repeat 10% center
      }
    .leads, .company {
      a {
        position: static;
        z-index: auto;
        background: inherit;
      }
    }
    }
  }
`;

const AccentBlock = styled(Block)`
box-shadow: 4px 12px 32px 18px rgba(238, 62, 38, 0.06);
`;

const LeadMenuItem = styled(MenuItem)`
background-color: ${ props => props.active ? props => props.theme.colors.bgAccent : 'transparent'};
padding: 15px 10px 15px 5px;
border-radius: 8px;
svg:not(.arrow) {
  fill: ${props => props.active ? 'white' : props.theme.colors.black};
  margin: 0 auto;
}
div {
  background:  ${ props => props.active ? props => props.theme.colors.accentRed : 'transparent'}; 
  display: inline-grid;
      margin: auto;
      align-items: center;
      margin-right: 15px
}
.arrow {
  fill: ${ props => props.active ? props => props.theme.colors.accentRed : 'transparent'};
  margin-left: 20px;
}
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  padding: 3px;
  margin: 0 20px 0 5px;
  background: transparent;
`;
// max-width: 75px;


export default function SideNav({ routes, details, leadRoutes, companyRoutes }) {
  const { t } = useTranslation('sidenav');
  const { pathname } = useLocation();
  const isActivePath = (currentPath, routerPath) => currentPath == routerPath;
  const isActiveMenu = (currentPath) => {
    const leadRoutes = selectRouteByKey('leadsNav');
    if (leadRoutes.includes(currentPath)) {
      return true;
    }
    return false;
  };
  const ctx = useContext(Responsive);
  
  return (
    <Sidebar className='side'>
      <ListNav>
        {routes.map((route, index) => (
          <MenuItem
            key={`${index}-${route.name}`}
            active={isActiveMenu(pathname) ? true : null}
            className={route.className}
          >
            <StyledLink
              to={route.path}
              active={isActivePath(pathname, route.path) ? 1 : 0}
            >
              {route.icon}
              {!ctx.details && t(route.name)}
            </StyledLink>
            {route.leadsNav && (
              <div className="leads">
                <AccentBlock>
                  <List>
                    {leadRoutes.map((route, index) => (
                      <LeadMenuItem
                        key={`${index}-${route.name}`}
                        active={isActivePath(pathname, route.path) ? 1 : 0}
                        className={route.className}
                      >
                        <StyledLink
                          to={route.path}
                          active={isActivePath(pathname, route.path) ? 1 : 0}
                        >
                          <Icon className={isActivePath ? 'active' : ''}>
                            {route.icon}
                          </Icon>

                          {!details && t(route.name)}
                          {isActivePath && <Arrow className="arrow" />}
                        </StyledLink>
                      </LeadMenuItem>
                    ))}
                  </List>
                </AccentBlock>
              </div>
            )}
            {route.subNav && (
              <div className="company">
                <AccentBlock>
                  <List>
                    {companyRoutes.map((route, index) => (
                      <LeadMenuItem
                        key={`${index}-${route.name}`}
                        active={isActivePath(pathname, route.path) ? 1 : 0}
                        className={route.className}
                      >
                        <StyledLink
                          to={route.path}
                          active={isActivePath(pathname, route.path) ? 1 : 0}
                        >
                          <Icon className={isActivePath ? 'active' : ''}>
                            {route.icon}
                          </Icon>

                          {!details && t(route.name)}
                          {isActivePath && <Arrow className="arrow" />}
                        </StyledLink>
                      </LeadMenuItem>
                    ))}
                  </List>
                </AccentBlock>
              </div>
            )}
          </MenuItem>
        ))}
      </ListNav>
      <Terms />
    </Sidebar>
  );
}

SideNav.propTypes = {
  details: bool,
  routes: arrayOf(shape({
    name: string,
    path: string,
    exact: bool,
    main: elementType
  })),
  leadRoutes: arrayOf(shape({
    name: string,
    path: string,
    exact: bool,
    main: elementType
  })),
  companyRoutes: arrayOf(shape({
    name: string,
    path: string,
    exact: bool,
    main: elementType
  }))
};
