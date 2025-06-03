import api from './api';

export interface PedidoAjudaDTO {
  usuarioId: number;
  tipoAjudaId: number;
  endereco: string;
  quantidadePessoas: number;
  nivelUrgencia: number;
}

export const criarPedidoAjuda = async (dados: PedidoAjudaDTO) => {
  return api.post('/PedidoAjuda', dados);
};

export const listarPedidosAjuda = async () => {
  return api.get('/PedidoAjuda');
};

export const buscarPedidoPorId = async (id: number) => {
  return api.get(`/PedidoAjuda/${id}`);
};

export const atualizarPedido = async (id: number, dados: PedidoAjudaDTO) => {
  return api.put(`/PedidoAjuda/${id}`, dados);
};

export const deletarPedido = async (id: number) => {
  return api.delete(`/PedidoAjuda/${id}`);
};
