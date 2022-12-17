import { Cargo } from './model/pessoa/cargo';
import { Pessoa, IUsuario } from './model/pessoa/pessoa';

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
