import { create } from 'zustand'
import { epsilon, gramatica, terminals } from './gramatic';


const globalProduction = gramatica


//Iterar Produção
function searchProduction(pile, char){
    for (let i in globalProduction) {
        
        let nT = globalProduction[i];

        if(nT.key === pile){
            for (let j in nT.list) {
                let globalProduction = nT.list[j];
                // console.log(globalProduction);
                // console.log(char);


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

        //Passou de 10 e nada ainda, reinicia
        if(steps >= 10){
            sentence = "S";
            nTerminal = "S";
            steps = 0;
        }
    }

    return sentence;
}

export function nextPass({ entry, sentence, pile, iteracao, end, resolver }) {
    if (sentence.length>0){
         if(end){
            resolver = []
            iteracao = 0;
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

        iteracao++;


        if(charPile === entry.charAt(0) && charPile === "$"){
            action = "Aceito em " + iteracao + " iterações";
            end = true;
        } else if(charPile && charPile === charPile.toUpperCase()){
            let globalProduction = searchProduction(charPile, entry.charAt(0));
            if(globalProduction) {
                action = globalProduction.nonTerminal + " -> " + globalProduction.production;
                if(globalProduction.production !== epsilon){
                    pile += globalProduction.production.split('').reverse().join('');
                }
            } else {
                end = true;
                action = "Erro em " + iteracao + " iterações!";
            }
        } else if (charPile && charPile === entry.charAt(0)){
            action = "Lê '" + entry.charAt(0) + "'";
            entry = entry.substr(1);
        } else {
            end = true;
            action = "Erro em " + iteracao + " iterações!";
        }


        resolver.push([pileTable, entryTable, action])

        return { entry, sentence, pile, iteracao, end, resolver, topEntry: entryTable[0] ,action }
    }
    return { entry, sentence, pile, iteracao, end: true, resolver, };
}


export const useAnalyzer = create((set) => ({
  state: {
    sentence: '',
    globalProduction:  gramatica,
    terminals,
    iteracao: 0,
    pile: '$S',
    entry: "",
    end: false,
    resolver: [],
    action: '',
    topEntry: '',
  },
  actions: {
    initSentence: () => set((state)=>{
        const initSentenceValue = initSentenceFunc();

        return {
            state: {
            ...state.state,
            resolver: [],
            sentence: initSentenceValue,
            iteracao : 0,
            pile : "$S",
            entry : "",
            end : false,
            action: '',
            topEntry: initSentenceValue[0], 
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
            iteracao: 0,
            pile : "$S",
            entry : "",
            end : false,
            action: "",
            topEntry: sentenceInput[0], 
        }
  }})
  },
}));


