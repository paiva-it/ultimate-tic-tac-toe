import './Jogo.css';

import { useEffect, useState } from 'react';

import MiniJogo from '../mini-jogo/MiniJogo';

const NOVO_JOGO = [
	[
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		}
	],
	[
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		}
	],
	[
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		},
		{
			vitoria: false,
			empatado: false,
			quadrados: [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		}
	]
];

const JOGADA_PERMITIDA = [
	[false, false, false],
	[false, false, false],
	[false, false, false]
];

const JOGADA_PERMITIDA_TODAS = [
	[true, true, true],
	[true, true, true],
	[true, true, true]
];

const POSSIBILIDADES = [
	//LINHAS
	[
		{ l: 0, c: 0 },
		{ l: 0, c: 1 },
		{ l: 0, c: 2 }
	],
	[
		{ l: 1, c: 0 },
		{ l: 1, c: 1 },
		{ l: 1, c: 2 }
	],
	[
		{ l: 2, c: 0 },
		{ l: 2, c: 1 },
		{ l: 2, c: 2 }
	],
	//COLUNAS
	[
		{ l: 0, c: 0 },
		{ l: 1, c: 0 },
		{ l: 2, c: 0 }
	],
	[
		{ l: 0, c: 1 },
		{ l: 1, c: 1 },
		{ l: 2, c: 1 }
	],
	[
		{ l: 0, c: 2 },
		{ l: 1, c: 2 },
		{ l: 2, c: 2 }
	],
	//DIAGONAIS
	[
		{ l: 0, c: 0 },
		{ l: 1, c: 1 },
		{ l: 2, c: 2 }
	],
	[
		{ l: 0, c: 2 },
		{ l: 1, c: 1 },
		{ l: 2, c: 0 }
	]
];

const JOGADOR_INICIAL = 'p1';
const VITORIA_INICIAL = false;
const TEMPOS_INICIAL = [300, 300];

const printJogador = jogador => {
	switch (jogador) {
		case 'p1':
			return 'Jogador 1';
		case 'p2':
			return 'Jogador 2';
	}
};

