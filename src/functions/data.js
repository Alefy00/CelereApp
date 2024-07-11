export const dateTimeFormat = value => {
  let data = value;
  let dia = (data.getDate() < 10 ? '0' : '') + data.getDate().toString();
  let mes = (data.getMonth() < 10 ? '0' : '') + data.getMonth().toString();
  let ano = data.getFullYear().toString();
  let horas = (data.getHours() < 10 ? '0' : '') + data.getHours().toString();
  let minutos =
    (data.getMinutes() < 10 ? '0' : '') + data.getMinutes().toString();
  let segundos =
    (data.getSeconds() < 10 ? '0' : '') + data.getSeconds().toString();
  let dt_format =
    dia +
    '/' +
    mes +
    '/' +
    ano +
    ' - ' +
    horas +
    ':' +
    minutos +
    ':' +
    segundos;
  return dt_format;
};
