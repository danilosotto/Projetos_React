import React from "react";
import { useMesApi } from "../../api";

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data);

  const alterarPrevisaoEntrada = (evt) => {
    alterarMes({
      previsao_entrada: evt.target.value,
    });
  };

  const alterarPrevisaoSaida = (evt) => {
    alterarMes({
      previsao_saida: evt.target.value,
    });
  };

  return (
    <React.Fragment>
      {!infoMes.loading && (
        <div>
          Previsão entrada: {infoMes.payload.previsao_entrada}{" "}
          <input type="text" onBlur={alterarPrevisaoEntrada} />/ Previsão saída:{" "}
          {infoMes.payload.previsao_saida}{" "}
          <input type="text" onBlur={alterarPrevisaoSaida} /> <br />
          Entradas: {infoMes.payload.entradas} / Saídas:{" "}
          {infoMes.payload.saidas}
        </div>
      )}
    </React.Fragment>
  );
};

export default InfoMes;
