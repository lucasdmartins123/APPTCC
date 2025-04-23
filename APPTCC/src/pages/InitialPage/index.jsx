import { Link } from "react-router-dom";
import styled from "styled-components";

export default function InitialPage() {
  return (
    <>
      <Container>
        <StyledTop>
          <StyledH1>Engenharia de Requisitos </StyledH1>
          <StyledH1>The Game</StyledH1>
        </StyledTop>
        <Link to="/pageQuestion">
          <WrapperContainer>
            <FocusTitleDiv>
              <StyledH3>Parque de Diversão</StyledH3>
            </FocusTitleDiv>
          </WrapperContainer>
        </Link>
      </Container>
    </>
  );
}
const Container = styled.div`
  min-height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 6px;
  a {
    text-decoration: none;
  }
`;

const StyledTop = styled.div`
  width: 500px;
  margin-top: 100px;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid gray;
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 30px;
  color: black;
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  color: white;
`;

const FocusTitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 200px;
  border-radius: 10px;
  border: 3px solid yellow;
  background: url("/img/parque_diversao.webp");
  @media (max-width: 500px) {
    width: 400px;
  }
`;
