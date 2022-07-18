import { useState, useRef, useEffect } from "react";
import { any, bool, string } from 'prop-types';
import styled from 'styled-components';
import { TextBlackThin } from 'base/styled';
import { ReactComponent as CollapseIcon } from 'assets/images/collapse.svg';

const AccordionTitle = styled.div`
  background: ${props => props.theme.colors.themeLight};
  padding: 8px 20px 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: -1px 8px 0 30px;
  }
`;

const AccordionBlock = styled.div`
  margin: 3px 0;
  border: ${props => props.theme.borders.textInput};
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.colors.bgMain};
  svg {
    transition: transform 280ms cubic-bezier(0, 1, 0, 1);
  }
  .is-open {
    .collapse {
      transform: rotate(90deg);
    }
  }
  .rotate {
    transform: rotate(90deg);
  }
  @media (max-width: 1180px) {
    p {
      line-height: 1;
    }
   }
  .accordion-content {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.6s ease;
    height: auto;
   
  }
`;

const Accordion = ({allactive, title, children, icon, collapse }) => {
  const [active, setActive] = useState(allactive);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight + 400}px`
      : "0px";
    
  }, [contentRef, active]);

  // useEffect(() => {
  //   setActive(allactive);
  // }, [allactive]);

  function toogleActive() {
    setActive(!active);
  }

  return (
    <AccordionBlock>
      <AccordionTitle className={active ? 'is-open accordion-title' : 'closed accordion-title'} onClick={toogleActive}>
        <CollapseIcon className='collapse'/>
        <TextBlackThin>{title}</TextBlackThin> {icon}
        <TextBlackThin className={active ? "accordion-icon rotate" : "accordion-icon"}>
          {collapse}
        </TextBlackThin>
      </AccordionTitle>

      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </AccordionBlock>
  );
};

export default Accordion;

Accordion.propTypes = {
  allactive: bool,
  title: string,
  children: any,
  icon: any,
  collapse: any
};
