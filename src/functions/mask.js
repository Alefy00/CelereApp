// https://github.com/DieguinhoHR/react-js-masks/blob/master/src/utils/masks.js
export const cpfMask = value => {
  let cpfFmt = value
    .replace(/\D/g, '') // substitui qualquer caractere que não seja número por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de número, o primeiro de 3 e o segundo de 1, e adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, '$1.$2') // repete o processo para formar a segunda parte do CPF com ponto
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // captura 3 números seguidos de 1 ou 2 números e adiciona um traço
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 números seguidos de um traço e não deixa ser digitado mais nada
  return cpfFmt;
};

export const cnpjMask = value => {
  let cnpjFmt = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return cnpjFmt;
};

export const phoneMask = value => {
  let phoneFmt = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
  return phoneFmt;
};

export const cepMask = value => {
  let cepFmt = value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
  return cepFmt;
};

export const pisMask = value => {
  let pisFmt = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{5})(\d)/, '$1.$2')
    .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
    .replace(/(-\d{1})\d+?$/, '$1');
  return pisFmt;
};

export const emailMask = value => {
  let emailFmt = value.replace(
    /[A-Za-z0-9\\._-]+@[A-Za-z]+\\.[A-Za-z]+/g,
    '$1',
  );
  return emailFmt;
};

export const alphaMask = value => {
  let alphaFmt = value
    .replace(/[^a-zA-Z\sáâàãéêèẽíîìĩóôõòúûùũçÁÂÀÃÉÊÈEÍÎÌIÓÔÕÒÚÛÙÚÇ]/g, '')
    .toUpperCase();
  return alphaFmt;
};

export const dateMask = value => {
  let dateFmt = value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1/$2');
  return dateFmt;
};

export const moedaMask = value => {
  let moedaFmt = value.replace(/\D/g, '');
  let size = moedaFmt.length;
  if (size > 2) moedaFmt = moedaFmt.replace(/([0-9]{2})$/g, ',$1');
  if (size > 5)
    moedaFmt = moedaFmt.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  if (size > 8)
    moedaFmt = moedaFmt.replace(
      /([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2,$3',
    );
  if (size > 11)
    moedaFmt = moedaFmt.replace(
      /([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2.$3,$4',
    );
  return moedaFmt;
};

// trocar valor formatado por padrão americano
// "R$ 1.000,50".replace(/[^\d\,]/g, "").replace(",", ".")
