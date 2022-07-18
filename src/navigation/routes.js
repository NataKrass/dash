import Leads from 'pages/Leads';
// import Contacts from 'pages/Contacts';
// import Emails from 'pages/Emails';
import Notifications from 'pages/Notifications';
import Company from 'pages/Company';
import Profile from 'pages/Profile';
import Conversions from 'pages/Conversions';
import Personalize from 'pages/Personalize';
import AutoAssign from 'pages/AutoAssign';
import Hidden from 'pages/Hidden';
import Websites from 'pages/Websites';
import Users from 'pages/Users';
import Receipts from 'pages/Receipts';
import Integrations from 'pages/Integrations';
import { ReactComponent as Lead } from 'assets/images/leads.svg';
// import { ReactComponent as Contact } from 'assets/images/contacts.svg';
// import { ReactComponent as Email } from 'assets/images/emails.svg';
import { ReactComponent as Compan } from 'assets/images/company.svg';
import { ReactComponent as Personalization } from 'assets/images/personalize.svg';
import { ReactComponent as Conversion } from 'assets/images/conversions.svg';
import { ReactComponent as Dash } from 'assets/images/dashboard.svg';
import { ReactComponent as Assign } from 'assets/images/assign.svg';
import { ReactComponent as Hide } from 'assets/images/hidden.svg';
import { ReactComponent as User } from 'assets/images/users.svg';
import { ReactComponent as Website } from 'assets/images/websites.svg';
import { ReactComponent as Receipt } from 'assets/images/receipts.svg';
import { ReactComponent as Integration } from 'assets/images/integrations.svg';
import { ReactComponent as Notification } from 'assets/images/notificate.svg';

const routes = {
  main: [
    {
      name: 'profile',
      path: '/profile',
      exact: true,
      main: Profile
    }
  ],
  sideNav: [
    {
      name: 'leads',
      path: '/', 
      strict: true,
      exact: true,
      main: Leads,
      icon: <Lead />,
      className: 'leadsItem',
      leadsNav: true
    },
    // {
    //   name: 'contacts',
    //   path: '/contacts',
    //   exact: true,
    //   main: Contacts,
    //   icon: <Contact />
    // },
    // {
    //   name: 'emails',
    //   path: '/emails',
    //   exact: true,
    //   main: Emails,
    //   icon: <Email />
    // },
    {
      name: 'company',
      path: '/company',
      exact: true,
      main: Company,
      icon: <Compan />,
      className: 'companyItem',
      subNav: true
    },
    {
      name: 'personalize',
      path: '/personalize',
      exact: true,
      main: Personalize,
      icon: <Personalization />,
      className: 'beta'
    },
    {
      name: 'conversions',
      path: '/conversions',
      exact: true,
      main: Conversions,
      icon: <Conversion />
    }
  ],
  leadNav: [
    {
      name: 'dashboard',
      path: '/dashboard',
      exact: true,
      main: Leads,
      icon: <Dash />
    },
    {
      name: 'autoAssign',
      path: '/auto-assign',
      exact: true,
      main: AutoAssign,
      icon: <Assign />
    },
    {
      name: 'hidden',
      path: '/hidden',
      exact: true,
      main: Hidden,
      icon: <Hide />
    },
    {
      name: 'notifications',
      path: '/notifications',
      exact: true,
      main: Notifications,
      icon: <Notification />
    }
  ],
  companyNav: [
    {
      name: 'account',
      path: '/company/account',
      exact: true,
      main: Company,
      icon: <Dash />
    },
    {
      name: 'users',
      path: '/company/users',
      exact: true,
      main: Users,
      icon: <User />
    },
    {
      name: 'receipts',
      path: '/company/receipts',
      exact: true,
      main: Receipts,
      icon: <Receipt />
    },
    {
      name: 'websites',
      path: '/company/websites',
      exact: true,
      main: Websites,
      icon: <Website />
    },
    {
      name: 'integrations',
      path: '/company/integrations',
      exact: true,
      main: Integrations,
      icon: <Integration />
    }
  ]
};

export const selectRouteByKey = (key) => {
  if( routes[key] ) {
    return routes[key].map( item => item.path);
  }
  return [];
};

export default routes;
