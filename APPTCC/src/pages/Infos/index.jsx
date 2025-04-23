import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import perguntasDict from "../../utils";

export default function ExplicacoesGabarito() {
  function limparRespostas() {
    localStorage.removeItem("respostasFuncionais");
    localStorage.removeItem("respostasNaoFuncionais");
  }
  return (
    <>
      <Container>
        <StyledTop>
          <StyledH1>Engenharia de Requisitos </StyledH1>
          <StyledH1>The Game</StyledH1>
        </StyledTop>

        <WrapperContainer>
          <StyledH2>Explicações do Gabarito</StyledH2>
          {perguntasDict.map((questao, index) => (
            <StyledQuestionsDiv key={index}>
              <StyledRequisitosDiv>
                <StyledFinalP>{`${index + 1}. Requisitos funcionais gabarito: ${
                  questao.respostasCorretasFuncionais
                }`}</StyledFinalP>
                <p>{`${questao.respostasCorretasFuncionais[0]}: ${questao.respostasCorretasFuncionaisExplicacao[0]}`}</p>
                <p>{`${questao.respostasCorretasFuncionais[1]}: ${questao.respostasCorretasFuncionaisExplicacao[1]}`}</p>
                <StyledFinalP>{`Requisitos não funcionais gabarito: ${questao.respostasCorretasNaoFuncionais}`}</StyledFinalP>
                <p>{`${questao.respostasCorretasNaoFuncionais[0]}: ${questao.respostasCorretasNaoFuncionaisExplicacao[0]}`}</p>
                <p>{`${questao.respostasCorretasNaoFuncionais[1]}: ${questao.respostasCorretasNaoFuncionaisExplicacao[1]}`}</p>
              </StyledRequisitosDiv>
            </StyledQuestionsDiv>
          ))}
          <ButtonsDiv>
            <Link to="/" onClick={limparRespostas}>
              <StyledButton>Voltar para o menu</StyledButton>
            </Link>
          </ButtonsDiv>
        </WrapperContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 6px;
  a {
    text-decoration: none;
  }
`;
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  align-items: center;
`;

const StyledTop = styled.div`
  width: 500px;
  margin-top: 30px;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid gray;
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 30px;
  color: black;
`;

const StyledFinalP = styled.p`
  color: red;
`;

const StyledH2 = styled.h2`
  font-size: 20px;
  text-align: center;
`;

const StyledQuestionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledFinalAnswersDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const StyledRequisitosDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WrapperContainer = styled.div`
  margin: 20px;
  padding: 20px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 800px;
  height: 100%;
  border-radius: 10px;
  border: 3px solid gray;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  background-color: #4178f8;
  border: 1px solid #fceaea;
  border-radius: 5px;
  color: #f5f5f5;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #8892ff;
    color: #f5f5f5;
  }
`;

const StyledInput = styled.input`
  width: 50%;
  padding: 6px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StyledGabaritoText = styled.p`
  width: 50%;
  color: red;
  font-weight: bold;
`;
