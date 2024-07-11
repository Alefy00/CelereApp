// import modalidadesList from './business/modalidades';
import {connect} from 'react-redux';
const BASE_API = 'https://api.b7web.com.br/devbarber/api';
const BASE_API_APP = '';

export default {
  initialState: () => dispatch({type: 'INITIAL_STATE'}),
  setBreadCrumb: bread_crumb =>
    dispatch({type: 'SET_BREAD_CRUMB', payload: {bread_crumb}}),
  setRegraVlrMaxImovel: regra_vlr_max_imovel =>
    dispatch({
      type: 'SET_REGRA_VLR_MAX_IMOVEL',
      payload: {regra_vlr_max_imovel},
    }),
  setRegraVlrMinFinanc: regra_vlr_min_financ =>
    dispatch({
      type: 'SET_REGRA_VLR_MIN_FINANC',
      payload: {regra_vlr_min_financ},
    }),
  setRegraVlrMaxFinanc: regra_vlr_max_financ =>
    dispatch({
      type: 'SET_REGRA_VLR_MAX_FINANC',
      payload: {regra_vlr_max_financ},
    }),
  setRegraPrazoMin: regra_prazo_min =>
    dispatch({type: 'SET_REGRA_PRAZO_MIN', payload: {regra_prazo_min}}),
  setRegraPrazoMax: regra_prazo_max =>
    dispatch({type: 'SET_REGRA_PRAZO_MAX', payload: {regra_prazo_max}}),
  setInformacoesSimulacao: informacoes_Simulacao =>
    dispatch({
      type: 'SET_INFORMACOES_SIMULACAO',
      payload: {informacoes_Simulacao},
    }),
  setParcelasSimulacao: parcelas_simulacao =>
    dispatch({type: 'SET_PARCELAS_SIMULACAO', payload: {parcelas_simulacao}}),
  setNumeroOperacao: numero_operacao =>
    dispatch({type: 'SET_NUMERO_OPERACAO', payload: {numero_operacao}}),

  // checkToken: async (token) => {
  //   const req = await fetch(`${BASE_API}/auth/refresh`,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({token})
  //   });
  //   const json = await req.json();
  //   return json;
  // },

  // signIn: async (email, password) => {
  //   const req = await fetch(`${BASE_API}/auth/login`,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({email, password})
  //   });
  //   const json = await req.json();
  //   return json;
  // },

  // signUp: async (name, email, password) => {
  //   const req = await fetch(`${BASE_API}/user`,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name, email, password})
  //   });
  //   const json = await req.json();
  //   return json;
  // },

  // modalidades: async () => {
  //   // const token = await AsyncStorage.getItem('token');
  //   return modalidadesList;
  // },

  // opcoesMinMaxGrupoOperacao: async () => {
  //   const req = await fetch(`${BASE_API_PROGNUM}/user`,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name, email, password})
  //   });
  //   const json = await req.json();
  //   return json;
  // },

  opcoesMinMaxGrupoOperacao: async props => {
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      // **** Configuracao Dinamica *****************************************************
      const URL1_BASE = props.base_servico;
      const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
      const URL6_AMBIENTE_OP =
        'ambienteOperacional=' + props.ambiente_operacional;
      // ********************************************************************************

      const URL2_COMPLEMENTO1 = '/rest/w/wtela/';
      const URL3_FUNCAO = 'opcoesMinMaxGrupoOperacao';
      const URL4_USER_NAME = 'userName=loginintegracao';

      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&CO_GRUPO_TIPO_OPERACAO=' +
        props.co_grupo_tipo_operacao +
        '&CO_ENQUADRAMENTO=' +
        props.co_enquadramento +
        '&CO_PLANO=' +
        props.co_plano;
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url =
        'https://desenv.prognum.com.br/aejs/rest/w/wtela/opcoesMinMaxGrupoOperacao?userName=loginintegracao&sessionkey=123456&ambienteOperacional=%2Fu11%2Fbrb%2Fsuporte%2Fscat76697%2Fambiente_integracao&CO_GRUPO_TIPO_OPERACAO=206&CO_ENQUADRAMENTO=12&CO_PLANO=112';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = 'https://run.mocky.io/v3/76488eef-6b14-48d2-a608-c3a0cd1742bd';
    }

    const req = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const json = await req.json();
    if (json.success) {
      props.setRegraVlrMaxImovel(json.dados.VALORMAXIMOVEL);
      props.setRegraVlrMinFinanc(json.dados.VALORMIN);
      props.setRegraVlrMaxFinanc(json.dados.VALORMAX);
      props.setRegraPrazoMin(json.dados.PRAZOMIN);
      props.setRegraPrazoMax(json.dados.PRAZOMAX);
      return JSON.stringify({success: true, message: ''});
    } else {
      return JSON.stringify({success: false, message: json.message});
    }
  },

  evolucaoSimulacaoSeguradoras: async props => {
    // **** Configuracao Dinamica *****************************************************
    const URL1_BASE = props.base_servico;
    const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
    const URL6_AMBIENTE_OP =
      'ambienteOperacional=' + props.ambiente_operacional;
    // ********************************************************************************

    const URL2_COMPLEMENTO1 = '/rest/w/wtela/';
    const URL3_FUNCAO = 'evolucaoSimulacaoSeguradoras';
    const URL4_USER_NAME = 'userName=loginintegracao';

    // Composicao url servixo
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&CO_GRUPO_TIPO_OPERACAO=' +
        props.co_grupo_tipo_operacao +
        '&CO_ENQUADRAMENTO=' +
        props.co_enquadramento +
        '&CO_PLANO=' +
        props.co_plano;
      if (props.tipo_pessoa === 'pf') {
        url += '&DT_NASCIMENTO=' + props.dt_nasc;
      }
      url +=
        '&VA_IMOVEL=' +
        props.vlr_imovel_backend +
        '&VA_FINANCIAMENTO=' +
        props.vlr_financ_backend;
      if (props.tipo_pessoa === 'pf') {
        url += '&VA_RENDA_FAMILIAR=' + props.vlr_renda_backend;
      } else {
        url += '&VA_FATURAMENTO_MENSAL=' + props.vlr_renda_backend;
      }
      url += '&NU_MESES_PRAZO=' + props.prazo;
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url =
        'https://desenv.prognum.com.br/aejs/rest/w/wtela/evolucaoSimulacaoSeguradoras?userName=loginintegracao&sessionkey=123456&ambienteOperacional=%2Fu11%2Fbrb%2Fsuporte%2Fscat76697%2Fambiente_integracao&CO_GRUPO_TIPO_OPERACAO=206&CO_ENQUADRAMENTO=12&CO_PLANO=112&DT_NASCIMENTO=18/03/1966&VA_IMOVEL=150000&VA_FINANCIAMENTO=80000&VA_RENDA_FAMILIAR=7000&NU_MESES_PRAZO=50';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = 'https://run.mocky.io/v3/fee1bb27-71d4-4f34-b43d-a613662d4681';
    }

    const req = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await req.json();
    return json;
  },

  EmitePlanilhaSimulacao: async props => {
    // **** Configuracao Dinamica *****************************************************
    const URL1_BASE = props.base_servico;
    const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
    const URL6_AMBIENTE_OP =
      'ambienteOperacional=' + props.ambiente_operacional;
    // ********************************************************************************

    // Composicao url servixo
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      let URL2_COMPLEMENTO1 = '/rest/w/wtela/';
      let URL3_FUNCAO = 'EmitePlanilhaSimulacao';
      let URL4_USER_NAME = 'userName=loginintegracao';
      let URL7_CONTEXTO = 'contexto=CORP_WEB';

      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&' +
        URL7_CONTEXTO +
        '&VA_IMOVEL=' +
        props.vlr_imovel_backend +
        '&VA_FINANCIAMENTO=' +
        props.vlr_financ_backend +
        '&CO_GRUPO_TIPO_OPERACAO=' +
        props.co_grupo_tipo_operacao +
        '&CO_SEGURADORA=' +
        props.co_seguradora +
        '&CO_ENQUADRAMENTO=' +
        props.co_enquadramento;
      if (props.tipo_pessoa === 'pf') {
        url += '&DT_NASCIMENTO=' + props.dt_nasc_backend;
      }
      if (props.tipo_pessoa === 'pf') {
        url += '&VA_RENDA_FAMILIAR=' + props.vlr_renda_backend;
      } else {
        url += '&VA_FATURAMENTO_MENSAL=' + props.vlr_renda_backend;
      }
      url +=
        '&IN_MODALIDADE_FINANC_PJ=' +
        props.in_modalidade_financ_pj +
        '&CO_PLANO=' +
        props.co_plano +
        '&CO_APOLICE=' +
        props.co_apolice +
        '&NU_MESES_PRAZO=' +
        props.prazo;
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url =
        'https://desenv.prognum.com.br/aejs/rest/w/woriginacao/evolucaoSimulacao?userName=loginintegracao&sessionkey=123456&ambienteOperacional=/u11/brb/suporte/scat76697/ambiente_integracao&contexto=CORP_WEB&VA_IMOVEL=1000000&VA_FINANCIAMENTO=500000&CO_GRUPO_TIPO_OPERACAO=206&CO_SEGURADORA=6&CO_ENQUADRAMENTO=12&DT_NASCIMENTO=01%2FJan%2F1980&VA_RENDA_FAMILIAR=15000&IN_MODALIDADE_FINANC_PJ=F&CO_PLANO=112&CO_APOLICE=6400&NU_MESES_PRAZO=320';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = 'https://run.mocky.io/v3/e0de0226-0f31-4df3-9214-372495789a62';
    }

    const req = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await req.json();
    return json;
  },

  GeraJasper: async props => {
    // **** Configuracao Dinamica *****************************************************
    const URL1_BASE = props.base_servico;
    const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
    const URL6_AMBIENTE_OP =
      'ambienteOperacional=' + props.ambiente_operacional;
    // ********************************************************************************

    // Composicao url servixo
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      const URL2_COMPLEMENTO1 = '/rest/w/wtela/';
      const URL3_FUNCAO = 'GeraJasper';
      const URL2_COMPLEMENTO2 = 'relatorio=simulacao_internet.jasper';
      const URL4_USER_NAME = 'userName=loginintegracao';
      const URL7_CONTEXTO = 'contexto=CORP_WEB';
      const URL8_CONTEXTO = 'carregadados=GetEmitePlanilhaSimulacao';

      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL2_COMPLEMENTO2 +
        '&' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&' +
        URL7_CONTEXTO +
        '&' +
        URL8_CONTEXTO +
        '&VA_IMOVEL=' +
        props.vlr_imovel_backend +
        '&VA_FINANCIAMENTO=' +
        props.vlr_financ_backend +
        '&CO_SEGURADORA=' +
        props.co_seguradora +
        '&CO_ENQUADRAMENTO=' +
        props.co_enquadramento;
      if (props.tipo_pessoa === 'pf') {
        url += '&DT_NASCIMENTO=' + props.dt_nasc_backend;
      }

      url +=
        '&VA_RENDA_FAMILIAR=' +
        props.vlr_renda_backend +
        '&IN_MODALIDADE_FINANC_PJ=' +
        props.in_modalidade_financ_pj +
        '&CO_PLANO=' +
        props.co_plano +
        '&CO_APOLICE=' +
        props.co_apolice +
        '&NU_MESES_PRAZO=' +
        props.prazo +
        '&IN_FINANCIAMENTO_CONSTRUCAO=F';

      if (props.tipo_pessoa === 'pj') {
        url += '&VA_FATURAMENTO_MENSAL=' + props.vlr_renda_backend;
      } else {
        url +=
          '&VA_FATURAMENTO_MENSAL=0&P1_VA_RENDA=' + props.vlr_renda_backend;
      }

      url +=
        '&CO_GRUPO_TIPO_OPERACAO=' +
        props.co_grupo_tipo_operacao +
        '&CO_APOLICE_DFI=' +
        props.co_apolice;
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url = '';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = '';
    }

    let srcPathPdf = '';
    try {
      await fetch(url)
        .then(await (r => r.json()))
        .then(json => {
          if (json.success) {
            srcPathPdf = json.tela.frame.iframe.src;
            srcPathPdf = srcPathPdf.split('=')[1];
          } else {
            alert('Erro: Falha ao recuperar os dados da planilha de evolucao.');
          }
        });
    } catch (e) {
      alert('Erro: Falha ao recuperar os dados da planilha de evolucao. ' + e);
    }
    return srcPathPdf;
  },

  documento: async () => {
    const req = await fetch(`${BASE_API_PROGNUM}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await req.json();
    return json;
  },

  TempFilePdf: async props => {
    // **** Configuracao Dinamica *****************************************************
    const URL1_BASE = props.base_servico;
    const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
    const URL6_AMBIENTE_OP =
      'ambienteOperacional=' + props.ambiente_operacional;
    // ********************************************************************************

    // Composicao url servixo
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      let URL2_COMPLEMENTO1 = '/rest/sccidoc/wdoc/';
      let URL3_FUNCAO = 'TempFilePdf';
      let URL4_USER_NAME = 'userName=loginintegracao';
      let URL7_CONTEXTO = 'contexto=CORP_WEB';

      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&' +
        URL7_CONTEXTO +
        '&nome=' +
        props.path_pdf +
        '&REMOVETEMP=NAO';
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url = '';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = 'https://run.mocky.io/v3/fee1bb27-71d4-4f34-b43d-a613662d4681';
    }
    return url;
  },

  OperacaoSalvaSimulacaoInternet: async (props, navigation) => {
    let retorno = JSON.stringify('{success:false}');

    // **** Configuracao Dinamica *****************************************************
    const URL1_BASE = props.base_servico;
    const URL5_SESSION_KEY = 'sessionkey=' + props.chave_sessao;
    const URL6_AMBIENTE_OP =
      'ambienteOperacional=' + props.ambiente_operacional;
    // ********************************************************************************

    // Composicao url servixo
    let url = '';
    if (props.ambiente_atual === 'HML_PROGNUM') {
      // http://desenv.prognum.com.br/aejs/rest/w/woriginacao/OperacaoSalvaSimulacaoInternet?BuscaDadosSCCI=T&userName=loginintegracao&sessionKey=123456&ambienteOperacional=%2Fu11%2Fbrb%2Fsuporte%2Fscat76697%2Fambiente_integracao&contexto=CORP_WEB

      let URL2_COMPLEMENTO1 = '/rest/w/woriginacao/';
      let URL3_FUNCAO = 'OperacaoSalvaSimulacaoInternet';
      let URL4_USER_NAME = 'userName=loginintegracao';
      let URL2_COMPLEMENTO2 = 'BuscaDadosSCCI=T';
      let URL7_CONTEXTO = 'contexto=CORP_WEB';

      url =
        URL1_BASE +
        URL2_COMPLEMENTO1 +
        URL3_FUNCAO +
        '?' +
        URL2_COMPLEMENTO2 +
        '&' +
        URL4_USER_NAME +
        '&' +
        URL5_SESSION_KEY +
        '&' +
        URL6_AMBIENTE_OP +
        '&' +
        URL7_CONTEXTO;
    } else if (props.ambiente_atual === 'DEV_PROGNUM') {
      // Estatico:
      url = '';
    } else {
      // Mock.io - para uso entre 23h até 04h -> https://designer.mocky.io/
      url = '';
    }

    // console.log(">> (API) informacoes_simulacao: ", props.informacoes_simulacao);

    let body = {
      dados: {
        GRIDDESPESAS: props.informacoes_simulacao.GRIDDESPESAS,
        evolucaoSimulacao: props.informacoes_simulacao.evolucaoSimulacao,
        CO_GRUPO_TIPO_OPERACAO:
          props.informacoes_simulacao.CO_GRUPO_TIPO_OPERACAO,
        NO_DOC_NECESSARIA: props.informacoes_simulacao.NO_DOC_NECESSARIA,
        CO_TIPO_OPERACAO: props.informacoes_simulacao.CO_TIPO_OPERACAO,
        DT_NASCIMENTO: props.informacoes_simulacao.DT_NASCIMENTO,
        CO_ENQUADRAMENTO: props.informacoes_simulacao.CO_ENQUADRAMENTO,
        CO_PLANO: props.informacoes_simulacao.CO_PLANO,
        CO_SISTEMA_AMORTIZACAO:
          props.informacoes_simulacao.CO_SISTEMA_AMORTIZACAO,
        VA_IMOVEL: props.informacoes_simulacao.VA_IMOVEL,
        VA_RENDA_FAMILIAR: props.informacoes_simulacao.VA_RENDA_FAMILIAR,
        VA_FINANCIAMENTO: props.informacoes_simulacao.VA_FINANCIAMENTO,
        NU_MESES_PRAZO: props.informacoes_simulacao.NU_MESES_PRAZO,
        TX_JUROS_ANUAL_NOMINAL:
          props.informacoes_simulacao.TX_JUROS_ANUAL_NOMINAL,
        PE_TX_ANUAL_JUROS: props.informacoes_simulacao.PE_TX_ANUAL_JUROS,
        PE_TX_EFET_JUROS: props.informacoes_simulacao.PE_TX_EFET_JUROS,
        VA_DESPESAS: props.informacoes_simulacao.VA_DESPESAS,
        VA_DESPESAS_NAO_INCORPORADAS:
          props.informacoes_simulacao.VA_DESPESAS_NAO_INCORPORADAS,
        VA_DESPESAS_CET: props.informacoes_simulacao.VA_DESPESAS_CET,
        VA_DESPESAS_FORA_CET: props.informacoes_simulacao.VA_DESPESAS_FORA_CET,
        CALC_TOT_DESPESAS: props.informacoes_simulacao.CALC_TOT_DESPESAS,
        P1_VA_RENDA: props.informacoes_simulacao.P1_VA_RENDA,
        P2_DT_NASCIMENTO: '',
        DISPLAY_CO_PLANO: props.informacoes_simulacao.DISPLAY_CO_PLANO,
        DISPLAY_CO_SEGURADORA:
          props.informacoes_simulacao.DISPLAY_CO_SEGURADORA,
        CO_APOLICE1: props.informacoes_simulacao.CO_APOLICE,
        DISPLAY_CO_ENQUADRAMENTO:
          props.informacoes_simulacao.DISPLAY_CO_ENQUADRAMENTO,
        VA_OPERACAO: props.informacoes_simulacao.VA_OPERACAO,
        VA_FATURAMENTO_MENSAL:
          props.informacoes_simulacao.VA_FATURAMENTO_MENSAL,
        CO_LCOBR: '',
        IN_IOF_AVISTA: '',
        IN_FUNDING_FGTS: '',
        IN_PRO_COTISTA: '',
        IN_FINANCIAMENTO_CONSTRUCAO: '',
        CO_SEGURADORA: props.informacoes_simulacao.CO_SEGURADORA,
        CO_SEGURADORA_DFI: props.informacoes_simulacao.CO_SEGURADORA,
        NU_CPFCNPJ: props.cpf
          .replace('.', '')
          .replace('.', '')
          .replace('-', '')
          .replace('/', ''),
        NO_PESSOA: props.nome,
        NO_EMAIL: props.email,
        NU_DDD_RES: props.ddd,
        NU_TELEFONE_RES: props.telefone.replace('-', ''),
        COD_ENT_SUPERVISOR: '999',
        COD_ENT_CORRETAGEM: '999',
        CO_TAREFA_PADRAO: 'A00',
      },
    };

    // console.log(">>> URL GRAVACAO: ", url);
    // console.log(">>> METHOD: POST");
    // console.log(">>> BODY: ", body);
    try {
      await fetch(url, {method: 'POST', body: JSON.stringify(body)})
        .then(await (r => r.json()))
        .then(json => {
          if (json.success) {
            dadosjson = json;
            let nu_operacao = json.dados.NU_PRETENDENTE;
            let bread_crumb = props.bread_crumb;
            // props.setBreadCrumb(bread_crumb);
            props.setNumeroOperacao(nu_operacao);
            navigation.reset({
              //index: 0,
              routes: [{name: 'NumeroOperacao'}],
            });

            retorno = JSON.stringify('{success:true}');
          } else {
            alert(json.message);
          }
        });
    } catch (e) {
      alert('Erro: ' + e);
    }
    console.log('>>> retorno: ', retorno);
    return retorno;
  },
};
