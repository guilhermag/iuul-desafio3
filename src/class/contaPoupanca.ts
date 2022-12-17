import { Conta } from './model/conta/conta';

export class ContaPoupanca extends Conta {
  private rentabilidadeMensal: number;

  constructor(
    numero: string,
    dataCriacao: Date = new Date(),
    rentabilidadeMensal: number = 1
  ) {
    super(numero, dataCriacao);
    this.rentabilidadeMensal = Math.abs(rentabilidadeMensal / 100);
  }

  private recuperarSaldo(dataDesejada: Date): number {
    const creditos = this.getCreditos(dataDesejada);
    let somaCreditos = 0;
    const debitos = this.getDebitos(dataDesejada);
    let somaDebitos = 0;

    creditos.forEach((credito) => (somaCreditos += credito.getValor()));
    debitos.forEach((debito) => (somaDebitos += debito.getValor()));
    return somaCreditos - somaDebitos;
  }

  private recuperarOperacoes() {
    // const creditos = this.getCreditos();
    // const debitos = this.getDebitos();
    // const anosOperacoes = creditos.map((credito) =>
    //   credito.getData().getFullYear()
    // );
    // const anosSet = new Set(anosOperacoes);
    // anosSet.forEach(ano => {
    //   const mesesSet =
    // })
    // const resumoOperacoes= {'teste': 'teste123'};
    // const result = Object.assign({}, resumoOperacoes, { teste2: 'teste' });
    // return { creditos: creditos, debitos: debitos };
  }

  private getUltimoDiaMes(ano: number, mes: number) {
    return new Date(ano, mes + 1, 0).getDate();
  }

  private criarArraySaldos() {
    const dataCriacao = this.getDataCriacao();
    const dataAtual = new Date();
    const saldos = [];

    const mesesConta =
      dataAtual.getFullYear() * 12 +
      dataAtual.getMonth() -
      (dataCriacao.getFullYear() * 12 + dataCriacao.getMonth());

    let contagemMes = dataCriacao.getMonth();

    for (let i = 0; i < mesesConta; i++) {
      let anoAtual = 0;
      let mesAtual = 0;

      if (contagemMes / 12 < 1) {
        anoAtual = dataCriacao.getFullYear();
        mesAtual = contagemMes;
      } else {
        const anosPassados = Math.trunc(contagemMes / 12);
        anoAtual = dataCriacao.getFullYear() + anosPassados;
        mesAtual = contagemMes - 12;
      }
      const ultimoDiaMes = this.getUltimoDiaMes(anoAtual, mesAtual);
      const dataUltimoDia = new Date(anoAtual, mesAtual, ultimoDiaMes);

      const rentabilidadeMensal =
        this.recuperarSaldo(dataUltimoDia) * this.rentabilidadeMensal;
      this.realizarCredito(rentabilidadeMensal, dataUltimoDia, 'rendimentos');

      const data = `${dataUltimoDia.toLocaleString('default', {
        month: 'long',
      })} / ${dataUltimoDia.getFullYear()}`;

      saldos.push({ data: data, rendimento: rentabilidadeMensal.toFixed(2) });
      contagemMes++;
    }

    return saldos;
  }

  private atualizarRendimentos() {}

  public calcularRendimento() {
    return this.criarArraySaldos();
  }

  public calcularSaldo(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = creditos - debitos;

    return saldoFinal;
  }

  public sacar(valor: number) {}
}
