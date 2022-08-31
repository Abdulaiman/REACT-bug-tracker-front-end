import Styled from "styled-components";
import { Link } from "react-router-dom";
const primaryColor = `#3399cc`;
const darkGrey = `#696969`;
const darkGrey2 = `#e8e8e8`;
const lightGrey = `	#F5F5F5`;
const lime1 = `#e0ffff`;
export const NavContainer = Styled.div`
display:flex;
justify-content: space-between;
height: 10vh;
width:100vw;
align-items: center;
background-color: ${primaryColor};
`;

export const LinksContainer = Styled.div`
display:flex;
justify-content: space-between;
width: 30rem;
@media (max-width: 1160px) {
 width: 15rem;
 margin-right:2rem;
} 
`;

export const LogoContainer = Styled.div`
margin-left: 5rem;
  a{
font-size: 2.5rem;
  }
  @media (max-width: 1160px) {
   margin-left: 2rem;
   a{
    font-size: 1.5rem;
      }

  }
`;
export const Links = Styled(Link)`
text-decoration: none;
font-size: 1.3rem;
color: ${darkGrey2};
@media (max-width: 1160px) {
 font-size: 1rem;
}
 &:hover {
  color: ${darkGrey};
 }

`;
