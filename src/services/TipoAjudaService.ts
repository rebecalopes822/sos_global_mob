import api from './api';

export interface TipoAjuda {
  id: number;
  nome: string;
  descricao: string;
}

export const listarTiposAjuda = async () => {
  return api.get<TipoAjuda[]>('/TipoAjuda');
};
