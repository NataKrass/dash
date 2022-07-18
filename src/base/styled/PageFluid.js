import styled from 'styled-components';

const PageFluid = styled.div`
display: flex;
flex-direction: column;
padding: 40px;
width: 100%;
@media (max-width: 768px) {
    padding: 0;
}
`;

export default PageFluid;