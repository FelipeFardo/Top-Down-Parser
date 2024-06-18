import { create } from 'zustand'
import { epsilon, gramatica, terminals } from './gramatic';


const globalProduction = gramatica

function searchProduction(pile, char){
    for (let i in globalProduction) {
        
        let nT = globalProduction[i];

        if(nT.key === pile){
            for (let j in nT.list) {
                let globalProduction = nT.list[j];

                if(globalProduction.nonTerminal === pile && globalProduction.initial.includes(char)){
                    return globalProduction;
                }
            }
        }
    }
    return false;
}

function initSentenceFunc(){
    let complete = false;
    let sentence = "S";
    let nTerminal = "S";
    let steps = 0;
    while(!complete){
        for(let i in globalProduction){
            let nonTerminal = globalProduction[i];
            if(nonTerminal.key === nTerminal){
                let rand = Math.floor(Math.random() * nonTerminal.list.length);
                let prod = nonTerminal.list[rand];

                if(prod.production !== epsilon){
                    sentence = sentence.replace(nTerminal, prod.production);
                } else {
                    sentence = sentence.replace(nTerminal, '');
                }

                let match = /([A-Z])/g.exec(sentence);
                
                if(match === null){
                    complete = true;
                } else {
                    nTerminal = match[0];
                }
            }
        }
        steps++;

        if(steps >= 15){
            sentence = "S";
            nTerminal = "S";
            steps = 0;
        }
    }

    return sentence;
}

export function nextPass({ entry, sentence, pile, iteration, end, resolver }) {
    if (sentence.length>0){
         if(end){
            resolver = []
            iteration = 0;
            pile = "$S";
            entry = "";
            end = false;
        }
        if(!entry){
            entry = sentence + "$";
        }

        let action = "";
        let charPile = pile.slice(-1);
        let pileTable = pile;
        let entryTable = entry;
        pile = pile.slice(0, -1);

        iteration++;


        if(charPile === entry[0] && charPile === "$"){
            action = "Accept in " + iteration + " iteractions";
            end = true;
        } else if(charPile && charPile === charPile.toUpperCase()){
            let globalProduction = searchProduction(charPile, entry[0]);
            if(globalProduction) {

                action = globalProduction.nonTerminal + " -> " + globalProduction.production;
                if(globalProduction.production !== epsilon){
                    pile += globalProduction.production.split('').reverse().join('');
                }
            } else {
                end = true;
                action = "Error in " + iteration + " iteractions!";
            }
        } else if (charPile && charPile === entry[0]){
            action = "Lê '" + entry[0] + "'";
            entry = entry.substr(1);
        } else {
            end = true;
            action = "Error in " + iteration + " iteractions!";
        }


        resolver.push([pileTable, entryTable, action])

        return { entry, sentence, pile, iteration, end, resolver, topEntry: entryTable[0] ,action }
    }
    return { entry, sentence, pile, iteration, end: true, resolver, };
}


export const useAnalyzer = create((set) => ({
  state: {
    sentence: '',
    globalProduction:  gramatica,
    terminals,
    iteration: 0,
    pile: '$S',
    entry: "",
    end: false,
    resolver: [],
    action: '',
    topEntry: '',
  },
  actions: {
    initSentenceSuccess: () => set((state)=>{
        const initSentenceValue = initSentenceFunc();

        return {
            state: {
            ...state.state,
            resolver: [],
            sentence: initSentenceValue,
            iteration : 0,
            pile : "$S",
            entry : "",
            end : false,
            action: '',
            topEntry: initSentenceValue[0], 
        }
      };
    }),
    initSentenceError: () => set((state)=>{
        const initSentenceValue = initSentenceFunc();
        const initSentenceError = initSentenceValue + initSentenceValue[initSentenceValue.length-1]
        return {
            state: {
            ...state.state,
            resolver: [],
            sentence: initSentenceError,
            iteration : 0,
            pile : "$S",
            entry : "",
            end : false,
            action: '',
            topEntry: initSentenceError[0], 
        }
      };
    }),
    nextPass: () => set((state) => {
        const newState = nextPass(state.state);
        return { state: { ...state.state, ...newState } };
    }),
    iterateNextPass: () => set((state) => {
        let newState = nextPass(state.state);
        while(!newState.end) {
            newState = nextPass({...state.state, ...newState});
        }
        return { state: { ...state.state, ...newState } };
    }),
    changeSentence: (sentenceInput) => set((state)=>{
        return {
            state: {
            ...state.state,
            resolver: [],
            sentence: sentenceInput,
            iteration: 0,
            pile : "$S",
            entry : "",
            end : false,
            action: "",
            topEntry: sentenceInput[0], 
        }
  }})
  },
}));


