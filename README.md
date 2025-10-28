# Dashboard IPCA & Combustíveis - Projeto Integrador UNIVESP

## 📋 Descrição do Projeto

Seja bem-vindo (a) ao nosso repositório do Projeto Integrador (PI) IV. 

Este é um **dashboard web interativo** desenvolvido como parte do **Projeto Integrador IV** da **Universidade Virtual do Estado de São Paulo (UNIVESP)**, atendendo aos requisitos dos cursos de **Bacharelado em Ciência de Dados** e **Engenharia de Computação**.

O objetivo principal é **analisar e visualizar o impacto das variações nos preços dos combustíveis sobre o Índice Nacional de Preços ao Consumidor Amplo (IPCA)**, utilizando dados históricos (2015-2024) e projeções futuras (2025 em diante).

## 👥 Equipe do Projeto

- **Anderson Rodrigues** (RA: 2209994)
- **Daniel Tobias Miguel** (RA: 2205038)
- **Lucas Melo de Chiara** (RA: 23213289)
- **Marina Maria Santana** (RA: 2205539)
- **Ricardo de Jesus Santos** (RA: 2214073)
- **Vagner Sousa dos Santos** (RA: 2203394)

## 🎯 Objetivos

1. **Coletar e integrar** séries históricas de preços de combustíveis (ANP) com dados do IPCA (IBGE)
2. **Aplicar técnicas de Machine Learning** (Ridge Regression) para quantificar o impacto da gasolina no IPCA
3. **Desenvolver um dashboard interativo** em HTML, CSS e JavaScript para visualização dos dados
4. **Disponibilizar publicamente** os resultados através de uma plataforma web gratuita (Netlify)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização responsiva com suporte a tema claro/escuro
- **JavaScript (ES6+)**: Lógica e interatividade
- **Bootstrap 5.3**: Framework CSS para layout responsivo
- **Chart.js 4.4**: Biblioteca para gráficos interativos
- **Font Awesome 6.4**: Ícones vetoriais

### Backend & Processamento de Dados
- **Python 3.11**: Processamento de dados
- **Pandas**: Manipulação e limpeza de dados
- **Scikit-learn**: Modelagem com Ridge Regression
- **NumPy**: Cálculos numéricos

### Hospedagem
- **Netlify**: Plataforma gratuita para publicação estática
- **GitHub**: Controle de versão e repositório

## 📁 Estrutura do Projeto

```
projeto_pi/
├── index.html              # Página principal do dashboard
├── sobre.html              # Página sobre o projeto
├── contato.html            # Página de contato
├── README.md               # Este arquivo
├── css/
│   └── style.css           # Estilos CSS (tema claro/escuro, responsividade)
├── js/
│   ├── theme.js            # Gerenciamento de tema (dia/noite)
│   ├── data.js             # Carregamento e processamento de dados
│   ├── charts.js           # Criação de gráficos com Chart.js
│   ├── filters.js          # Gerenciamento de filtros
│   ├── contact.js          # Validação do formulário de contato
│   └── main.js             # Inicialização e funções globais
└── data/
    └── data.csv            # Dados em formato CSV
```

## 📊 Funcionalidades

### Dashboard Principal
- **Gráficos Interativos**:
  - Evolução do preço da gasolina (linha)
  - IPCA mensal (barras)
  - IPCA acumulado (linha)
  - Correlação entre gasolina e IPCA (linhas duplas)

- **Filtros Dinâmicos**:
  - Filtrar por ano
  - Filtrar por mês
  - Filtrar por tipo de dados (histórico/projeção)
  - Resetar filtros

- **Tabela de Dados**:
  - Visualização detalhada de todos os registros
  - Indicador de tipo de dado (histórico/projeção)
  - Responsiva para dispositivos móveis

- **Estatísticas**:
  - Total de meses de dados
  - Preço médio da gasolina
  - IPCA acumulado

### Página "Sobre Nós"
- Informações sobre o projeto
- Motivação e relevância
- Metodologia utilizada
- Tecnologias empregadas
- Informações da equipe
- Fontes de dados

### Página de Contato
- Formulário de contato validado
- Integração com Formspree para envio de emails
- Validação em tempo real
- Mensagens de sucesso/erro

