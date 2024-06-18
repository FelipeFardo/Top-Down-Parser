export const epsilon = "ε";

export const gramatica = [
  {
    key: 'S',
    list: [
      {
        nonTerminal: "S",
        initial: ["a", "c", "d"],
        production: "ABC"
      }
    ]
  },
  {
    key: 'A',
    list: [
      {
        nonTerminal: "A",
        initial: ["a"],
        production: "aAb"
      },
      {
        nonTerminal: "A",
        initial: ["b", "c", "d", "e", "f"],
        production: epsilon
      }
    ]
  },
  {
    key: 'B',
    list: [
      {
        nonTerminal: "B",
        initial: ["c"],
        production: "cBCcA"
      },
      {
        nonTerminal: "B",
        initial: ["d"],
        production: "d"
      }
    ]
  },
  {
    key: 'C',
    list: [
      {
        nonTerminal: "C",
        initial: ["e"],
        production: "eCBe"
      },
      {
        nonTerminal: "C",
        initial: ["f"],
        production: "f"
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

