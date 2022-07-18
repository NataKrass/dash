import styled from 'styled-components';
import { object, string } from 'prop-types';
import { TextAccentExtraSmall, TextBlackExtraSmall, TextLightExtraSmall } from 'base/styled';
import { ReactComponent as Adress } from 'assets/images/adress.svg';
import { ReactComponent as Name } from 'assets/images/company_name.svg';
import { ReactComponent as Employe } from 'assets/images/employe.svg';
import { ReactComponent as Found } from 'assets/images/found.svg';
import { ReactComponent as Website } from 'assets/images/website.svg';
import { ReactComponent  as Notes } from 'assets/images/notes.svg';
import { ReactComponent  as Industries } from 'assets/images/industry.svg';

const FlexWrapper = styled.div`
  display: flex;
  padding: 18px 5px;
  svg {
    margin: 2px 10px 0 0;
    width: 20px;
  }
  ul {
      list-style: none;
      padding: 0 10px;
      margin: 0;
      .block {
        padding: 10px 0;
      }
      li {
          display: flex;
          padding: 0px 0;
          a {
            text-decoration:none;
          }
          p {
            margin: 3px 0 0;
            }
            &:nth-child(3) {
                svg {
                    width: 21px
                }
            }
        }
        &:first-child {
            width: 100%;
            border-right: 1px solid ${props => props.theme.colors.greyLight};
        }
        &:last-child {
          width: 100%;
          li {
           
          }
      }
    }  
`;

const Info = styled.div`
    display: flex;
    padding: 0 15px 10px;
    p {
    margin: 3px 0 0;
  }
`;

const Icon = styled.div`
  width: 28px;
  padding: 0 20px 0 0
`;

function renderList(item, idx) {
  return (
    <li key={idx} className={item.icon ? 'block' : ''}>
      <Icon>
        {item.icon}
      </Icon>
      <div>
        <TextLightExtraSmall>{item.title}</TextLightExtraSmall>
        <TextBlackExtraSmall>{item.value}</TextBlackExtraSmall>
        <a target="_blank" rel="noreferrer" href={item.url}>
          <TextAccentExtraSmall>{item.accent}</TextAccentExtraSmall>
          {item.arr && item.arr.length > 0 &&
            item.arr.map((lead, ind) => (
              <TextBlackExtraSmall key={ind}>
                {lead.country} 
                {lead.city ? ', ' + lead.city : null}
                {lead.region ? ', ' + lead.region : null} {lead.postalCode && ', ' + lead.postalCode}
              </TextBlackExtraSmall>
            ))}
        </a>
      </div>
    </li> 
  );
}

export default function Company({
  companyInfo
}) {

  const arrLeft = [
    {
      icon: <Name />,
      title: 'Company name',
      value: companyInfo?.company_name
    },
    {
      icon: <Website />,
      title: 'Website',
      accent: companyInfo?.company_info.website,
      url: companyInfo?.company_info.website
    },
    {
      icon: companyInfo?.company_info?.addresses.length > 0 && <Adress />,
      title: companyInfo?.company_info?.addresses.length > 0 && 'Headquarter addresses',
      arr: companyInfo?.company_info?.addresses
    },
  ];

  const arrRight = [
    {
      icon: companyInfo.company_info && companyInfo.company_info.employees && <Employe />,
      title: companyInfo.company_info && companyInfo.company_info.employees && 'Approximate employees',
      value: companyInfo.company_info && companyInfo.company_info.employees
    },
    {
      icon: companyInfo.company_info && companyInfo.company_info.founded_year && <Found />,
      title: companyInfo.company_info && companyInfo.company_info.founded_year && 'Founded',
      value: companyInfo.company_info && companyInfo.company_info.founded_year
    },
    {
      icon: companyInfo.company_info && companyInfo.company_info.naics_industries.length > 0 && <Industries />,
      title: companyInfo.company_info && companyInfo.company_info.naics_industries.length > 0 && 'NAICS Industry',
      value: companyInfo.company_info && companyInfo.company_info.naics_industries,
    },
    {
      icon: companyInfo.company_info && companyInfo.company_info.gic_industries.length > 0 && <Industries />,
      title: companyInfo.company_info && companyInfo.company_info.gic_industries.length > 0 && 'GIC Industry',
      value: companyInfo.company_info && companyInfo.company_info.gic_industries,
    },
  ];

  // console.log(companyInfo);

  return (
    <>
      <FlexWrapper>
        <ul className="bordered">{arrLeft.map(renderList)}</ul>
        <ul>{arrRight.map(renderList)}</ul>
      </FlexWrapper>
      {companyInfo.company_info.description && <Info>
        <Icon>
          <Notes />
        </Icon>
        <div>
          <TextLightExtraSmall>Overview</TextLightExtraSmall>
          <TextBlackExtraSmall>{companyInfo.company_info.description}</TextBlackExtraSmall>
        </div>
      </Info>
      }
    </>
  );
}

Company.propTypes = {
  leadName: string,
  leadLocation: string,
  companyInfo: object
};

