import Lpv from 'lichess-pgn-viewer';
import { initAll as initMiniBoards } from 'common/mini-board';
import { OpeningPage } from './interfaces';
import { renderHistoryChart } from './chart';
import { init as searchEngine } from './search';

export function page(data: OpeningPage) {
  $('.opening__intro .lpv').each(function (this: HTMLElement) {
    Lpv(this, {
      pgn: this.dataset['pgn']!,
      initialPly: 'last',
      showMoves: 'bottom',
      showClocks: false,
      showPlayers: false,
      menu: {
        getPgn: {
          enabled: true,
          fileName: (this.dataset['title'] || this.dataset['pgn'] || 'opening').replace(' ', '_') + '.pgn',
        },
      },
    });
  });
  initMiniBoards();
  highlightNextPieces();
  searchEngine();
  lichess.requestIdleCallback(() => renderHistoryChart(data));
}

export function search() {
  searchEngine();
}

const highlightNextPieces = () => {
  $('.opening__next cg-board').each(function (this: HTMLElement) {
    Array.from($(this).find('.last-move'))
      .map(el => el!.style.transform)
      .forEach(transform => {
        $(this).find(`piece[style="transform: ${transform};"]`).addClass('highlight');
      });
  });
};
