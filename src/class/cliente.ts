import { ContaPoupanca } from './contaPoupanca';
import { ContaCorrente } from './contaCorrente';
import { Endereco, IUsuario, Pessoa } from './model/pessoa';
import { Conta } from './model/conta';

export class Cliente extends Pessoa implements IUsuario {
  private enderecos: Set<Endereco> = new Set();
  private vip: boolean;
  private contas: Conta[] = [];

  constructor(
    cpf: string,
    nome: string,
    telefone: string,
    endereco: Endereco,
    conta: Conta,
    vip: boolean = false
  ) {
    super(cpf, nome, telefone);
    this.vip = vip;
    this.enderecos.add(endereco);
    this.contas.push(conta);
  }

  public autenticar(): boolean {
    return true;
  }

  public criarConta(conta: Conta) {
    this.contas.push(conta);
  }

  public listarContas(): Conta[] {
    return this.contas;
  }

  public adicionarEndereco(endereco: Endereco) {
    this.enderecos.add(endereco);
  }

  public listarEnderecos(): Set<Endereco> {
    return this.enderecos;
  }
}
