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
      const corretas = questao.respostasCorretasFuncionais;

      respostaUsuario.forEach((resposta) => {
        if (corretas.includes(resposta)) {
          novaPontuacao += 1;
        }
      });
    });

    return novaPontuacao;
  }

  function verificarRespostasTecnicas() {
    let pontos = 0;

    tecnicasSelecionadas.forEach((tecnica) => {
      if (tecnicasCertas.includes(tecnica)) {
        pontos += 1;
      } else {
        pontos -= 1;
      }
    });

    return pontos;
  }

  function verificarRespostasCartasIrrelevantes() {
    let pontos = 0;

    cartasIrrelevantesSelecionadas.forEach((cartas) => {
      if (cartasirrelevantesArray.includes(cartas)) {
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
      const corretas = questao.respostasCorretasNaoFuncionais;

      respostaUsuario.forEach((resposta) => {
        if (corretas.includes(resposta)) {
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
    const pontuacaoFuncionais = verificarRespostasFuncionais();
    const pontuacaoNaoFuncionais = verificarRespostasNaoFuncionais();
    const pontuacaoTecnicas = verificarRespostasTecnicas();
    const pontuacaoCartasIrrelevantes = verificarRespostasCartasIrrelevantes();
    const novaPontuacao =
      pontuacaoFuncionais +
      pontuacaoNaoFuncionais +
      pontuacaoTecnicas +
      pontuacaoCartasIrrelevantes;
    console.log(pontuacaoFuncionais);
    console.log(pontuacaoNaoFuncionais);
    console.log(pontuacaoTecnicas);
    console.log(pontuacaoCartasIrrelevantes);
    setScore(novaPontuacao);
    setMostrarTextoFinal(true);
  }

  const texto =
    score >= 31
      ? "arquiteto"
      : score >= 24 && score <= 30
      ? "designer"
      : score >= 16 && score <= 23
      ? "criador"
      : score >= 8 && score <= 15
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

  function handleCheckboxChange(tecnica) {
    if (tecnicasSelecionadas.includes(tecnica)) {
      setTecnicasSelecionadas(
        tecnicasSelecionadas.filter((t) => t !== tecnica)
      );
    } else {
      setTecnicasSelecionadas([...tecnicasSelecionadas, tecnica]);
    }
  }

  function handleCheckboxCartasChange(cartas) {
    if (cartasIrrelevantesSelecionadas.includes(cartas)) {
      setcartasIrrelevantesSelecionadas(
        cartasIrrelevantesSelecionadas.filter((t) => t !== cartas)
      );
    } else {
      setcartasIrrelevantesSelecionadas([
        ...cartasIrrelevantesSelecionadas,
        cartas,
      ]);
    }
  }

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
          <StyledDicaText>
            Dica: Há duas cartas corretas para cada requisito em cada umas das 8
            primeiras perguntas
          </StyledDicaText>
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
                      onChange={(e) => {
                        const valor = e.target.value;
                        const respostas = valor
                          .split(",")
                          .map((r) => r.trim())
                          .filter((r) => r !== "");

                        if (respostas.length <= 2) {
                          setRespostasFuncionais({
                            ...respostasFuncionais,
                            [index]: valor,
                          });
                        }
                      }}
                    />

                    <StyledInput
                      placeholder="Digite o número das cartas separados por vírgula"
                      value={respostasNaoFuncionais[index] || ""}
                      onChange={(e) => {
                        const valor = e.target.value;
                        const respostas = valor
                          .split(",")
                          .map((r) => r.trim())
                          .filter((r) => r !== "");

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
                        As cartas corretas eram:{" "}
                        {questao?.respostasCorretasFuncionais.join(", ")}
                      </StyledGabaritoText>

                      <StyledGabaritoText>
                        As cartas corretas eram:{" "}
                        {questao?.respostasCorretasNaoFuncionais.join(", ")}
                      </StyledGabaritoText>
                    </StyledRequisitosDiv>
                  )}
                </StyledQuestionsDiv>
              ))}
              <StyledH2>
                9. Quais Técnicas de levantamento de Requisitos foram utilizadas
                no jogo?{" "}
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
                  As respostas corretas eram: Análise de Documentos, Entrevista,
                  Questionário e Observação
                </StyledDicaText>
              )}
              <StyledH2>
                Selecione quais dessas cartas foram reveladas na mesa
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
                  Para cada carta selecionada foi descontado 1 ponto, pois elas
                  eram irrelevantes
                </StyledDicaText>
              )}
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
            {Explicagabarito && (
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

const StyledTecnicasLabel = styled.h3`
  font-size: 16px;
`;
const StyledImg = styled.img`
  margin-top: 16px;
  width: 100%;
  max-width: 500px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 4px;

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
const StyledDicaText = styled.p`
  color: red;
  font-weight: bold;
`;
