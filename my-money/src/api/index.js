import Rest from "../utils/rest";

const baseURL = "https://mymoney-e9bb1.firebaseio.com/";
const { useGet, usePost, usePatch } = Rest(baseURL);

export const useMesApi = (data) => {
  const [dataAlterarMes, alterarMes] = usePatch(`/meses/${data}`);
  const infoMes = useGet(`/meses/${data}`);
  return { infoMes, alterarMes };
};

export const useMovimentacaoApi = (data) => {
  const movimentacoes = useGet(`/movimentacoes/${data}`);
  const salvarNovaMovimentacao = usePost(`/movimentacoes/${data}`);
  return { movimentacoes, salvarNovaMovimentacao };
};
