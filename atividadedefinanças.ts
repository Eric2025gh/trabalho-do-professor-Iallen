// classe para construir transações
class transacao{
 tipo : 'RECEITA' | 'DESPESA';
 valor : number;
 descricao:string;
 categoria :string;

 constructor(tipo:'RECEITA' | 'DESPESA',valor:number,descricao:string){
   this.tipo = tipo;
   this.valor = valor;
   this.descricao = descricao;
   this.categoria = '';
  }
}

// classe principal para efetuar todas as funções
class contaBancaria {
    titular: string;
    transacores : transacao[];
    constructor(nome: string) {
      this.titular = nome;
      this.transacores = [];
    }

 // função adicionar receita
 adicionarReceita(){
    let descricao = prompt("Digite uma descrição da receita:")!;
    let valor = Number(prompt("Digite o valor da receita:")!);
    let a = new transacao('RECEITA',valor,descricao);
    this.transacores.push(a);
    alert('Receita adicionada com sucesso!');
  }

 // função adicionar despesa
 adicionarDespesa(){
    let descricao = prompt("Digite uma descrição da Despesa:")!;
    let valor = Number(prompt("Digite o valor da Despesa:")!);
    let a = new transacao('DESPESA',valor,descricao);
    let c = (Number(prompt('ESCOLHA UMA CATEGORIA \n\n1 - Moradia e Contas de Casa\n2 - Alimentação\n3 - Transporte\n4 - Saúde e Bem-estar\n5 - Família e Pessoal\n 6 - Lazer e Estilo de Vida\n7 - Dívidas e investimentos\n8 - Outros')!));
   
    //categorias
    if(c == 1){
      a.categoria = 'Moradia e Contas de Casa';
    }
    if(c == 2){
      a.categoria = 'Alimentação';
    }
    if(c == 3){
      a.categoria = 'Transporte';
    }
    if(c == 4){
      a.categoria = 'Saúde e Bem-estar';
    }
    if(c == 5){
      a.categoria = 'Família e Pessoal';
    }
    if(c == 6){
      a.categoria = 'Lazer e Estilo de Vida';
    }
    if(c == 7){
     a.categoria = 'Dívidas e investimentos';
    }
    if(c == 8){
     a.categoria = 'Outros';
    }

    //verificador 
    if ( isNaN(c) || c < 1 || c > 8) {
     alert("Opção inválida. nenhuma categoria registrada.");
    }

   this.transacores.push(a);
   alert('Despesa adicionada com sucesso!');
  }

 // função ver o saldo
  verSaldo(){
    let texto = "RESUMO DAS TRANSAÇÕES :\n\n";
    let t,i:number; let s: string =''; t = 0;
    for(i=0;i<this.transacores.length;i++){
      if(this.transacores[i].tipo =='RECEITA'){
       texto += `Receita: R$${this.transacores[i].valor.toFixed(2)} - ${this.transacores[i].descricao}\n`;
        t = t + this.transacores[i].valor;
      }else{
        s += `Despesa: R$${this.transacores[i].valor.toFixed(2)} - ${this.transacores[i].descricao}\n`;
        t = t - this.transacores[i].valor;
      }
    }
   texto += `\n${s}\n\nsaldo total: ${t.toFixed(2)}`;
   alert(texto);
  }

   // função filtrar transações
  filtrarTransacao(){
   let opcao : number = Number(prompt('Deseja filtrar por nome, valor ou categoria ?\n\n1 - Nome\n2 - Valor')!);

   //verificador 
   if(opcao!=1 && opcao!=2){
     alert('Resposta inválida!');
     this.filtrarTransacao();
    }

   //filtrar por nome
   if(opcao==1){
     let nomedatransacao: string;
     nomedatransacao = prompt('Digite o nome da transção')!;
     let texto: string; texto = `ESSAS SÃO TODAS AS TRANSAÇÕES NOMEADAS COMO ${nomedatransacao.toUpperCase()} :\n\n`
     let i: number;
     for (i = 0; i < this.transacores.length; i++) {
       if (nomedatransacao == this.transacores[i].descricao) {
         texto +=  this.transacores[i].tipo +': '  + this.transacores[i].descricao + ' - ' +  this.transacores[i].valor+ '\n';
        }
      }
      alert(texto);
    }

    //filtrar por valor
   if(opcao==2){
     let menor,maior : number;
      menor = Number(prompt('Digite o MENOR valor do intervalo que está procurando')!);
      maior = Number(prompt('Agora o MAIOR valor')!);
      let texto: string; texto = `ESSAS SÃO TODAS AS TRANSAÇÕES COM VALOR ENTRE ${menor} e ${maior} :\n\n`
      let i: number;
      for (i = 0; i < this.transacores.length; i++) {
        if (menor<=this.transacores[i].valor&& maior >= this.transacores[i].valor) {
          texto +=  this.transacores[i].tipo +' : '  + this.transacores[i].descricao + ' - ' +  this.transacores[i].valor.toFixed(2)+ '\n';
        }
      }
      alert(texto);
    }

  }


    //função excluir transações
  excluirTransacao() {
    let texto = " QUAL TRANSAÇÃO DESEJA EXCLUIR ? \n\n";
    let i:number; 
    for(i=0;i<this.transacores.length;i++){
    texto += `${i+1} - ${this.transacores[i].tipo}: R$${this.transacores[i].valor.toFixed(2)} - ${this.transacores[i].descricao}\n`; 
    }
   let posicao : number = Number(prompt(texto)!);
   this.transacores.splice((posicao-1),1);
   alert('transação removida com sucesso!');
  }


  funcaoPrincipal():number {

   let op: number = -1;

   while (isNaN(op) || op < 1 || op > 6) {
     op = Number(prompt(`Escolha uma opção, ${this.titular}:\n\n1 -> Adicionar Receita\n2 -> Adicionar Despesa\n3 -> Ver Saldo\n4 -> Filtrar Transações\n5 -> Excluir transação \n6 -> Sair`)!);
      if (isNaN(op) || op < 1 || op > 6) {
        alert("Opção inválida. Tente novamente.");
        return this.funcaoPrincipal();
      }
    }
   
     if (op === 1) {
        this.adicionarReceita();
    } else if (op === 2) {
        this.adicionarDespesa();
    } else if (op === 3) {
       this.verSaldo();
    } else if (op === 4) {
        this.filtrarTransacao();
    } else if (op === 5) {
        this.excluirTransacao();
    } else if (op === 6) {
        alert(`Até mais, ${this.titular}! Agradecemos sua preferência.`);
    }


   if(op!=6){
    this.funcaoPrincipal();
   }
   
   return - 1;
  }
}

  let p1:contaBancaria;
  p1 = new contaBancaria('eric');
  p1.funcaoPrincipal();

