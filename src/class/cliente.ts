import { ContaPoupanca } from './contaPoupanca';
import { ContaCorrente } from './contaCorrente';
import { Endereco } from './model/pessoa/endereco';
import { IUsuario, Pessoa } from './model/pessoa/pessoa';

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
