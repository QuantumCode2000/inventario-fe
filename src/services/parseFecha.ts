function parseFecha(fechaString: string): string {
  const fecha = new Date(fechaString);

  const anio = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Se suma 1 porque los meses empiezan en 0
  const dia = fecha.getDate().toString().padStart(2, "0");

  return `${dia}/${mes}/${anio}`;
}

export { parseFecha };
