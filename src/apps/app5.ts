import { Cliente, ContaPoupanca } from '../class';

export function aplicacao5() {
  console.log('\n----- Aplicacao 5 -----\n');
  const clienteGuilherme = new Cliente('98998777885', 'Guilherme', '998955887');
  const contaPoupancaGuilherme = new ContaPoupanca('333', new Date(2022, 0, 1));
  clienteGuilherme.criarContaPoupanca(contaPoupancaGuilherme);
  contaPoupancaGuilherme.depositar(1000, new Date(2022, 0, 10));
  contaPoupancaGuilherme.depositar(1000, new Date(2022, 1, 10));
  contaPoupancaGuilherme.depositar(1000, new Date(2022, 2, 10));
  contaPoupancaGuilherme.depositar(1000, new Date(2022, 3, 10));
  contaPoupancaGuilherme.depositar(1000, new Date(2022, 4, 10));
  console.log(contaPoupancaGuilherme.calcularRendimento());
}
