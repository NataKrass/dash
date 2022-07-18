import styled, { keyframes } from 'styled-components';

const ldsRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const LoaderWrap = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 15% auto;
  text-align: center;
`;

const Circle1 = styled.div`
  position: absolute;
  border: 4px solid ${({ theme }) => theme.colors.accentRed};
  opacity: 1;
  border-radius: 50%;
  animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const Circle2 = styled(Circle1)`
  animation-delay: -0.5s;
`;

export default function Loader () {
  return (
    <LoaderWrap>
      <Circle1 />
      <Circle2 />
    </LoaderWrap>
  );
}
