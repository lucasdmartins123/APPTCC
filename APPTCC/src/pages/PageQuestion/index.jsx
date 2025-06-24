import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import perguntasDict, {
  cartasirrelevantes,
  resultadoFinal,
  tecnicas,
} from "../../utils";
import nomeJogo from "../../assets/nomeJogo.png";

export default function PageQuestion() {
  const [gabarito, setGabarito] = useState(false);
  const [Explicagabarito, setExplicaGabarito] = useState(false);
  const [respostasFuncionais, setRespostasFuncionais] = useState({});
  const [respostasNaoFuncionais, setRespostasNaoFuncionais] = useState({});
  const [score, setScore] = useState(0);
  const [mostrarTextoFinal, setMostrarTextoFinal] = useState(false);
  const [tecnicasSelecionadas, setTecnicasSelecionadas] = useState([]);
  const [cartasIrrelevantesSelecionadas, setcartasIrrelevantesSelecionadas] =
    useState([]);

  const tecnicasCertas = [1, 2, 3, 4];
  const cartasirrelevantesArray = [5, 3, 9, 7, 4, 8, 2, 6];

  function verificarRespostasFuncionais() {
    let novaPontuacao = 0;
    perguntasDict.forEach((questao, index) => {
      const respostaUsuario = (respostasFuncionais[index] || "")
        .split(",")
        .map((r) => r.trim());
      respostaUsuario.forEach((resposta) => {
        if (questao.respostasCorretasFuncionais.includes(resposta)) {
          novaPontuacao += 1;
        }
      });
    });
    return novaPontuacao;
  }

  function verificarRespostasTecnicas() {
    let pontos = 0;
    tecnicasSelecionadas.forEach((tecnica) => {
      pontos += tecnicasCertas.includes(tecnica) ? 1 : -1;
    });
    return pontos;
  }

  function verificarRespostasCartasIrrelevantes() {
    let pontos = 0;
    cartasIrrelevantesSelecionadas.forEach((carta) => {
      if (cartasirrelevantesArray.includes(carta)) {
        pontos -= 1;
      }
    });
    return pontos;
  }

  function verificarRespostasNaoFuncionais() {
    let novaPontuacao = 0;
    perguntasDict.forEach((questao, index) => {
      const respostaUsuario = (respostasNaoFuncionais[index] || "")
        .split(",")
        .map((r) => r.trim());
      respostaUsuario.forEach((resposta) => {
        if (questao.respostasCorretasNaoFuncionais.includes(resposta)) {
          novaPontuacao += 1;
        }
      });
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

    const total =
      verificarRespostasFuncionais() +
      verificarRespostasNaoFuncionais() +
      verificarRespostasTecnicas() +
      verificarRespostasCartasIrrelevantes();

    setScore(total);
    setMostrarTextoFinal(true);
  }

  const texto =
    score >= 31
      ? "arquiteto"
      : score >= 24
      ? "designer"
      : score >= 16
      ? "criador"
      : score >= 8
      ? "explorador"
      : "novato";

  useEffect(() => {
    const respostasFuncionaisSalvas = localStorage.getItem(
      "respostasFuncionais"
    );
    const respostasNaoFuncionaisSalvas = localStorage.getItem(
      "respostasNaoFuncionais"
    );

    if (respostasFuncionaisSalvas)
      setRespostasFuncionais(JSON.parse(respostasFuncionaisSalvas));
    if (respostasNaoFuncionaisSalvas)
      setRespostasNaoFuncionais(JSON.parse(respostasNaoFuncionaisSalvas));
  }, []);

  const todosInputsPreenchidos = perguntasDict.every((_, index) => {
    return (
      respostasFuncionais[index]?.trim() &&
      respostasNaoFuncionais[index]?.trim()
    );
  });

  function handleCheckboxChange(tecnica) {
    setTecnicasSelecionadas((prev) =>
      prev.includes(tecnica)
        ? prev.filter((t) => t !== tecnica)
        : [...prev, tecnica]
    );
  }

  function handleCheckboxCartasChange(carta) {
    setcartasIrrelevantesSelecionadas((prev) =>
      prev.includes(carta) ? prev.filter((c) => c !== carta) : [...prev, carta]
    );
  }

  function limparRespostas() {
    localStorage.removeItem("respostasFuncionais");
    localStorage.removeItem("respostasNaoFuncionais");
    setRespostasFuncionais({});
    setRespostasNaoFuncionais({});
  }

  return (
    <Container>
      <StyledImg src={nomeJogo} />
      <WrapperContainer>
        {!mostrarTextoFinal && !gabarito && (
          <StyledDicaText>
            Dica: Há duas cartas corretas para cada requisito nas 8 primeiras
            perguntas
          </StyledDicaText>
        )}

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
                    placeholder="Ex: 1,2"
                    value={respostasFuncionais[index] || ""}
                    onChange={(e) => {
                      const valor = e.target.value;
                      const respostas = valor
                        .split(",")
                        .map((r) => r.trim())
                        .filter((r) => r);
                      if (respostas.length <= 2) {
                        setRespostasFuncionais({
                          ...respostasFuncionais,
                          [index]: valor,
                        });
                      }
                    }}
                  />

                  <StyledInput
                    placeholder="Ex: 3,4"
                    value={respostasNaoFuncionais[index] || ""}
                    onChange={(e) => {
                      const valor = e.target.value;
                      const respostas = valor
                        .split(",")
                        .map((r) => r.trim())
                        .filter((r) => r);
                      if (respostas.length <= 2) {
                        setRespostasNaoFuncionais({
                          ...respostasNaoFuncionais,
                          [index]: valor,
                        });
                      }
                    }}
                  />
                </StyledRequisitosDiv>

                {gabarito && (
                  <StyledRequisitosDiv>
                    <StyledGabaritoText>
                      Corretas: {questao.respostasCorretasFuncionais.join(", ")}
                    </StyledGabaritoText>
                    <StyledGabaritoText>
                      Corretas:{" "}
                      {questao.respostasCorretasNaoFuncionais.join(", ")}
                    </StyledGabaritoText>
                  </StyledRequisitosDiv>
                )}
              </StyledQuestionsDiv>
            ))}

            <StyledH2>
              9. Quais Técnicas de levantamento de Requisitos foram utilizadas?
            </StyledH2>
            <CheckboxContainer>
              {tecnicas.map((tecnica) => (
                <StyledCheckboxLabel key={tecnica.value}>
                  <input
                    type="checkbox"
                    value={tecnica.value}
                    checked={tecnicasSelecionadas.includes(tecnica.value)}
                    onChange={() => handleCheckboxChange(tecnica.value)}
                  />
                  <StyledTecnicasLabel>{tecnica.label}</StyledTecnicasLabel>
                </StyledCheckboxLabel>
              ))}
            </CheckboxContainer>

            {gabarito && (
              <StyledDicaText>
                Resposta: Análise de Documentos, Entrevista, Questionário e
                Observação
              </StyledDicaText>
            )}

            <StyledH2>
              Selecione as cartas irrelevantes reveladas na mesa:
            </StyledH2>
            <CheckboxContainer>
              {cartasirrelevantes.map((carta) => (
                <StyledCheckboxLabel key={carta.value}>
                  <input
                    type="checkbox"
                    value={carta.value}
                    checked={cartasIrrelevantesSelecionadas.includes(
                      carta.value
                    )}
                    onChange={() => handleCheckboxCartasChange(carta.value)}
                  />
                  <StyledTecnicasLabel>{carta.label}</StyledTecnicasLabel>
                </StyledCheckboxLabel>
              ))}
            </CheckboxContainer>

            {gabarito && (
              <StyledDicaText>
                Cada carta irrelevante selecionada desconta 1 ponto
              </StyledDicaText>
            )}
          </>
        ) : (
          <StyledFinalAnswersDiv>
            <StyledH2>Pontos: {score}</StyledH2>
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

          {Explicagabarito && (
            <Link to="/infos">
              <StyledButton>Explicações do gabarito</StyledButton>
            </Link>
          )}

          {!mostrarTextoFinal && (
            <Link to="/" onClick={limparRespostas}>
              <StyledButton>Voltar ao menu</StyledButton>
            </Link>
          )}
        </ButtonsDiv>
      </WrapperContainer>
    </Container>
  );
}

/* ---------------------- STYLED COMPONENTS ---------------------- */

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
`;

const WrapperContainer = styled.div`
  margin: 10px;
  padding: 20px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 800px;
  border-radius: 10px;
  border: 3px solid gray;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledH2 = styled.h2`
  font-size: 20px;
  color: #333;
`;

const StyledP = styled.p`
  width: 50%;
`;

const StyledInput = styled.input`
  width: 50%;
  padding: 6px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StyledGabaritoText = styled.p`
  width: 50%;
  color: #d00000;
  font-weight: bold;
`;

const StyledDicaText = styled.p`
  color: #d00000;
  font-weight: bold;
`;

const StyledFinalP = styled.p`
  text-align: center;
  font-size: 16px;
`;

const StyledQuestionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledFinalAnswersDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledRequisitosDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 2px solid #b0b1b3;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f6f7f9;
  transition: all 0.2s;

  input {
    accent-color: #4178f8;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &:hover {
    background-color: #e1e3e5;
  }
`;

const StyledTecnicasLabel = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #4178f8;
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #365fd3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
