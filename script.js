const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descricao = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d-1-right');
const numeros = document.querySelector('.d-1-3');

let votoBranco = true;
let etapaAtual = 0;
let numero = '';
let votos = []



function comecarEtapa() {
    const etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false


    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        }
        numeroHtml += '<div class="numero"></div>'
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}


function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {

            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();

        }
    }
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }

    })

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome:${candidato.nome}<br>Partido:${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src='${candidato.fotos[i].url}' alt='foto'/>${candidato.fotos[i].legenda}</div>`
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }


};

function branco() {
    // if(numero === '') {
    //     votoBranco = true;
    //     seuVotoPara.style.display = 'block';
    //     aviso.style.display = 'block';
    //     numeros.innerHTML = '';
    //     descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    //     lateral.innerHTML = '';
    // }else {
    //     alert('Para digitar em branco não pode clicar em NENHUM NÚMERO!!')
    // }
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'branco'
        })
        console.log('Coonfirmando como Branco...')
    }else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:numero
        })
        console.log('Confirmando como ' + numero)
    }
    
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca pisca">FIM</div>';
            console.log(votos);
        }
        
    }

}

comecarEtapa()