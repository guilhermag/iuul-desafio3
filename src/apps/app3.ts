import { Cliente } from '../class/cliente';
import { ContaCorrente } from '../class/contaCorrente';

export function aplicacao3() {
  console.log('\n----- Aplicacao 3 -----\n');

  const clienteGuilherme = new Cliente('98998777885', 'Guilherme', '998955887');
  const contaCorrente = new ContaCorrente('56745');
  clienteGuilherme.criarContaCorrente(contaCorrente);

  contaCorrente.depositar(100);
  contaCorrente.depositar(100);

  contaCorrente.sacar(50);

  console.log(contaCorrente.calcularSaldo(), '\n');
}
