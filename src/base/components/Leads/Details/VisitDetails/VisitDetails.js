import { useState } from 'react';
import styled from 'styled-components';
import { string, number, array } from 'prop-types';
import { ReactComponent as CollapseMain } from 'assets/images/triangle.svg';
import { ReactComponent as Date } from 'assets/images/date.svg';
import { ReactComponent as View } from 'assets/images/view.svg';
import { ReactComponent as Time } from 'assets/images/time.svg';
import { ReactComponent as Source } from 'assets/images/source.svg';
import { TextLightExtraSmall } from 'base/styled';
import VisitDetailsAccordion from './VisitDetailsAccordion';

const AccordionWrap = styled.div`
  padding: 10px 0;
  background: ${props => props.theme.colors.bgMain};
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 1fr;
  text-align: center;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 1fr;
  text-align: center;
`;

const ToggleBtn = styled.div`
  cursor: pointer;
  &.opened {
    svg {
        transform: rotate(-90deg);
    }
  }
`;

export default function VisitDetails({visitsInfo}) {
  const [active, setActive] = useState(false);

  function activeAll() {
    setActive(!active);
  }

  function acc(item, idx) {
    return (
      <VisitDetailsAccordion
        key={idx}
        source={item.source}
        allactive={active}
        count={item.count}
        date={item.date}
        total_time={item.total_time}
      >
        {item.page_views.map((view, ind) => (
          <Content key={ind}>
            <TextLightExtraSmall> {view.accessed_at} </TextLightExtraSmall>
            <TextLightExtraSmall> {view.path}({view.count})</TextLightExtraSmall>
            <TextLightExtraSmall> {view.time_spent}s</TextLightExtraSmall>
          </Content>
        ))}
        {item.content}
      </VisitDetailsAccordion>
    );
  }

  return (
    <AccordionWrap>
      <Header>
        <div>
          <Date />
        </div>
        <div>
          <View />
        </div>
        <div>
          <Time />
        </div>
        <div>
          <Source />
        </div>
        <ToggleBtn onClick={activeAll} className={!active ? '' : 'opened'}>
          <CollapseMain />
        </ToggleBtn>
      </Header>
      {visitsInfo && visitsInfo.map(acc)}
    </AccordionWrap>
  );
}

VisitDetails.propTypes = {
  date: string,
  leadCount: number,
  leadTime: string,
  leadSource: string,
  visitsInfo: array,
  total_time: number
};
