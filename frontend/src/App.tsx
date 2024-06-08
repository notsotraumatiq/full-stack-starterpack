/** Codesignal will import React, ReactDOM, and the stylesheet for you automatically. This means that to use hooks, you must prefix them with React. e.g. const [val, setVal] = React.useState(). You will be unable to add your own imports to your solution.

You may modify any of the given components as you like, the automated testing suite will looks for divs with styling and identifiers as they are in the given components so we suggest you avoid changing the actual DOM elements being rendered.

Your solution is not a module, export and import tokens will throw SyntaxErrors.

Overview
We would like you to implement "Minesweeper", a logical deduction game which sees an m by n grid of both 'mined' and 'safe' squares.

A player clicks on a square within the grid to 'uncover' it, and if it is mined (or 'live') then the game is over and the player loses.

If the square is not mined, then it reveals the number of adjacent squares which are mined.

If the square is not mined, and there are no adjacent squares which are mined, then the game will automatically uncover adjacent, definitely safe, squares.

The player wins once they have 'uncovered' all safe squares in the grid.

Technical Specification
You have been provided with a series of prebuilt components that contain divs with various ids. These IDs will be used by a test suite to evaluate your solution.

Seeded Games
We would like you to implement a 'seeded' version of Minesweeper where a player can provide a comma separated list of integers via GameSeedInput of the form [width: number, height: number, ...mineIndices: number[]] denoting the size of the grid and a list of numbers in the range [0, width * height) which are mined.

For example:

💥	2	1
2	💥	1
1	1	1
Would be supplied as 3,3,0,4.

The GameSeedInput component will take the string supplied and return an object of the form [number, number, Set<number>] once the player presses 'Play'. Take care to validate that the seed you are given is valid. Your solution will only ever be supplied with seeds that fit the format above but there may be logical issues present in some of the seeds provided - your solution should simply avoid starting the game, avoid rendering the grid, avoid rendering any grid squares when the game is not in progress.

Nearby Counts
When a 'safe' square is uncovered it should display a number indicating how many adjacent squares contain mines. 'Adjacent' squares are as they are laid out in the grid, including diagonally adjacent squares.

For example:

💥 2 1
2	💥 1
1	1	1
The integers here represent the number of mines adjacent to the square.

Safest Safe Squares
When a safe square is uncovered, and has no adjacent squares which are mined, the game will automatically uncover all adjacent squares, since they are all known to be safe. This process will repeat for any automatically uncovered square which also has '0' adjacent mined squares.

For example, given a grid of this form (seed: 3,3,3)

💥
Uncovering Square at index 0:

(1)
💥
Uncovering Square at index 5:

1	0
💥	1	(0)
1	0
Winning
A player wins if they uncover all the safe squares on the minefield.

Losing
A player loses if they uncover any mined square on the minefield.

Evaluation
We will use an automated test suite to assess your solution, we suggest you work around the pre built components to maximise compatibility. Avoid mounting GridSquares, GameSeedInput, Grid etc. when not in use. We also expect eager nearby count calculations, lazy evaluation of these counts at the moment of uncovering will result in your solution being downgraded.
**/
/**
 * IMPORTANT!
 * CodeSignal implicitly imports React, ReactDOM, and the CSS file for you.
 * `import React from 'react'`
 *
 * This means you can use hooks by prefixing them with `React.`
 * e.g. React.useState() React.useEffect()
 *
 * This assessment uses React 17.
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
interface GridSquareProps {
  /** Callback fired when this grid square is clicked */
  onClick: (index: number) => void;
  /** Boolean indicating whether this square is mined or not */
  isExplosive: boolean;
  /** Boolean indicating whether this square has been uncovered */
  uncovered: boolean;
  /** The nearby mines count to display */
  nearbyMinesCount: number;
  /** The grid index of this square (ordinal) */
  index: number;
}
const GridSquare = ({
  index,
  onClick,
  isExplosive,
  uncovered,
  nearbyMinesCount,
}: GridSquareProps) => {
  return (
    <div
      id={`mine-${index}`}
      className={`mine ${isExplosive ? "live" : ""}`}
      onClick={() => {
        onClick(index);
      }}
    >
      <div
        id={`mine-overlay-${index}`}
        className="overlay"
        style={{
          display: uncovered ? "none" : undefined,
        }}
      />
      <span id={`mine-nearby-count-${index}`} className="nearby-count">
        {isExplosive ? "💥" : nearbyMinesCount}
      </span>
    </div>
  );
};

interface GridProps {
  height: number;
  width: number;
  mineIndices: Set<number>;
}

const Grid = ({ height, width, mineIndices }: GridProps) => {
  const mines = React.useMemo(() => {
    let result = [] as React.ReactNode[];
    for (let i = 0; i < height * width; i++) {
      const isMine = mineIndices.has(i);
      let count = 0;

      if (!isMine) {
        const indices = [i - 1, i + 1, i - width, i + width];
        for (let x of indices) {
          if (x < 0 || x > width * height) continue;
          // if (x % width === width - 1 || x === height) {
          if (mineIndices.has(x)) count += 1;
        }
      }

      result.push(
        <GridSquare
          index={i}
          key={i}
          onClick={(_: number) => {
            throw "function not implemented";
          }}
          isExplosive={isMine}
          uncovered={false}
          nearbyMinesCount={count}
        />
      );
    }
    return result;
  }, [height, width]);

  return (
    <div
      id="minefield"
      className="minefield"
      style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {mines}
    </div>
  );
};

type Seed = [width: number, height: number, mineLocations: Set<number>];
function processSeed(seed: string) {
  const test = "3,3,0,4";
  const [width, height, ...mineIndices] = test.split(",");
  return [
    Number(width),
    Number(height),
    new Set<number>(mineIndices.map(Number)),
  ] as Seed;
}
const GameSeedInput = ({
  setSeed,
}: {
  setSeed: (seed: Seed | null) => void;
}) => {
  const [_seed, _setSeed] = React.useState<string>("");

  return (
    <div id="game-seed-input">
      <input
        id="game-seed-input-input"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          _setSeed(e.target?.value ?? "");
        }}
        placeholder={"Game Seed"}
      />
      <button
        id="game-seed-input-button"
        onClick={() => {
          setSeed(processSeed(_seed));
        }}
      >
        Play
      </button>
    </div>
  );
};

const GameOver = ({
  restartGame,
  wonOrLost,
}: {
  restartGame: () => void;
  wonOrLost: "won" | "lost";
}) => {
  return (
    <div onClick={() => restartGame()} id="minesweeper-game-over">
      You {wonOrLost === "lost" ? "Lost" : "Won"} - Click to restart
    </div>
  );
};

function isSeedValid(seed: Seed): boolean {
  const [width, height, playerInput] = seed;
  if (width < 0 && height < 0 && playerInput.size < 0) return false;
  return true;
}
const App = () => {
  const [seed, setSeed] = React.useState<Seed>("" as unknown as Seed);
  const [gameValid, setGameValid] = React.useState<boolean>(false);

  return (
    <div id="minesweeper-main h-screen w-screen">
      <h1 id="minesweeper-title">Minesweeper</h1>
      <GameSeedInput setSeed={setSeed} />
      {isSeedValid(seed) === true ? (
        <Grid height={seed[0]} width={seed[1]} mineIndices={seed[2]} />
      ) : null}
      w
    </div>
  );
};

export default App;
