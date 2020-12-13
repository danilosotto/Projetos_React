import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

const minAno = 2018;
const maxAno = 2022;
const minMes = 1;
const maxMes = 12;

const AdicionarMes = () => {
  const refExercicio = useRef();
  const refMes = useRef();
  const arrayAno = [];
  const arrayMes = [];
  const [redirecionamento, setRedirecionamento] = useState("");

  for (let i = minAno; i <= maxAno; i++) {
    arrayAno.push(i);
  }
  for (let i = minMes; i <= maxMes; i++) {
    arrayMes.push(i);
  }

  const zeroLeft = (valor) => {
    if (valor < 10) {
      return "0" + valor;
    }
    return valor;
  };

  const adicionarMes = () => {
    setRedirecionamento(
      `/movimentacoes/${refExercicio.current.value}-${refMes.current.value}`
    );
  };

  if (redirecionamento !== "") {
    return <Redirect to={redirecionamento}></Redirect>;
  }

  return (
    <React.Fragment>
      <h2>Adicionar Mês</h2>

      <select ref={refExercicio}>
        {arrayAno.map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>

      <select ref={refMes}>
        {arrayMes.map(zeroLeft).map((mes) => (
          <option key={mes} value={mes}>
            {mes}
          </option>
        ))}
      </select>

      <button className="btn btn-success ml-2" onClick={adicionarMes}>
        Adicionar Mês
      </button>
    </React.Fragment>
  );
};

export default AdicionarMes;
