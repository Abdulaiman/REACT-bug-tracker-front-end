import styled from "styled-components";
const primaryColor = `#3399cc`;
const darkGrey = `#696969`;
const darkGrey2 = `#e8e8e8`;
const lightGrey = `	#F5F5F5`;
const lime1 = `#e0ffff`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${primaryColor};
`;

export const FormContainer = styled.div`
  height: 25rem;
  width: 20rem;
  background-color: ${lightGrey};
  border-radius: 2rem;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  column-gap: 2rem;
`;

export const Input = styled.input`
  height: 3rem;
  width: 17rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px #888888;
  font-size: 1.3rem;
  padding-left: 0.5rem;
  background-color: ${lightGrey};
`;
export const LoginStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${primaryColor};
  font-size: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  overflow: hidden;
  padding: 20px;
  border-bottom: 1px solid grey;
  margin-bottom: 2rem;
`;

export const Paragraph = styled.p`
  margin-top: 0.75rem;
  margin-left: 2.2rem;
  color: ${darkGrey};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
