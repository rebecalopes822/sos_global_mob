import { PedidoAjuda } from './PedidoAjuda';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  NovaSolicitacao: undefined;
  MinhasSolicitacoes: undefined;
  Confirmacao: { idSolicitacao: string };
  EditarSolicitacao: { pedido: PedidoAjuda };
  TiposAjuda: undefined; 
};
