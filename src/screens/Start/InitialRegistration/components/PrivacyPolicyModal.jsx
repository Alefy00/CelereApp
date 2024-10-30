/* eslint-disable prettier/prettier */
// PrivacyPolicyModal.js
import React from 'react';
import { Modal, View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const PrivacyPolicyModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Política de Privacidade</Text>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
            1. OBJETIVO
Apresentamos a seguir a Política de Privacidade do GRUPO CÉLERE, criada para mostrar o nosso compromisso com seus dados pessoais. Fundamentada pelos Pilares de Segurança, Privacidade e Transparência, nosso objetivo é explicar de forma clara, simples e objetiva, as nossas práticas, bem como, o método pelo qual trataremos os seus dados pessoais.

Queremos que tenha conhecimento sobre como fazemos a coleta, armazenamento, compartilhamento e retenção de seus dados e por isto, é importante e indispensável a leitura.

2. DEFINIÇÕES
Titular do dado: pessoa natural a quem se referem os dados pessoais que são objeto de tratamento, ou seja, o dono do dato pessoal.

Tratamento dos dados pessoais: é toda operação realizada com dados pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.

Dado pessoal: é a informação relacionada à pessoa natural identificada ou identificável. Esses dados podem ser classificados como:

Dados Diretos: São os dados que podem ser atribuídos a uma pessoa específica sem o uso de informações adicionais (RG, CPF etc.);
Dados Indiretos: São os dados que não podem ser atribuídos a uma pessoa específica sem o uso de informações adicionais (IP, placa do carro etc.);
Dados Sensíveis: dados pessoais que são, por sua natureza, particularmente sensíveis em relação aos direitos e liberdades fundamentais e que, por isso, merecem proteção específica, pois o contexto de seu tratamento pode criar riscos significativos aos direitos e liberdades fundamentais. Esses dados pessoais incluem dados pessoais que revelem a origem racial ou étnica, as opiniões políticas, as convicções religiosas ou filosóficas, ou a filiação sindical, bem como o tratamento de dados genéticos, dados biométricos para identificar uma pessoa de forma inequívoca, dados relativos à saúde ou dados relativos à vida sexual ou orientação sexual de uma pessoa.
Consentimento: é a manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada.

Controlador: pessoa física ou jurídica de direito privado, a autoridade pública, a agência ou outro organismo que, individualmente ou em conjunto com outras, determina as finalidades e os meios de tratamentos de dados pessoais.

Operador: a pessoa física ou jurídica de direito privado, a autoridade pública, agência ou outro organismo que trate os dados pessoais por conta do Controlador.

Encarregado (DPO): Fornece as orientações sobre implementação de medidas adequadas e sobre a demonstração de conformidade pelo Controlador ou responsável pelo tratamento e atua como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD);

3. DIRETRIZES
As práticas descritas nesta Política de Privacidade se aplicam ao tratamento de dados pessoais no Brasil e estão sujeitas às leis locais aplicáveis, com destaque para a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais ou “LGPD”) a partir de sua entrada em vigor.

3.1 Coleta e Uso de Dados
O GRUPO CÉLERE conserva todos os dados pessoais que coleta enquanto for necessário para prestar os serviços que disponibiliza aos seus clientes e para fins comerciais legítimos e essenciais.

O GRUPO CÉLERE pode coletar os dados de forma direta ou por outros canais como portais de relacionamento com os clientes, canais de pedidos, vendas ou processos de contratação, ou ainda, obter os dados pessoais por meio de redes sociais, ou por parceiros de negócio, bem como por meio de cookies.

O GRUPO CÉLERE ainda pode obter informações pessoais sobre indivíduos de outras fontes disponíveis públicas e ou comercialmente que considere fidedignas.

3.2 Tipos de Dados Coletados
Informações pessoais de contato: Inclui qualquer informação que permite o GRUPO CÉLERE contatar ou verificar cadastro, como seu nome completo, CPF, data de nascimento, sexo, endereço postal, e-mail e número de telefone.

Informações de login de conta: Qualquer informação que seja necessária para lhe dar acesso ao perfil de conta específico, como nome de usuário e login.

