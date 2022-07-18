import styled from 'styled-components';

const Page = styled.div`
display: flex;
flex-direction: column;
padding: 40px;
width: 88%;
position: relative;
@media (max-width: 768px) {
    width: 100%;
    padding: 0;
}
`;

export default Page;