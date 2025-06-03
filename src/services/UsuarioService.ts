import api from './api';

export interface UsuarioDTO {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  ehVoluntario: number; // 1 ou 0
}

export const criarUsuario = async (usuario: UsuarioDTO) => {
  return api.post('/Usuario', usuario);
};

export const listarUsuarios = async () => {
  return api.get('/Usuario');
};

export const atualizarUsuario = async (id: number, usuario: UsuarioDTO) => {
  return api.put(`/Usuario/${id}`, usuario);
};

export const deletarUsuario = async (id: number) => {
  return api.delete(`/Usuario/${id}`);
};