Informações de utilização de sites/comunicação: Conforme você navega e interage com sites e portais do GRUPO CÉLERE, são utilizadas tecnologias de coleta automática de dados para coletar dados de relacionamento comerciais informações sobre as suas ações. Isso inclui informações, como, em quais links acessados, quais páginas ou conteúdos visualizados e por quanto tempo e outras informações e estatísticas semelhantes sobre essas interações, como tempo de resposta a conteúdo, erros de download e duração das visitas a determinadas páginas. Essas informações são capturadas por meio de tecnologias automatizadas, como cookies.

Informações de Dispositivo: Podemos coletar informações sobre o dispositivo que você está utilizando, incluindo o tipo de dispositivo, sistema operacional, identificadores exclusivos do dispositivo e informações de rede.

Pesquisas de mercado: Informações compartilhadas voluntariamente com GRUPO CÉLERE sobre a experiência de uso de nossos produtos e serviços, bem como reclamações, pesquisas de satisfação e solicitações de melhoria.

Imagens e gravações em eventos: informações incluem fotos, vídeos, áudios de reuniões, webinars e eventos do próprio GRUPO CÉLERE, bem como eventos patrocinados em conjunto com os parceiros de negócio.

Imagens e gravações como produtos e serviços prestados: informações incluem biometria, imagens de vídeo colhidos dentro de ferramentas de monitoramento são utilizadas somente para o cumprimento de obrigações contratuais entre o GRUPO CÉLERE e os clientes que adquirem tais serviços.

Informações de visitantes: Registramos indivíduos que visitam nossos sites e locais (nome, identificação e informações de contato comercial) e usamos a supervisão da câmera por razões de segurança e proteçãode pessoas e pertences, assim como para fins regulatórios.

Chamadas ao Serviço de Atendimento ao Cliente: Comunicações com as áreas de Suporte ao Cliente podem ser gravadas ou ouvidas, de acordo com as leis aplicáveis, para necessidades operacionais locais (por exemplo, por motivos de qualidade ou treinamento). Quando exigido por lei, você será informado sobre tal gravação no início de sua chamada.

Dados Pessoais Sensíveis: O GRUPO CÉLERE busca sempre tratar o mínimo possível de Dados Pessoais Sensíveis. Quando for necessário tratar Dados Pessoais Sensíveis, a finalidade pretendida será informada para que o consentimento seja obtido, quando isso for uma exigência legal.

Dados Pessoais de Menores de Idade: Dados de menores de idade são coletados apenas em situações de necessidade e com o consentimento expresso dos pais ou responsáveis. Essa coleta aplica-se única e exclusivamente aos colaboradores do GRUPO CÉLERE. O acesso às informações coletadas está restrito apenas a funcionários autorizados para o uso adequado dessas informações. Os funcionários que se utilizarem indevidamente dessas informações, ferindo essa Política de Privacidade, estarão sujeitos às penalidades do processo disciplinar do GRUPO CÉLERE.

