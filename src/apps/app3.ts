import { Cliente, ContaCorrente } from '../class';
import { Endereco } from '../class/model/pessoa';

export function aplicacao3() {
  console.log('\n----- Aplicacao 3 -----\n');

  const netflix = new Endereco(
    '06455-911',
    'Alameda Xingu',
    '350',
    'Alphaville Industrial',
    'Sao Paulo',
    'SP'
  );
  const contaCorrente = new ContaCorrente('56745');
  const clienteGuilherme = new Cliente(
    '98998777885',
    'Guilherme',
    '998955887',
    netflix,
    contaCorrente
  );
  clienteGuilherme.criarConta(contaCorrente);

  contaCorrente.depositar(100);
  contaCorrente.depositar(100);

  contaCorrente.sacar(50);

  console.log(contaCorrente.calcularSaldo(), '\n');
}
