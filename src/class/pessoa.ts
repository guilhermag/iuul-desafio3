import { Cargo } from './cargo';
import { ContaCorrente, ContaPoupanca } from './conta';
import { Endereco } from './Endereco';

interface IUsuario {
  autenticar(): boolean;
}

abstract class Pessoa {
  private cpf: string;
  private nome: string;
  private telefone: string;

  constructor(cpf: string, nome: string, telefone: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.telefone = telefone;
  }
}

export class Cliente extends Pessoa implements IUsuario {
  private enderecos: Endereco[] = [];
  private vip: boolean;
  private contasCorrentes: ContaCorrente[] = [];
  private contasPoupanca: ContaPoupanca[] = [];

  constructor(
    cpf: string,
    nome: string,
    telefone: string,
    endereco: Endereco,
    vip: boolean = false
  ) {
    super(cpf, nome, telefone);
    this.enderecos.push(endereco);
    this.vip = vip;
  }

  public autenticar(): boolean {
    return true;
  }

  public criarContaCorrente(contaCorrente: ContaCorrente) {
    this.contasCorrentes.push(contaCorrente);
  }

  public listarContasCorrente(): ContaCorrente[] {
    return this.contasCorrentes;
  }

  public criarContaPoupanca(contaPoupanca: ContaPoupanca) {
    this.contasPoupanca.push(contaPoupanca);
  }

  public listarContasPoupanca(): ContaPoupanca[] {
    return this.contasPoupanca;
  }

  public adicionarEndereco(endereco: Endereco) {
    this.enderecos.push(endereco);
  }

  public listarEnderecos(): Endereco[] {
    return this.enderecos;
  }
}

export class Funcionario extends Pessoa implements IUsuario {
  private salario: number;
  private cargo: Cargo;

  constructor(
    cpf: string,
    nome: string,
    telefone: string,
    salario: number,
    cargo: Cargo = new Cargo('Atendente')
  ) {
    super(cpf, nome, telefone);
    this.salario = salario;
    this.cargo = cargo;
  }

  public autenticar(): boolean {
    return true;
  }
}
