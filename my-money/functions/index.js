const functions = require("firebase-functions");
//Quando salvar em movimentacoes vc faz alguma coisa

const admin = require("firebase-admin");
//Acesso a tudo do banco em geral

//Logar no firebase
admin.initializeApp();

// Estou exportando uma função vinculada a referencia do database
// Ou seja, qualquer movimentacao que acontecer em /movimentacoes/dia você vai fazer algo.

exports.soma = functions.database
  .ref("/movimentacoes/{dia}")
  .onWrite(async (change, context) => {
    const mesesRef = admin.database().ref("/meses/" + context.params.dia);
    const movimentacoesRef = change.after.ref;
    const movimentacoesSS = await movimentacoesRef.once("value");
    const movimentacoes = movimentacoesSS.val();

    let entradas = 0;
    let saidas = 0;

    Object.keys(movimentacoes).forEach((item) => {
      if (movimentacoes[item].valor > 0) {
        entradas += movimentacoes[item].valor;
      } else {
        saidas += movimentacoes[item].valor;
      }
    });

    return mesesRef.transaction((current) => {
      if (current === null) {
        return {
          entradas,
          saidas,
          previsao_entrada: 0,
          previsao_saida: 0,
        };
      } else {
        return {
          ...current,
          entradas,
          saidas,
        };
      }
    });
  });
