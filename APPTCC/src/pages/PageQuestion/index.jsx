import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import perguntasDict, { resultadoFinal } from "../../utils";
import nomeJogo from "../../assets/nomeJogo.png";

export default function PageQuestion() {
  const [gabarito, setGabarito] = useState(false);
  const [respostasFuncionais, setRespostasFuncionais] = useState({});
  const [respostasNaoFuncionais, setRespostasNaoFuncionais] = useState({});
  const [score, setScore] = useState(0);
  const [mostrarTextoFinal, setMostrarTextoFinal] = useState(false);

  function verificarRespostasFuncionais() {
    let novaPontuacao = 0;

    perguntasDict.forEach((questao, index) => {
      const respostaUsuario = (respostasFuncionais[index] || "")
        .split(",")
        .map((r) => r.trim());
      const corretas = questao.respostasCorretasFuncionais;

      let acertos = 0;
      let erros = 0;

      respostaUsuario.forEach((resposta) => {
        if (corretas.includes(resposta)) {
          acertos += 1;
        } else {
          erros += 1;
        }
      });

      if (acertos === corretas.length && erros === 0) {
        novaPontuacao += 5;
      } else {
        novaPontuacao += acertos * 2;
        novaPontuacao -= erros * 1;
      }
    });

    return novaPontuacao;
  }

  function verificarRespostasNaoFuncionais() {
    let novaPontuacao = 0;

    perguntasDict.forEach((questao, index) => {
      const respostaUsuario = (respostasNaoFuncionais[index] || "")
        .split(",")
        .map((r) => r.trim());
      const corretas = questao.respostasCorretasNaoFuncionais;

      let acertos = 0;
      let erros = 0;

      respostaUsuario.forEach((resposta) => {
        if (corretas.includes(resposta)) {
          acertos += 1;
        } else {
          erros += 1;
        }
      });

      if (acertos === corretas.length && erros === 0) {
        novaPontuacao += 5;
      } else {
        novaPontuacao += acertos * 2;
        novaPontuacao -= erros * 1;
      }
    });

    return novaPontuacao;
  }

  function pontuacao() {
    localStorage.setItem(
      "respostasFuncionais",
      JSON.stringify(respostasFuncionais)
    );
    localStorage.setItem(
      "respostasNaoFuncionais",
      JSON.stringify(respostasNaoFuncionais)
    );
    const pontuacaoFuncionais = verificarRespostasFuncionais();
    const pontuacaoNaoFuncionais = verificarRespostasNaoFuncionais();
    const novaPontuacao = pontuacaoFuncionais + pontuacaoNaoFuncionais;
    setScore(novaPontuacao);
    setMostrarTextoFinal(true);
  }

  const texto =
    score >= 18
      ? "arquiteto"
      : score < 18 && score > 14
      ? "designer"
      : score > 10 && score <= 14
      ? "criador"
      : score > 6 && score <= 10
      ? "explorador"
      : "novato";

  useEffect(() => {
    const respostasFuncionaisSalvas = localStorage.getItem(
      "respostasFuncionais"
    );
    const respostasNaoFuncionaisSalvas = localStorage.getItem(
      "respostasNaoFuncionais"
    );

    if (respostasFuncionaisSalvas) {
      setRespostasFuncionais(JSON.parse(respostasFuncionaisSalvas));
    }
    if (respostasNaoFuncionaisSalvas) {
      setRespostasNaoFuncionais(JSON.parse(respostasNaoFuncionaisSalvas));
    }
  }, []);

  const todosInputsPreenchidos = perguntasDict.every((_, index) => {
    const funcional = respostasFuncionais[index];
    const naoFuncional = respostasNaoFuncionais[index];
    return funcional?.trim() && naoFuncional?.trim();
  });

  function limparRespostas() {
    localStorage.removeItem("respostasFuncionais");
    localStorage.removeItem("respostasNaoFuncionais");
    setRespostasFuncionais({});
    setRespostasNaoFuncionais({});
  }

  return (
    <>
      <Container>
        <StyledImg src={nomeJogo} />
        <WrapperContainer>
          {!mostrarTextoFinal ? (
            <>
              {perguntasDict.map((questao, index) => (
                <StyledQuestionsDiv key={index}>
                  <StyledH2>{questao.titulo}</StyledH2>
                  <p>{questao.pergunta}</p>
                  <StyledRequisitosDiv>
                    <StyledP>Requisitos funcionais:</StyledP>

                    <StyledP>Requisitos não funcionais:</StyledP>
                  </StyledRequisitosDiv>
                  <StyledRequisitosDiv>
                    <StyledInput
                      placeholder="Digite o número das cartas separados por vírgula"
                      value={respostasFuncionais[index] || ""}
                      onChange={(e) =>
                        setRespostasFuncionais({
                          ...respostasFuncionais,
                          [index]: e.target.value,
                        })
                      }
                    />

                    <StyledInput
                      placeholder="Digite o número das cartas separados por vírgula"
                      value={respostasNaoFuncionais[index] || ""}
                      onChange={(e) =>
                        setRespostasNaoFuncionais({
                          ...respostasNaoFuncionais,
                          [index]: e.target.value,
                        })
                      }
                    />
                  </StyledRequisitosDiv>
                  {gabarito && (
                    <StyledRequisitosDiv>
                      <StyledGabaritoText>
                        As cartas corretas eram:{" "}
                        {questao.respostasCorretasFuncionais.join(", ")}
                      </StyledGabaritoText>

                      <StyledGabaritoText>
                        As cartas corretas eram:{" "}
                        {questao.respostasCorretasNaoFuncionais.join(", ")}
                      </StyledGabaritoText>
                    </StyledRequisitosDiv>
                  )}
                </StyledQuestionsDiv>
              ))}
            </>
          ) : (
            <StyledFinalAnswersDiv>
              <StyledH2>Sua pontuação: {score}</StyledH2>
              <StyledH2>{resultadoFinal[texto].titulo}</StyledH2>
              <StyledFinalP>{resultadoFinal[texto].descricao}</StyledFinalP>
            </StyledFinalAnswersDiv>
          )}
          <ButtonsDiv>
            {!mostrarTextoFinal && !gabarito && (
              <StyledButton
                onClick={pontuacao}
                disabled={!todosInputsPreenchidos}
              >
                Responder
              </StyledButton>
            )}
            {mostrarTextoFinal && (
              <StyledButton
                onClick={() => {
                  setGabarito(true);
                  setMostrarTextoFinal(false);
                }}
              >
                Ver gabarito
              </StyledButton>
            )}
            {gabarito && (
              <Link to="/infos">
                <StyledButton>Explicações do gabarito</StyledButton>
              </Link>
            )}
            {!mostrarTextoFinal && (
              <Link to="/" onClick={limparRespostas}>
                <StyledButton>Voltar para o menu</StyledButton>
              </Link>
            )}
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

  margin: 6px;
  a {
    text-decoration: none;
  }
`;

const StyledImg = styled.img`
  margin-top: 16px;
  width: 100%;
  max-width: 500px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  align-items: center;
`;

const StyledP = styled.p`
  width: 50%;
`;

const StyledFinalP = styled.p`
  text-align: center;
`;

const StyledH2 = styled.h2`
  font-size: 20px;
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
  gap: 10px;
`;

const WrapperContainer = styled.div`
  margin: 10px;
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
