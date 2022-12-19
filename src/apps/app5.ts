import { Cliente, ContaPoupanca } from '../class';
import { Endereco } from '../class/model/pessoa';

export function aplicacao5() {
  console.log('\n----- Aplicacao 5 -----\n');

  const netflix = new Endereco(
    '06455-911',
    'Alameda Xingu',
    '350',
    'Alphaville Industrial',
    'Sao Paulo',
    'SP'
  );

  const contaPoupancaGuilherme = new ContaPoupanca('333', new Date(2022, 0, 1));
  const clienteGuilherme = new Cliente(
    '98998777885',
    'Guilherme',
    '998955887',
    netflix,
    contaPoupancaGuilherme
  );
  clienteGuilherme.criarConta(contaPoupancaGuilherme);
  contaPoupancaGuilherme.depositar(200, new Date(2022, 0, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 1, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 2, 10));

  contaPoupancaGuilherme.sacar(100, new Date(2022, 2, 5));

  contaPoupancaGuilherme.depositar(200, new Date(2022, 3, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 4, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 5, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 6, 10));

  contaPoupancaGuilherme.sacar(200, new Date(2022, 6, 8));

  contaPoupancaGuilherme.depositar(200, new Date(2022, 7, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 8, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 9, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 10, 10));
  contaPoupancaGuilherme.depositar(200, new Date(2022, 11, 10));

  console.log(contaPoupancaGuilherme.calcularSaldo());
}
