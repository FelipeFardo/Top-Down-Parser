export const epsilon = "ε";

export const gramatica = [
  {
    key: 'S',
    list: [
      {
        nonTerminal: "S",
        initial: ["a"],
        production: "aBa"
      },
      {
        nonTerminal: "S",
        initial: ["b","c"],
        production: "AB"
      },
      {
        nonTerminal: "S",
        initial: ["d"],
        production: "dA"
      }
    ]
  },
  {
    key: 'A',
    list: [
      {
        nonTerminal: "A",
        initial: ["b"],
        production: "bA"
      },
      {
        nonTerminal: "A",
        initial: ["c"],
        production: "c"
      }
    ]
  },
  {
    key: 'B',
    list: [
      {
        nonTerminal: "B",
        initial: ["a"],
        production: epsilon
      },
      {
        nonTerminal: "B",
        initial: ["b"],
        production: "bA"
      },
      {
        nonTerminal: "B",
        initial: ["c"],
        production: "cC"
      },
      {
        nonTerminal: "B",
        initial: ["d"],
        production: 'dAa'
      },
    ]
  },
  {
    key: 'C',
    list: [
      {
        nonTerminal: "C",
        initial: ["a"],
        production: "aCA"
      },
      {
        nonTerminal: "C",
        initial: ["b"],
        production: "b"
      }
    ]
  }
]

export const getTerminals = () => {
  const terminalSet = new Set();

  gramatica.forEach(nonTerminalObj => {
    nonTerminalObj.list.forEach(rule => {
      rule.initial.forEach(symbol => {
        terminalSet.add(symbol);
      });
    });
  });

  const terminals = Array.from(terminalSet);
  terminals.sort();
  terminals.push('$');

  return terminals;
}
export const terminals = getTerminals()

