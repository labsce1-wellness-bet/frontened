import styled from "styled-components";
import { Link } from "react-router-dom";

const SignupWrapper = styled.section``;

const SignupContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  padding: 2em 1em;
  @media screen and (max-height: 475px) {
    padding: 1em 0.6em;
  }
`;
const HeaderContent = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const CreateAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 36px;
  & .input-box {
    margin-bottom: 16px;
  }
  & .submit-btn {
    margin-top: 24px;
    align-self: stretch;
  }
`;
const FooterContent = styled.footer`
  display: flex;
  justify-content: center;
`;
const StyledLink = styled(Link)`
  color: #acacac;
  text-decoration-line: none;
  &:hover {
    color: white;
    text-decoration-line: underline;
  }
`;
export {
  SignupWrapper,
  SignupContent,
  HeaderContent,
  CreateAccountForm,
  FooterContent,
  StyledLink,
};
