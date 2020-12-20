import React, { useState } from "react";

const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  //Gestão do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const OnChangeDescricao = (evt) => {
    setDescricao(evt.target.value);
  };

  const OnChangeValor = (evt) => {
    setValor(evt.target.value);
  };

  const Salvar = async () => {
    if (!isNaN(valor) || valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor),
      });
      setDescricao("");
      setValor("");
    }
  };

  return (
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
  );
};

export default AdicionarMovimentacao;
