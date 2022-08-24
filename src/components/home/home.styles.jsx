import Styled from "styled-components";
const darkGrey = `#696969`;
export const ChartParentContainer = Styled.div`
display:flex;
flex-wrap: wrap;
`;
export const ChartContainer = Styled.div`
display: flex; 
align-items: center;
justify-content: center;
flex-direction: column;
flex: 0 0 33.333%;
margin-top: 5rem;
color: ${darkGrey};
height: 35rem;
width: 35rem;
h1{
 margin-bottom:1rem;
}
`;
