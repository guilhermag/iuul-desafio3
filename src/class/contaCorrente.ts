import { Conta } from './model/conta/conta';

export class ContaCorrente extends Conta {
  private limite: number;

  constructor(numero: string, limite: number = 500) {
    super(numero);
    this.limite = limite;
  }

  // Funcoes auxiliares
  private atualizarLimite(valor: number) {
    this.limite = valor;
  }

  private getLimite(): number {
    return this.limite;
  }

  private calcularSaldoBruto(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    return creditos - debitos;
  }

  // Funcoes principais
  public calcularSaldo(): number {
    const saldo = this.calcularSaldoBruto();
    const limite = this.getLimite();
    const saldoFinal = saldo + limite;
    console.log(
      `A conta ${this.getNumeroConta()} possui R$ ${saldo} de saldo e R$ ${limite} de limite`
    );

    return saldoFinal;
  }

  public sacar(
    valor: number,
    dataOperacao: Date = new Date(),
    operacaoNormal: boolean = true
  ) {
    const saldo = this.calcularSaldoBruto();
    const limite = this.getLimite();

    if (valor <= saldo + limite) {
      if (valor > saldo) {
        this.atualizarLimite(limite + saldo - valor);
      }
      this.realizarDebito(valor, dataOperacao);
      if (operacaoNormal) {
        console.log(
          `Saque de R$ ${valor} realizado para a conta ${this.getNumeroConta()}.`
        );
      }
    } else {
      console.log(
        `Usuario da conta ${this.getNumeroConta()}, não possue saldo ou limite para essa operacao.`
      );
    }
  }

  public transferir(
    contaDestino: Conta,
    valor: number,
    dataOperacao: Date = new Date()
  ) {
    const limite = this.getLimite();
    const saldo = this.calcularSaldoBruto();
    this.sacar(valor, dataOperacao, false);
    if (saldo + limite === this.calcularSaldoBruto() + this.getLimite()) {
      return;
    }
    contaDestino.depositar(valor, dataOperacao, false);
    console.log(
      `Transferencia de R$ ${valor} realizada da conta ${this.getNumeroConta()} para a conta ${contaDestino.getNumeroConta()}.`
    );
  }
}
