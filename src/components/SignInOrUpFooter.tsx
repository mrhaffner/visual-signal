import styled from 'styled-components';

const Footer = styled.footer`
  background: transparent;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  flex-direction: column;
  width: 400px;
  padding: 24px 0px;
  margin: 0px auto;
  border-top: 1px solid rgb(223, 225, 230);
  font-size: 12px;
  color: rgb(107, 119, 140);
`;

const SignInOrUpFooter = () => {
  return <Footer></Footer>;
};

export default SignInOrUpFooter;
