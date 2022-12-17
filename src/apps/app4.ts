import { Cliente, ContaCorrente, ContaPoupanca } from '../class';

export function aplicacao4() {
  console.log('\n----- Aplicacao 4 -----\n');

  const clienteBruna = new Cliente('98784122336', 'Bruna', '777777777');
  const contaCorrenteBruna = new ContaCorrente('111');
  clienteBruna.criarContaCorrente(contaCorrenteBruna);
  contaCorrenteBruna.depositar(1000);

  const clienteGuilherme = new Cliente('98998777885', 'Guilherme', '998955887');
  const contaPoupancaGuilherme = new ContaPoupanca('333');
  clienteGuilherme.criarContaPoupanca(contaPoupancaGuilherme);
  contaPoupancaGuilherme.depositar(1000);

  contaCorrenteBruna.transferir(contaPoupancaGuilherme, 500);
  console.log('Saldo Guilherme: ', contaPoupancaGuilherme.calcularSaldo());
  console.log('Saldo Bruna: ', contaCorrenteBruna.calcularSaldo());
}