const Jogo = () => {
	const [miniJogos, setMiniJogos] = useState(NOVO_JOGO);
	const [jogadaPermitida, setJogadaPermitida] = useState(
		JOGADA_PERMITIDA_TODAS
	);
	const [jogadorAtual, setJogadorAtual] = useState(JOGADOR_INICIAL);
	const [vitoria, setVitoria] = useState(VITORIA_INICIAL);
	const [tempos, setTempos] = useState(TEMPOS_INICIAL);

	useEffect(() => {
		let intervalo = setInterval(() => {
			setTempos(prevTempos => {
				if (jogadorAtual === 'p1') return [prevTempos[0] - 1, prevTempos[1]];
				if (jogadorAtual === 'p2') return [prevTempos[0], prevTempos[1] - 1];

				return prevTempos;
			});
		}, 1000);

		return () => {
			clearInterval(intervalo);
		};
	}, [jogadorAtual]);

	useEffect(() => {
		if (tempos[0] <= 0) setVitoria('p2');
		if (tempos[1] <= 0) setVitoria('p1');
	}, [tempos]);

	const onClick = (i, j) => (k, l) => () => {
		if (miniJogos[i][j].vitoria || miniJogos[i][j].quadrados[k][l]) return;
		if (jogadaPermitida[i][j] === false) return;

		// COPIAR MINI JOGO
		const copia_miniJogos = JSON.parse(JSON.stringify(miniJogos));

		copia_miniJogos[i][j].quadrados[k][l] = jogadorAtual;

		// VITORA OU EMPATADO MINI JOGO
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const miniJogo = copia_miniJogos[i][j];

				if (miniJogo.vitoria || miniJogo.empatado) continue;

				// VITORIA
				for (const posicoes of POSSIBILIDADES) {
					const [posicao1, posicao2, posicao3] = posicoes;
					const quadrado1 = miniJogo.quadrados[posicao1.l][posicao1.c];
					const quadrado2 = miniJogo.quadrados[posicao2.l][posicao2.c];
					const quadrado3 = miniJogo.quadrados[posicao3.l][posicao3.c];

					if (
						quadrado1 &&
						quadrado2 &&
						quadrado3 &&
						quadrado1 === quadrado2 &&
						quadrado2 === quadrado3
					) {
						miniJogo.vitoria = quadrado1;
						break;
					}
				}

				// EMPATADO
				let empatado = true;

				for (let k = 0; k < 3 && empatado; k++)
					for (let l = 0; l < 3 && empatado; l++)
						if (!miniJogo.quadrados[k][l]) empatado = false;

				miniJogo.empatado = empatado;
			}
		}

		// VITORIA JOGO
		for (const posicoes of POSSIBILIDADES) {
			const [posicao1, posicao2, posicao3] = posicoes;
			const miniJogo1 = copia_miniJogos[posicao1.l][posicao1.c];
			const miniJogo2 = copia_miniJogos[posicao2.l][posicao2.c];
			const miniJogo3 = copia_miniJogos[posicao3.l][posicao3.c];

			if (
				miniJogo1.vitoria &&
				miniJogo2.vitoria &&
				miniJogo3.vitoria &&
				miniJogo1.vitoria === miniJogo2.vitoria &&
				miniJogo2.vitoria === miniJogo3.vitoria
			) {
				setVitoria(miniJogo1.vitoria);
				return;
			}
		}

		// FIM JOGO
		let fimJogo = true;

		for (let i = 0; i < 3 && fimJogo; i++)
			for (let j = 0; j < 3 && fimJogo; j++)
				if (!copia_miniJogos[i][j].vitoria && !copia_miniJogos[i][j].empatado)
					fimJogo = false;

		if (fimJogo) {
			let vitoriasJ1 = 0,
				vitoriasJ2 = 0;

			for (let i = 0; i < 3; i++)
				for (let j = 0; j < 3; j++)
					if (miniJogos[i][j].vitoria)
						miniJogos[i][j].vitoria === 'p1' ? vitoriasJ1++ : vitoriasJ2++;

			if (vitoriasJ1 === vitoriasJ2)
				setVitoria(tempos[0] > tempos[1] ? 'p1' : 'p2');
			else setVitoria(vitoriasJ1 > vitoriasJ2 ? 'p1' : 'p2');
		}

		// JOGADA PERMITIDA
		if (copia_miniJogos[k][l].vitoria || copia_miniJogos[k][l].empatado) {
			const copia_JOGADA_PERMITIDA_TODAS = JSON.parse(
				JSON.stringify(JOGADA_PERMITIDA_TODAS)
			);

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (copia_miniJogos[i][j].empatado)
						copia_JOGADA_PERMITIDA_TODAS[i][j] = false;
				}
			}

			setJogadaPermitida(copia_JOGADA_PERMITIDA_TODAS);
		} else {
			const copia_JOGADA_PERMITIDA = JSON.parse(
				JSON.stringify(JOGADA_PERMITIDA)
			);
			copia_JOGADA_PERMITIDA[k][l] = true;

			setJogadaPermitida(copia_JOGADA_PERMITIDA);
		}

		// TROCAR JOGADOR
		setJogadorAtual(jogadorAtual === 'p1' ? 'p2' : 'p1');

		setMiniJogos(copia_miniJogos);
	};

	if (vitoria) {
		return (
			<div className='vitoria'>
				<span className='info-titulo'>Vitoria do {printJogador(vitoria)}!</span>
				<div
					className='info-novo-jogo'
					onClick={() => {
						setMiniJogos(NOVO_JOGO);
						setJogadaPermitida(JOGADA_PERMITIDA_TODAS);
						setJogadorAtual(JOGADOR_INICIAL);
						setVitoria(VITORIA_INICIAL);
						setTempos(TEMPOS_INICIAL);
					}}
				>
					Novo Jogo
				</div>
			</div>
		);
	}

	return (
		<div className='around-jogo'>
			<div className='jogo'>
				{miniJogos?.map &&
					miniJogos.map((linha, i) =>
						linha.map((estado, j) => (
							<MiniJogo
								key={`${i}-${j}`}
								estado={estado}
								jogadaPermitida={jogadaPermitida[i][j]}
								onClick={onClick(i, j)}
							/>
						))
					)}
			</div>
			<div className='info-jogo'>
				<span className='info-titulo'>Ultimate Tic Tac Toe</span>
				<span className='info-jogador'>
					<b>Jogador Atual:</b> {printJogador(jogadorAtual)}
				</span>
				<span className='info-jogador'>
					<b>Tempo Jogador 1:</b> {tempos[0]} segundos
				</span>
				<span className='info-jogador'>
					<b>Tempo Jogador 2:</b> {tempos[1]} segundos
				</span>
				<div
					className='info-novo-jogo'
					onClick={() => {
						setMiniJogos(NOVO_JOGO);
						setJogadaPermitida(JOGADA_PERMITIDA_TODAS);
						setJogadorAtual(JOGADOR_INICIAL);
						setVitoria(VITORIA_INICIAL);
						setTempos(TEMPOS_INICIAL);
					}}
				>
					Novo Jogo
				</div>
			</div>
		</div>
	);
};

export default Jogo;
