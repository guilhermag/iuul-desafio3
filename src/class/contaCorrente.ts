import { Conta } from './model/conta/conta';

export class ContaCorrente extends Conta {
  private limite: number;

  constructor(numero: string, limite: number = 500) {
    super(numero);
    this.limite = limite;
  }

  private atualizarLimite(valor: number) {
    this.limite = valor;
  }

  public calcularSaldo(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = creditos - debitos + this.limite;

    return saldoFinal;
  }

  public sacar(valor: number, dataOperacao: Date = new Date()) {
    const saldo = this.calcularSaldo();

    if (valor < saldo) {
      this.atualizarLimite(saldo - valor);
      this.realizarDebito(valor, dataOperacao);
      console.log(
        `Operacao realizada com sucesso para a conta ${this.retornarNumeroConta()}`
      );
    } else {
      console.log(
        `Usuario da conta ${this.retornarNumeroConta()}, não possue saldo ou limite para essa operacao.`
      );
    }
  }

  public transferir(
    contaDestino: Conta,
    valor: number,
    dataOperacao: Date = new Date()
  ) {
    const saldo = this.calcularSaldo();
    this.sacar(valor, dataOperacao);
    if (saldo === this.calcularSaldo()) {
      return;
    }
    contaDestino.depositar(valor, dataOperacao);
  }
}