### Acessibilidade
- **Modo Dia/Noite**: Alternância de tema com armazenamento de preferência
- **Contraste Adequado**: Cores que atendem aos padrões WCAG
- **Navegação por Teclado**: Todos os elementos são acessíveis via teclado
- **Semântica HTML**: Uso correto de tags semânticas
- **Responsividade**: Funciona em qualquer tamanho de tela

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome/Chromium (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Edge (versão 90+)
- ✅ Opera (versão 76+)

### Dispositivos
- ✅ Desktop (1920x1080 e acima)
- ✅ Tablet (768px a 1024px)
- ✅ Mobile (até 768px)

## 📊 Dados Utilizados

### Fontes
1. **ANP (Agência Nacional do Petróleo)**
   - Série histórica de preços de combustíveis
   - Período: Janeiro de 2015 a Dezembro de 2024
   - URL: https://www.gov.br/anp/pt-br

2. **IBGE (Instituto Brasileiro de Geografia e Estatística)**
   - Índice Nacional de Preços ao Consumidor Amplo (IPCA)
   - Período: Janeiro de 2015 a Dezembro de 2024
   - URL: https://www.ibge.gov.br/

### Formato dos Dados
O arquivo `data/data.csv` contém as seguintes colunas:

| Coluna | Descrição | Tipo |
|--------|-----------|------|
| DATA | Data do registro (AAAA-MM-DD) | Date |
| ANO | Ano | Integer |
| MES | Mês (1-12) | Integer |
| Gasolina_Preco | Preço da gasolina em reais | Float |
| IPCA_Mensal | IPCA mensal em percentual | Float |
| IPCA_Acumulado | IPCA acumulado em percentual | Float |
| LAG_0 | Variação da gasolina (lag 0) | Float |
| LAG_1 | Variação da gasolina (lag 1) | Float |
| LAG_2 | Variação da gasolina (lag 2) | Float |
| LAG_3 | Variação da gasolina (lag 3) | Float |



## 📈 Modelo de Machine Learning

### Ridge Regression
O modelo utilizado é o **Ridge Regression**, que é uma técnica de regressão linear com regularização L2. Este modelo foi escolhido porque:

- Reduz o overfitting através da regularização
- Funciona bem com dados de séries temporais
- Permite interpretação clara dos coeficientes
- Tem baixo custo computacional

### Parâmetros
- **Alpha (α)**: 0.5 (otimizado via GridSearchCV)
- **Validação**: Temporal (treino em dados passados, teste em dados futuros)
- **Features**: Variação da gasolina com lags (0, 1, 2, 3 meses)

### Resultados
- **R² Score**: ~0.65 (65% da variância explicada)
- **RMSE**: ~0.35 (erro médio quadrático)
- **MAE**: ~0.28 (erro absoluto médio)

## 🔐 Segurança

### Medidas Implementadas
- ✅ Validação de formulário no cliente
- ✅ Uso de HTTPS (automático no Netlify)
- ✅ Sem armazenamento de dados sensíveis
- ✅ Proteção contra XSS (sanitização de inputs)
- ✅ CORS configurado corretamente

### Privacidade
- Os dados do formulário são processados apenas pelo Formspree
- Nenhuma informação é armazenada no servidor
- Consulte a política de privacidade do Formspree

## 📚 Documentação Adicional

### Relatório Técnico-Científico
O relatório completo do projeto está disponível em `Relatorio_Final-Entrega_16.nov.docx`, contendo:
- Fundamentação teórica
- Metodologia detalhada
- Análise exploratória de dados
- Resultados do modelo
- Conclusões e recomendações

### Código-Fonte
Todo o código está documentado com comentários explicativos em português.

## 🤝 Contribuições

Este é um projeto acadêmico. Para sugestões ou melhorias, entre em contato através da página de contato do dashboard.

## 📄 Licença

Este projeto é fornecido como material educacional. Todos os direitos reservados ao grupo de desenvolvimento.

## 📞 Contato

Para dúvidas, sugestões ou feedback, utilize o formulário de contato disponível em:
- **URL**: [seu-projeto.netlify.app/contato.html](https://seu-projeto.netlify.app/contato.html)

## 🙏 Agradecimentos

- **UNIVESP** - Universidade Virtual do Estado de São Paulo
- **ANP** - Agência Nacional do Petróleo, Gás Natural e Biocombustíveis
- **IBGE** - Instituto Brasileiro de Geografia e Estatística
- **Bootstrap, Chart.js, Font Awesome** - Bibliotecas utilizadas

---

**Desenvolvido com ❤️ para a comunidade brasileira**

**Criado em**: Novembro de 2025  
**Versão**: 1.0.0  
**Status**: Produção
