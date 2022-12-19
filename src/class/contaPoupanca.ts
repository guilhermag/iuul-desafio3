import { Credito } from './model/conta';
import { Conta } from './model/conta/conta';

export class ContaPoupanca extends Conta {
  private rentabilidadeMensal: number;
  private historicoRendimentos: number[] = [];

  constructor(
    numero: string,
    dataCriacao: Date = new Date(),
    rentabilidadeMensal: number = 1
  ) {
    super(numero, dataCriacao);
    this.rentabilidadeMensal = Math.abs(rentabilidadeMensal / 100);
  }

  private arredondar(numero: number, decimal: number) {
    return parseFloat(numero.toFixed(decimal));
  }

  private getHistoricoRendimentos(): number[] {
    return this.historicoRendimentos;
  }

  private setHistoricoRendimentos(historico: number[]) {
    this.historicoRendimentos = historico;
  }

  private mudarCredito(credito: Credito) {
    const creditos = this.getCreditos();
    const indice = creditos.findIndex(
      (creditoOriginal) => creditoOriginal.getData() === credito.getData()
    );
    creditos[indice] = credito;
    this.atualizarCreditos(creditos);
  }

  private getSaldo(dataDesejada: Date): number {
    const creditos = this.getCreditos(dataDesejada);
    let somaCreditos = 0;
    const debitos = this.getDebitos(dataDesejada);
    let somaDebitos = 0;

    creditos.forEach((credito) => (somaCreditos += credito.getValor()));
    debitos.forEach((debito) => (somaDebitos += debito.getValor()));
    return somaCreditos - somaDebitos;
  }

  private getUltimoDiaMes(ano: number, mes: number) {
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    return new Date(ano, mes, ultimoDiaMes);
  }

  private duracaoContaMeses(): number {
    const dataCriacao = this.getDataCriacao();
    const dataAtual = new Date();

    return (
      dataAtual.getFullYear() * 12 +
      dataAtual.getMonth() -
      (dataCriacao.getFullYear() * 12 + dataCriacao.getMonth())
    );
  }

  private atualizarRendimentos() {
    const mesesConta = this.duracaoContaMeses();
    const dataCriacao = this.getDataCriacao();
    const historicoRendimentos = this.getHistoricoRendimentos();
    let contagemMes = dataCriacao.getMonth();

    for (let i = 0; i <= mesesConta; i++) {
      // Cálculo dos meses e anos atuais
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

      const dataUltimoDia = this.getUltimoDiaMes(anoAtual, mesAtual);
      const saldoUltimoDia = this.getSaldo(dataUltimoDia);

      let rentabilidadeMensal = 0;

      // Verificar se existem novos rendimentos
      if (historicoRendimentos[i]) {
        rentabilidadeMensal = saldoUltimoDia * this.rentabilidadeMensal;
        const diferenca = rentabilidadeMensal - historicoRendimentos[i];
        rentabilidadeMensal -= diferenca;

        const checkMudancaRendimentos = !(
          Math.round(historicoRendimentos[i]) ===
          Math.round(rentabilidadeMensal)
        );

        if (checkMudancaRendimentos) {
          this.mudarCredito(
            new Credito(dataUltimoDia, rentabilidadeMensal, 'rendimentos')
          );
          historicoRendimentos[i] = rentabilidadeMensal;
        }
      } else {
        // A primeira vez que os rendimentos são calculados também é populado o vetor de historicoRendimentos
        rentabilidadeMensal = saldoUltimoDia * this.rentabilidadeMensal;
        historicoRendimentos.push(rentabilidadeMensal);
        this.realizarCredito(rentabilidadeMensal, dataUltimoDia, 'rendimentos');
      }

      contagemMes++;
    }
    this.setHistoricoRendimentos(historicoRendimentos);
  }

  public calcularRendimento() {
    this.atualizarRendimentos();
    const creditos = this.getCreditos();
    let rendimentos = 0;

    creditos.forEach((credito: Credito) => {
      if (credito.getDescricao() === 'rendimentos') {
        rendimentos += credito.getValor();
      }
    });

    return rendimentos;
  }

  public calcularSaldo(): number {
    const rendimentos = this.arredondar(this.calcularRendimento(), 2);
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = this.arredondar(creditos - debitos, 2);

    console.log(
      `A conta ${this.getNumeroConta()} possui saldo total de R$ ${saldoFinal}, sendo R$ ${rendimentos} de rendimentos até o momento.`
    );

    return saldoFinal;
  }
}
