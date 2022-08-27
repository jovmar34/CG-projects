var jogo;

function comeca(){
    jogo = new Jogo();
}

function mudaflag(e){
  jogo.onKeyDown(e);

}
function mudaMovimento(e){
  jogo.onKeyUp(e);
}

function mudaTamanho(){
  jogo.onReSize();
}

window.addEventListener("keydown", mudaflag);
//window.addEventListener("keyup", mudaMovimento);
window.addEventListener("resize", mudaTamanho);
