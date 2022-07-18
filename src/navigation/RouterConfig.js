import { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';
import SideNav from '../base/components/SideNav';
import Responsive from 'context/responsive';
import routes from './routes';
import {Row, Col, Container} from '@bootstrap-styled/v4';

export default function RouterConfig() {
  const allRoutes = [
    ...routes.sideNav,
    ...routes.main,
    ...routes.leadNav,
    ...routes.companyNav,
  ];

  const ctx = useContext(Responsive);

  let location = useLocation();
  const home = location.pathname === '/dashboard' || location.pathname === '/';

  useEffect(() => {
    if(!home) {
      ctx.setDetails(false);
    }
  }, [location, home, ctx]);

  useEffect(() => {
    ctx.setNavbar(false);
    /* eslint-disable */
  }, [location]);
  /* eslint-enable */
 
  return (
    <Container fluid>
      <Row>
        {!ctx.isMobile && (
          <Col md="2" lg="1" className={ctx.details ? 'detailed' : null}>
            <SideNav 
              routes={routes.sideNav}
              leadRoutes={routes.leadNav}
              companyRoutes={routes.companyNav}
            />
          </Col>
        )}
        <Col md="10" col='12' lg="11">
          <Switch>
            {/* List all routes here */}
            {allRoutes.map((route, index) => (
              <Route
                key={`${index}-${route.name}`}
                path={route.path}
                exact={route.exact}
                component={route.main}
              ></Route>
            ))}
            {/* List a generic 404-Not Found route here */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
