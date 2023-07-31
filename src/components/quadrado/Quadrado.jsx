import './Quadrado.css';

/*
  conteudo - se o quadrado é X ou O ou vazio, "p1" ou "p2" ou falsy
  vitoria - se o mini jogo tem uma vitória e quem ganhou, "p1" ou "p2" ou falsy
  empatado - se o mini jogo está empatado, true ou false
  jogadaPermitida - se a jogada é permitida no mini jogo atual, true ou false
*/
const Quadrado = ({
	conteudo,
	vitoria,
	empatado,
	jogadaPermitida,
	onClick
}) => {
	let mainClass = 'quadrado';

	if (vitoria === 'p1') mainClass += ' quadrado-vitoria-p1';
	else if (vitoria === 'p2') mainClass += ' quadrado-vitoria-p2';

	if (conteudo || vitoria || empatado) mainClass += ' quadrado-bloqueado';
	if (jogadaPermitida) mainClass += ' quadrado-permitido';
	if (empatado) mainClass += ` quadrado-empatado`;

	return (
		<div className={mainClass} onClick={onClick}>
			{conteudo === 'p1' && <div className='circulo' />}
			{conteudo === 'p2' && <div className='cruz' />}
		</div>
	);
};

export default Quadrado;
