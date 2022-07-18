import { string } from 'prop-types';
import { ReactComponent as Tooltip } from 'assets/images/tooltip.svg';
import { TooltipBox } from 'base/styled';

export default function TooltipDark({text, className}) {
 
  return (
    <TooltipBox className={className}>
      <Tooltip />
      <span>{text}</span>
    </TooltipBox>
  );
}

TooltipDark.propTypes = {
  text: string,
  className: string
};