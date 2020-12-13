import React, { useState } from "react";
import Rest from "../utils/rest";

const baseURL = "https://mymoney-e9bb1.firebaseio.com/";
const { useGet, usePost, usePatch } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const paramData = match.params.data;
  const data = useGet(`/movimentacoes/${paramData}`);
  const dataMeses = useGet(`/meses/${paramData}`);
  const postMovimentacao = usePost(`/movimentacoes/${paramData}`);
  const [dataPatch, patch] = usePatch();

  const OnChangeDescricao = (evt) => {
    setDescricao(evt.target.value);
  };

  const OnChangeValor = (evt) => {
    setValor(evt.target.value);
  };

  const Salvar = async () => {
    if (!isNaN(valor) || valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await postMovimentacao({
        descricao,
        valor: parseFloat(valor),
      });
      setDescricao("");
      setValor("");
      data.refetch();
      setTimeout(() => {
        dataMeses.refetch();
      }, 3000);
    }
  };

  const alterarPrevisaoEntrada = (evt) => {
    patch(`/meses/${paramData}`, {
      previsao_entrada: evt.target.value,
    });
  };

  const alterarPrevisaoSaida = (evt) => {
    patch(`/meses/${paramData}`, {
      previsao_saida: evt.target.value,
    });
  };

  return (
    <div className="container">
      <h1>{`Movimentações ${paramData}`}</h1>

      {!dataMeses.loading && (
        <div>
          Previsão entrada: {dataMeses.payload.previsao_entrada}{" "}
          <input type="text" onBlur={alterarPrevisaoEntrada} />/ Previsão saída:{" "}
          {dataMeses.payload.previsao_saida}{" "}
          <input type="text" onBlur={alterarPrevisaoSaida} /> <br />
          Entradas: {dataMeses.payload.entradas} / Saídas:{" "}
          {dataMeses.payload.saidas}
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.payload &&
            Object.keys(data.payload).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{data.payload[movimentacao].descricao}</td>
                  <td>{data.payload[movimentacao].valor}</td>
                  <td>
                    <button className="btn btn-danger">Excluir</button>
                  </td>
                </tr>
              );
            })}

          <tr>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={OnChangeDescricao}
              ></input>
            </td>
            <td>
              <input type="text" value={valor} onChange={OnChangeValor}></input>
            </td>
            <td>
              <button className="btn btn-success" onClick={Salvar}>
                Salvar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Movimentacoes;
