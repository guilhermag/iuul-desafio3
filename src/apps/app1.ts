import { Funcionario } from '../class/funcionario';
import { Cargo } from '../class/model/pessoa/cargo';

export function aplicacao1() {
  const cargoGerente = new Cargo('Gerente');

  const gerente = new Funcionario(
    '25555666998',
    'jose',
    '999999999',
    10000,
    cargoGerente
  );

  const atendente = new Funcionario(
    '88998777858',
    'ronaldo',
    '888888888',
    3000
  );

  console.log(
    '\n----- Aplicacao 1 -----\n\n',
    gerente,
    '\n\n',
    atendente,
    '\n'
  );
}
