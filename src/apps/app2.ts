import { Cliente, ContaCorrente } from '../class';
import { Endereco } from '../class/model/pessoa';

export function aplicacao2() {
  const amazon = new Endereco(
    '04551-065',
    'Edificio JK, Avenida Chedid Jafet',
    '200',
    'AWS',
    'Sao Paulo',
    'SP'
  );

  const google = new Endereco(
    '04538-133',
    'Av. Brg. Faria Lima',
    '3477',
    '18 andar - Google',
    'Sao Paulo',
    'SP'
  );

  const netflix = new Endereco(
    '06455-911',
    'Alameda Xingu',
    '350',
    'Alphaville Industrial',
    'Sao Paulo',
    'SP'
  );
  const clienteGuilherme = new Cliente(
    '98998777885',
    'Guilherme',
    '998955887',
    netflix,
    new ContaCorrente('56745')
  );
  clienteGuilherme.adicionarEndereco(amazon);
  clienteGuilherme.adicionarEndereco(google);

  console.log('\n----- Aplicacao 2 -----\n');
  console.log(clienteGuilherme.listarEnderecos(), '\n');
}
