import { Link } from "react-router-dom";
import styled from "styled-components";
import nomeJogo from "../../assets/nomeJogo.png";

export default function InitialPage() {
  return (
    <>
      <Container>
        <StyledImg src={nomeJogo} />
        <Link to="/pageQuestion">
          <WrapperContainer>
            <FocusTitleDiv>
              <StyledH3>Parque de Diversões</StyledH3>
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

const StyledImg = styled.img`
  width: 100%;
  max-width: 600px;
  @media (max-width: 800px) {
    width: 100%;
  }
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
  width: 600px;
  height: 200px;
  border-radius: 10px;
  border: 3px solid #2c4f6f;
  background: url("/img/parque_diversao.webp");
  @media (max-width: 600px) {
    width: 400px;
  }
`;
