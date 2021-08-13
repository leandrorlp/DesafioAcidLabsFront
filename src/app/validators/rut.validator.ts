import { FormControl } from '@angular/forms';

export const rutValidator = (control: FormControl) => {
  if (!control.value) {
    return null;
  }
  let valor = control.value.split('.').join('');
  valor = valor.replace('-', '');

  const cuerpo = valor.slice(0, -1);

  let dv = valor.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = 1; i <= cuerpo.length; i++) {
    const index = multiplo * valor.charAt(cuerpo.length - i);
    suma = suma + index;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  const dvEsperado = 11 - (suma % 11);

  dv = dv === 'K' ? 10 : dv;
  dv = dv === '0' ? 11 : dv;

  if (dvEsperado.toString() !== dv.toString()) {
    return {
      errorRut: 'RUT inválido'
    };
  } else {
    return null;
  }
};
