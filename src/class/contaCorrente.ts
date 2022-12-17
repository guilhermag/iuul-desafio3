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

  private calcularSaldoBruto(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    return creditos - debitos;
  }

  public calcularSaldo(): number {
    const saldo = this.calcularSaldoBruto();
    const saldoFinal = saldo + this.limite;
    console.log(
      `A conta ${this.retornarNumeroConta()} possui R$ ${saldo} de saldo e R$ ${
        this.limite
      } de limite`
    );

    return saldoFinal;
  }

  public sacar(valor: number, dataOperacao: Date = new Date()) {
    const saldo = this.calcularSaldo();

    if (valor < saldo) {
      if (valor > this.calcularSaldoBruto()) {
        this.atualizarLimite(this.limite - valor);
      }
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
