import { PedidoAjuda } from './types/PedidoAjuda';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  NovaSolicitacao: undefined;
  MinhasSolicitacoes: undefined;
  EditarSolicitacao: { pedido: PedidoAjuda };
  TiposAjuda: undefined;
  Confirmacao: undefined;
};

