import styled from "styled-components";
const red3 = `#dc143c`;
const red4 = `##ff4040`;
const lime1 = `#e0ffff`;
const darkGrey = `#696969`;
const primaryColor = `#3399cc`;
const primaryColor2 = `#3399FF`;

export const ButtonStyled = styled.button`
  height: 3rem;
  width: 15rem;
  margin-top: 1.5rem;
  background-color: ${primaryColor};
  color: #ffffff;
  font-size: 1.5rem;
  border-radius: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${primaryColor2};
  }
`;
