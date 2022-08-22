import { ButtonStyled } from "./button.styles";

const MyButton = ({ children, ...otherProps }) => {
  return <ButtonStyled {...otherProps}>{children}</ButtonStyled>;
};

export default MyButton;