3.3 Finalidades para a Coleta dos Dados
Atender legítimo interesse do GRUPO CÉLERE, exemplificando, inerente aos contratos de trabalho;
Responder a licitações e Convites para apresentação de propostas (RFP´s) que solicitem tanto dados pessoais dos colaboradores, como também dados sobre as certificações desses colaboradores, de forma a comprovar conhecimento técnico;
Elaborar contratos, termos e acordos;
Operacionalizar contratos, autorizações, termos e acordos;
Fornecer serviços, produtos ou informações previstas nos contratos firmados;
Cumprir obrigações legais;
Cumprir obrigações acessórias vinculadas aos contratos firmados com os Titulares dos Dados;
Realizar relacionamento com o Titular;
Enviar mensagens por correio eletrônico (e-mail), aplicativo próprio ou de mensagens;
Prover atendimento às demandas dos Titulares (chamado-fácil);
Melhorar os serviços oferecidos aos Titulares de Dados;
Configurar e administrar contas de usuários em ativos, sistemas, portais e aplicativos;
Aplicar termos de uso de sistemas, aplicativos e portais;
Para fornecer assistência, suporte e treinamento aos usuários de sistemas, portais e aplicativos;
Prevenção e resolução de problemas técnicos ou de segurança;
Oferecer e sugerir acesso à conteúdos, notícias, treinamentos e workshops promovidos pelo GRUPO
SOLUTI;
Manter conformidade (Compliance), controles internos, auditorias internas e externas;
Garantir a segurança dos acessos aos prédios e locais físicos do GRUPO CÉLERE e dos pertences do GRUPO CÉLERE, quando coletamos dados de visitantes;
Aprimorar e personalizar a experiência do usuário na utilização dos serviços;
Analisar a utilização dos serviços pelos usuários dos sistemas;
Analisar os dados em qualquer âmbito para avaliar as condições financeiras e econômicas;
Realizar avaliações gerenciais (dashboard), estatísticas e analíticas (nestes casos os dados serão anonimizados);
Realizar pesquisas de satisfação e de mercado;
Aprimorar os produtos e serviços oferecidos;
Alcançar o Titular com ações de marketing, nos parâmetros permitidos pela legislação;
Proteger Direitos e propriedades do GRUPO CÉLERE e exercer o Direito de Defesa em quaisquer instâncias legislativas, normativas ou regulatórias;
Prevenir, detectar e contribuir com a investigação de fraudes, violações da lei e outras oriundas de notificações de autoridades do judiciário, policiais, órgãos reguladores, instituições governamentais;
Fornecer, sempre que requerido pelo titular, informações sobre a coleta, tratamento, arquivamento, processamento e eliminação dos seus dados;
Fornecer, manter, proteger e melhorar e desenvolver novos serviços;
Utilizar informações para enviar comunicações, como atualizações, alertas e boletins informativos, relacionadas aos nossos serviços.
3.4 Compartilhamento de Dados
Seus dados coletados podem ser compartilhados com nossos parceiros, terceiros parceiros, fornecedores, auditores, autoridades e órgãos reguladores para diferentes finalidades quando necessário. Esses compartilhamentos estão cobertos pelos acordos comerciais e cláusulas contratuais de segurança da informação e de proteção de dados. Sempre que efetuado, o compartilhamento de dados pessoais será realizado dentro dos limites e propósitos dos nossos negócios e de acordo com o que autoriza a legislação aplicável.

Seus dados ainda podem ser compartilhados entre os setores do GRUPO CÉLERE, sempre que necessário para atender o fluxo dos processos internos, de acordo com as bases legais definidas e finalidades prescritas. O compartilhamento ocorrerá mediante as telas do sistema, e-mail, sistemas de mensagens ou através de documentos físicos.

Seus dados podem ser compartilhados de forma agregada e anônima para fins de montagem de indicadores, estatística e de análise.

3.5 Tempo de Retenção dos Dados
Seus dados coletados serão retidos pelo tempo de duração da relação contratual e após o fim de tal relação (nos limites permitidos pelas leis aplicáveis) pelo tempo necessário para o cumprimento das finalidades definidas nesta Política de Privacidade, para proteger o GRUPO CÉLERE de ações judiciais e para administrar nossos negócios. Ainda assim, o GRUPO CÉLERE pode conservar, sem prejuízo, seus dados para o cumprimento de obrigações legais e regulatórias ou transferir para terceiros, desde que, atendendo às exigências judiciais.

3.6 Armazenamento de Dados
Os dados pessoais coletados e tratados são armazenados em servidores e/ou em nuvem On-Primesses e Colocation ou em de fornecedores contratados para prestar esse tipo de serviços para o GRUPO CÉLERE Para o serviço de Certificado Digital, informamos que a chave privada do titular poderá ser armazenada perante o PSC (Prestador de Serviço de Confiança), em ambiente de nuvem, ou ainda em HSM (Hard Security Module), mas também pode ser armazenado em hardware individualizado do titular (token e/ou smart card).

3.7 Transferência Internacional de Dados Pessoais
Alguns de seus dados pessoais, ou todos eles, poderão ser transferidos para o exterior, por exemplo quando são armazenados em servidores de computação em nuvem localizados fora do Brasil. Para isso, o GRUPO CÉLERE observa todos os requerimentos estabelecidos pela legislação vigente e adota as melhores práticas de segurança e privacidade para garantir a integridade e confidencialidade dos seus dados pessoais como exemplo de adoção de cláusulas contratuais que impõem aos operadores com quem o GRUPO CÉLERE compartilha os Dados Pessoais, as mesmas medidas de proteção adotadas pelo GRUPO CÉLERE

