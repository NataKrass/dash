import styled from 'styled-components';

const Loading = styled.div`
margin-top: 15px;
background: linear-gradient(-90deg,  white, #EAEAEA, #DAF4FF );
background-size: 400% 400%;
border-radius: 15px;
background-size: 400% 400%;
animation: gradient 2s ease infinite;
height: 100%;
}

@keyframes gradient {
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
}

`;

export default Loading;