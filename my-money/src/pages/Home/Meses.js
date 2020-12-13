import React from "react";
import Rest from "../../utils/rest";
import { Link } from "react-router-dom";

const baseURL = "https://mymoney-e9bb1.firebaseio.com/";
const { useGet } = Rest(baseURL);

const Meses = () => {
  const data = useGet("meses");

  if (data.loading) {
    return <span>Carregando...</span>;
  }

  if (data.payload && Object.keys(data.payload).length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão entrada</th>
            <th>Entrada</th>
            <th>Previsão saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.payload).map((mes) => {
            return (
              <tr key={mes}>
                <td>
                  <Link to={`/movimentacoes/${mes}`}>{mes}</Link>
                </td>
                <td>{data.payload[mes].previsao_entrada}</td>
                <td>{data.payload[mes].entradas}</td>
                <td>{data.payload[mes].previsao_saida}</td>
                <td>{data.payload[mes].saidas}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

export default Meses;