3.8 Direitos dos Titulares dos Dados
Ao usar os serviços do site, portais de atendimento, assinar contratos, ter acesso aos produtos e serviços do GRUPO CÉLERE, você está dando consentimento ao Aviso de Privacidade, podendo, quando cabível, exercer seus direitos previstos em lei:

Confirmar a existência de tratamento;
Solicitar detalhes sobre como suas informações estão sendo utilizadas;
Solicitar correção e atualização de dados;
Obter acesso a seus dados pessoais;
Solicitar portabilidade de dados;
Solicitar bloqueio e eliminação de dados pessoais excessivos ou tratados em desconformidade com as finalidades do seu consentimento;
Solicitar exclusão (exceto aqueles que a lei autorize a conservação);
Solicitar informações;
Solicitar restrição de uso de determinados dados;
Retirar consentimento;
Recusar o recebimento de propagandas ou conteúdos;
3.9 Proteção dos Dados
O GRUPO CÉLERE, considerando sua natureza de operações em Tecnologia de Informação e ciente da importância de aprimorar os controles de gestão e governança, para garantir e zelar pela integridade, proteção e sigilo das informações possui uma política de Segurança da informação que define as diretrizes para proteger suas informações com base nos requisitos legais, contratuais e de negócios, utilizando os resultados da gestão de risco, provendo os mecanismos para prevenir e responder a uma variedade de ameaças, incluindo, acessos não autorizados, uso indevido, duplicação, perda, modificação e revelação das informações de propriedade e associadas ao(s) negócio(s) do GRUPO CÉLERE.

Além dessas medidas, ainda de forma a cumprir com o nosso compromisso de proteger seus dados, todos os nossos colaboradores são treinados para adotar métodos, procedimentos e medidas de proteção aos dados que coletamos. Fazemos esforços razoáveis para resguardar os dados dos Titulares, mas, devido à natureza da internet e a existência de pessoas com más intenções, não podemos garantir que estes não terão sucesso em acessar indevidamente as informações dos Titulares. Caso isso ocorra, serão adotados os procedimentos previstos na Lei Geral de Proteção de Dados, que inclui notificar à Autoridade Nacional de Proteção de Dados e ao Titular caso o incidente de segurança possa acarretar risco ou danos. O GRUPO CÉLERE ainda possui exposto em seu Código de Conduta que, em caso de descumprimento desta Política de Privacidade, um processo investigatório será instaurado e, após constatação e apuração, as penalidades cabíveis serão aplicadas, conforme a gravidade do ato.

3.10 Cookies e Tecnologia de Rastreamento
Sites e aplicativos usados pelo GRUPO CÉLERE ou por fornecedores terceirizados poderão fazer uso de cookies para coletar informações sobre as atividades do usuário em aplicativos, sites ou outros serviços, de acordo com a função e finalidade. Para o melhor entendimento de como o GRUPO CÉLERE utiliza os cookies é importante consultar a Política de Cookies.

3.11 Canal de Atendimento
Em caso de dúvidas, reclamações ou queira se comunicar com a SOLUTI a respeito da forma que tratamos seus dados, você pode entrar em contato conosco através do e-mail: lgpd@soluti.com.br

3.12 Atualização desta Política de Privacidade
Ocasionalmente, o GRUPO CÉLERE poderá alterar de forma unilateral o teor da presente Política de Privacidade, conforme a finalidade ou necessidade, tal qual para adequação e conformidade legal de disposição de lei ou norma que tenha força jurídica equivalente, cabendo ao titular verificá-la sempre que efetuar o acesso ao Site.

Por conseguinte, é fundamental que todo indivíduo se certifique de que lê toda e qualquer comunicação encaminhada pelo GRUPO CÉLERE atentamente, o que acontece através de e-mail cadastrado, sendo certo, que o e-mail informado pelo titular é por este dito que é de sua titularidade e uso, sendo o meio hábil para a comunicação com o titular.

4. HISTÓRICO DE REVISÕES
Data: 29/10/2024
Descrição da Revisão: Construção da Política de Privacidade de Dados GRUPO CÉLERE
            </Text>
          </ScrollView>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
      },
      loadingContainer:{
        flex: 1,
        backgroundColor:COLORS.primary,
        justifyContent:'center',
      },
      //privacida
      privacyContainer:{
        marginTop: -20,
        flexDirection: 'row',
        alignItems:'center'
      }
});

export default PrivacyPolicyModal;
