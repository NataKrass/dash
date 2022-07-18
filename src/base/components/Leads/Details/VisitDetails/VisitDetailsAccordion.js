import { useState, useRef, useEffect } from "react";
import { any, bool, string } from 'prop-types';
import styled from 'styled-components';
import { TextBlackExtraSmall, TextBlackThin } from 'base/styled';
import { ReactComponent as CollapseMain } from 'assets/images/triangle.svg';

const AccordionTitle = styled.div`
  background: white;
  padding: 8px 0 6px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 1fr;
  text-align: center;
  cursor: pointer;
`;

const AccordionBlock = styled.div`
  border: ${props => props.theme.borders.textInput};
  border-radius: 8px;
  overflow: hidden;
  margin: 5px 0;
  svg {
    transition: transform 280ms cubic-bezier(0, 1, 0, 1);
  }
  .rotate {
    transform: rotate(-90deg);
  }
  
  .accordion-content {
    overflow: hidden;
    transition: max-height 0.6s ease;
    height: auto;
  }
`;

const VisitDetailsAccordion = ({ allactive, children, collapse, date, count, total_time, source }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight + 400}px`
      : "0px";
  }, [contentRef, active]);

  useEffect(() => {
    setActive(allactive);
  }, [allactive]);

  function toogleActive() {
    setActive(!active);
  }
  
  return (
    <AccordionBlock>
      <AccordionTitle className={active ? 'is-open accordion-title' : 'closed accordion-title'} onClick={toogleActive}>
        <TextBlackExtraSmall>{date}</TextBlackExtraSmall> 
        <TextBlackExtraSmall>{count}</TextBlackExtraSmall> 
        <TextBlackExtraSmall>{total_time}s</TextBlackExtraSmall> 
        <TextBlackExtraSmall>{source}</TextBlackExtraSmall> 
        <TextBlackThin className={active ? "accordion-icon rotate" : "accordion-icon"}>
          {collapse}
          <CollapseMain />
        </TextBlackThin>
      </AccordionTitle>

      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </AccordionBlock>
  );
};

export default VisitDetailsAccordion;

VisitDetailsAccordion.propTypes = {
  allactive: bool,
  date: string,
  time: string,
  source: string,
  children: any,
  views: any,
  collapse: any,
  count: any,
  total_time: string
};
