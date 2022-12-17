import { ContaPoupanca } from './contaPoupanca';
import { ContaCorrente } from './contaCorrente';
import { Endereco, IUsuario, Pessoa } from './model/pessoa';

export class Cliente extends Pessoa implements IUsuario {
  private enderecos: Set<Endereco> = new Set<Endereco>();
  private vip: boolean;
  private contasCorrentes: ContaCorrente[] = [];
  private contasPoupanca: ContaPoupanca[] = [];

  constructor(
    cpf: string,
    nome: string,
    telefone: string,
    vip: boolean = false
  ) {
    super(cpf, nome, telefone);
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
    this.enderecos.add(endereco);
  }

  public listarEnderecos(): Set<Endereco> {
    return this.enderecos;
  }
}
