const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result

    switch (true){
        case random < 0.33:
            result = "RETA";
        break;
        case random < 0.66:
            result = "CURVA";
        break;
        default:
            result = "CONFRONTO";
        break;
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
    );
    
}

async function playRaceEngine(character1, character2){

    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);
        
        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
    
        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
    
        if (block === "RETA"){
            totalTestSkill1 = character1.VELOCIDADE + diceResult1;
            totalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

            // Garante que os pontos nunca fiquem negativos
            character1.PONTOS = Math.max(0, character1.PONTOS);
            character2.PONTOS = Math.max(0, character2.PONTOS);
        }

        if (block === "CURVA"){
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

            // Garante que os pontos nunca fiquem negativos
            character1.PONTOS = Math.max(0, character1.PONTOS);
            character2.PONTOS = Math.max(0, character2.PONTOS);
        }
    
        if (block === "CONFRONTO"){
            let powerResult1 = character1.PODER + diceResult1;
            let powerResult2 = character2.PODER + diceResult2;

            // Sorteio do item: casco ou bomba
            const item = Math.random() < 0.5 ? "CASCO" : "BOMBA";
            const itemEmoji = item === "CASCO" ? "🐢" : "💣";
            const pontosPerdidos = item === "CASCO" ? 1 : 2;

            console.log(
                `${character1.NOME} confrontou ${character2.NOME}!🥊 Item sorteado: ${item} ${itemEmoji}`
            );

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2) {
                console.log(`${character1.NOME} venceu o confronto usando ${itemEmoji} e ${character2.NOME} perde ${pontosPerdidos} ponto(s)!`);
                character2.PONTOS -= pontosPerdidos;
                character1.PONTOS += 1; // Turbo
                console.log(`${character1.NOME} ganhou um TURBO! (+1 ponto)`);
            } else if (powerResult2 > powerResult1) {
                console.log(`${character2.NOME} venceu o confronto usando ${itemEmoji} e ${character1.NOME} perde ${pontosPerdidos} ponto(s)!`);
                character1.PONTOS -= pontosPerdidos;
                character2.PONTOS += 1; // Turbo
                console.log(`${character2.NOME} ganhou um TURBO! (+1 ponto)`);
            } else {
                console.log(`🤝 O confronto empatou! Ninguém perde pontos!\n`); 
            }
            
            // Garante que os pontos nunca fiquem negativos após o confronto
            character1.PONTOS = Math.max(0, character1.PONTOS);
            character2.PONTOS = Math.max(0, character2.PONTOS);
        }

        //definir vencedor
        if (totalTestSkill1 > totalTestSkill2){
            console.log(`🏆 ${character1.NOME} marcou 1 ponto!\n`);
            character1.PONTOS += 1;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`🏆 ${character2.NOME} marcou 1 ponto!\n`);
            character2.PONTOS += 1;
        }

        // Garante que os pontos nunca fiquem negativos após cada rodada
        character1.PONTOS = Math.max(0, character1.PONTOS);
        character2.PONTOS = Math.max(0, character2.PONTOS);

        // else {
        //     console.log(`🤝 A rodada empatou!\n`);
        // }
        console.log("-----------------------------------\n");

    }

}

async function declareWinner(character1, character2){

    console.log(`Resultado final:`)
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos`);
    
    if (character1.PONTOS > character2.PONTOS){
        console.log(`\n🏆🚨 ${character1.NOME} é o grande vencedor!`);
    } else if (character2.PONTOS > character1.PONTOS){
        console.log(`\n🏆🚨 ${character2.NOME} é o grande vencedor!`);
    } else {
        console.log(`\n🤝🚨 A corrida empatou!`);
    }

}

(async function main(){
    console.log(
        `🏁🚨 - Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
    );
    
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();