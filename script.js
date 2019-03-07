var newton = 1.9;
var potatoes_bag = 0;
var coaches = 0;
var gorillas = 0;
var potatoesBagWithBricks = false;
var potatoesCost = 0.1;
var coachesCost = 10;
var gorillasCost = 1000;

function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.newton !== "undefined") newton = savegame.newton;
    if (typeof savegame.potatoes_bag !== "undefined") potatoes_bag = savegame.potatoes_bag;
    if (typeof savegame.coaches !== "undefined") coaches = savegame.coaches;
    if (typeof savegame.gorillas !== "undefined") gorillas = savegame.gorillas;
    if (typeof savegame.potatoesBagWithBricks !== "undefined") potatoesBagWithBricks = savegame.potatoesBagWithBricks;
    //localStorage.removeItem("save");
}


function newtonClick (number){
    newton = newton + number;
    document.getElementById('newton').innerHTML = prettify(newton);
    unity()
};

function buyPotatoesBag (){

    if (newton >= potatoesCost){
        potatoes_bag = potatoes_bag + 1;
        newton = newton - potatoesCost;
        document.getElementById('potatoes-bag').innerHTML = prettify(potatoes_bag);
        document.getElementById('newton').innerHTML = prettify(newton);
        potatoesCost = potatoesCost*1.2;

    };
    document.getElementById('potatoesBagCost').innerHTML = prettify(potatoesCost);
    console.log(potatoesCost);

};

function buyCoaches (){

    if (newton >= coachesCost){
        coaches = coaches + 1;
        newton = newton - coachesCost;
        document.getElementById('coaches').innerHTML = prettify(coaches);
        document.getElementById('newton').innerHTML = prettify(newton);
        coachesCost = coachesCost*1.2;

    };
    document.getElementById('coachesCost').innerHTML = prettify(coachesCost);
    console.log(coachesCost);
};

function buyGorillas (){

    if (newton >= gorillasCost){
        gorillas = gorillas + 1;
        newton = newton - gorillasCost;
        document.getElementById('gorillas').innerHTML = prettify(gorillas);
        document.getElementById('newton').innerHTML = prettify(newton);
        gorillasCost = gorillasCost*1,2;
    };
    document.getElementById('gorillasCost').innerHTML = prettify(gorillasCost);
};

function potatoesBagUpgrades(){
    if(potatoes_bag === 10){
        document.getElementById('containerPotatoes').insertAdjacentHTML
        ('afterbegin', '<div><button id="upgradePotatoesBrick" onclick="upgrades()">potatoesBagWithBricks</button></div>');
    }
}

function upgrades(){
    const potatoesUpgradeBricks = 2000;
    if(newton >= potatoesUpgradeBricks){
        newton = newton - potatoesUpgradeBricks;
        potatoesBagWithBricks = true;
        document.getElementById('upgradePotatoesBrick').classList.add('active');
        document.getElementById('btnPotatoes').classList.add('active');
    }
}

window.setInterval(function(){
    if (potatoesBagWithBricks===false){newtonClick(potatoes_bag*0.0014);};
    if (potatoesBagWithBricks===true){newtonClick((potatoes_bag*0.0014)+(1,5*potatoes_bag));}
    newtonClick(coaches*10);
    newtonClick(gorillas*25);
}, 1000);

document.getElementById('btnPotatoes').addEventListener('click', potatoesBagUpgrades);

function save(){
    const save = {
        newton: newton,
        potatoes_bag: potatoes_bag,
        coaches: coaches,
        gorillas: gorillas,
        potatoesBagWithBricks: potatoesBagWithBricks
    }
    localStorage.setItem("save",JSON.stringify(save));
    alert('game has been saved !');
}

window.setInterval(function(){
    save();
    alert('game has been saved !');
}, 740000);

function prettify(input){
    var output1 = Math.round(input * 10000)/10000;
    var output2 = Math.round(input * 100)/100;
    if(newton < 1){return output1;};
    if(newton >= 1){return output2;};
}

function unity(){
    if(newton >= 1){
        document.getElementById('calories').innerHTML = "kcals";
    }
}
