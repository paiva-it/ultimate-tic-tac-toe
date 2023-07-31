import './MiniJogo.css';

import Quadrado from '../quadrado/Quadrado';

const MiniJogo = ({ estado, jogadaPermitida, onClick }) => {
	return (
		<div className='mini-jogo'>
			{estado?.quadrados?.map &&
				estado.quadrados.map((linha, k) =>
					linha.map((conteudo, l) => (
						<Quadrado
							key={`${k}-${l}`}
							conteudo={conteudo}
							empatado={estado.empatado}
							vitoria={estado.vitoria}
							jogadaPermitida={jogadaPermitida}
							onClick={onClick(k, l)}
						/>
					))
				)}
		</div>
	);
};

export default MiniJogo;
