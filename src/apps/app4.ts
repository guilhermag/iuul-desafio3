import { Cliente, ContaCorrente, ContaPoupanca } from '../class';
import { Endereco } from '../class/model/pessoa';

export function aplicacao4() {
  console.log('\n----- Aplicacao 4 -----\n');

  const netflix = new Endereco(
    '06455-911',
    'Alameda Xingu',
    '350',
    'Alphaville Industrial',
    'Sao Paulo',
    'SP'
  );

  const contaCorrenteBruna = new ContaCorrente('111');
  const clienteBruna = new Cliente(
    '98784122336',
    'Bruna',
    '777777777',
    netflix,
    contaCorrenteBruna
  );
  clienteBruna.criarConta(contaCorrenteBruna);
  contaCorrenteBruna.depositar(1000);

  const contaPoupancaGuilherme = new ContaPoupanca('333');
  const clienteGuilherme = new Cliente(
    '98998777885',
    'Guilherme',
    '998955887',
    netflix,
    contaPoupancaGuilherme
  );
  clienteGuilherme.criarConta(contaPoupancaGuilherme);
  contaPoupancaGuilherme.depositar(1000);

  contaCorrenteBruna.transferir(contaPoupancaGuilherme, 500);
  console.log('Saldo Guilherme: ', contaPoupancaGuilherme.calcularSaldo());
  console.log('Saldo Bruna: ', contaCorrenteBruna.calcularSaldo());
}
