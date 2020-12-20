import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMovimentacaoApi } from "../../api";
import InfoMes from "../Movimentacoes/InfoMes";
import AdicionarMovimentacao from "../Movimentacoes/AdicionarMovimentacao";

const Movimentacoes = ({ match }) => {
  const { movimentacoes, salvarNovaMovimentacao } = useMovimentacaoApi(
    match.params.data
  );

  const Salvar = async (dados) => {
    await salvarNovaMovimentacao(dados);
    movimentacoes.refetch();
    setTimeout(() => {
      // infoMes.refetch();
    }, 3000);
  };

  if (movimentacoes.error === "Permission denied") {
    return <Redirect to={"/login"}></Redirect>;
  }

  return (
    <div className="container">
      <h1>{`Movimentações ${match.params.data}`}</h1>
      <InfoMes data={match.params.data}></InfoMes>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.payload &&
            Object.keys(movimentacoes.payload).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{movimentacoes.payload[movimentacao].descricao}</td>
                  <td>{movimentacoes.payload[movimentacao].valor}</td>
                  <td>
                    <button className="btn btn-danger">Excluir</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <AdicionarMovimentacao
          salvarNovaMovimentacao={Salvar}
        ></AdicionarMovimentacao>
      </table>
    </div>
  );
};

export default Movimentacoes;
