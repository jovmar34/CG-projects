
class Jogo {
    andar() {
      var temp;
      if(this.frente == this.tras && this.frente != 0) {
        if (this.velocidade > 0) this.andamento = -1;
        else if (this.velocidade < 0) this.andamento = 1;
      }
      else {
        this.andamento = this.frente - this.tras;
      }

      this.velocidade = this.velocidade + 20*this.delta*this.andamento; //aceleracao = 20; eq.velocidade
      if(this.velocidade != 0) {
        var i;
        var temp = this.cadeira.acento.rotation.y;
        this.cadeira.rotation.y += this.cadeira.acento.rotation.y;
        this.cadeira.translateZ(this.velocidade*this.delta + (10*this.delta*this.delta)*this.andamento);  //eq. posicao
        this.cadeira.rotation.y -= temp;
        this.cadeira.orienta(temp, this.velocidade, this.delta);  //roda o acento e as rodas
      }

      if(this.andamento == -1 && this.frente == -1) { // se levantar o arrowup e o arrowDown nao tiver carregado (desaceleracao frente)
        if (this.velocidade <= 0) {
          this.frente = 0;
          this.velocidade = 0;
        }
      }

      if(this.andamento == 1 && this.tras == -1) {    // se levantar o ArrowDown e orrowUp nao tiver carregado (desaceleracao tras)
        if (this.velocidade >= 0) {
          this.tras = 0;
          this.velocidade = 0;
        }
      }
    }

    rodar() {
      this.rotacao = this.esq - this.dir;
      this.cadeira.roda(this.rotacao, this.delta);
    }

    anima() {
        'use strict';

        this.delta = this.clock.getDelta();
        this.rodar();   //roda o acento e costas
        this.andar();
        if (this.mudaMesh) {
            this.cadeira.mudaMesh();
            this.mesa.mudaMesh();
            this.candeeiro.mudaMesh()
            this.mudaMesh = false;
        }

        if(this.mudouTamanho){

          'use strict';
          var ratio = window.innerWidth/window.innerHeight; //relacao entre largura e altura no momento da mudanca de tamanho de janela
          var diferenca = this.aspect/ratio; //diferenca entre relacoes de larguras e alturas inicial e final
          var novaAltura = this.altura*diferenca; //nova altura das camaras apos mudanca de tamanho da janela

          this.camera.left = ratio * novaAltura / -2;
          this.camera.right = ratio * novaAltura / 2;
          this.camera.top = novaAltura / 2;
          this.camera.bottom = novaAltura / -2;

          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.camera.updateProjectionMatrix();
          this.mudouTamanho = false;
        }
        this.render();
        requestAnimationFrame(this.anima.bind(this));
    }

    criaCamera(){
        var camera1 =  new THREE.OrthographicCamera(this.altura*this.aspect/-2,this.altura*this.aspect/2,this.altura/2,this.altura/-2,1,1000);
        camera1.position.set(0,50,0);
        camera1.lookAt(this.cena.position);

        var camera2 = new THREE.OrthographicCamera(this.altura*this.aspect/-2,this.altura*this.aspect/2,this.altura/2,this.altura/-2,1,1000);
        camera2.position.set(50,0,0);
        camera2.lookAt(this.cena.position);

        var camera3 = new THREE.OrthographicCamera(this.altura*this.aspect/-2,this.altura*this.aspect/2,this.altura/2,this.altura/-2,1,1000);
        camera3.position.set(0,0,50);
        camera3.lookAt(this.cena.position);

        this.arrayCameras=[camera1,camera2,camera3];
        this.camera = this.arrayCameras[0];
    }

    criaCena() {
        'use strict';
        this.cena = new THREE.Scene();
        this.cena.add(new THREE.AxisHelper(10));
    }

    criaMobilia(){
        'usa strict';
        this.candeeiro = new Candeeiro(20,8,0);

        this.cena.add(this.candeeiro);

        this.mesa = new Mesa(-37,6,2);

        this.cena.add(this.mesa);

        this.cadeira = new Cadeira(0,0,5);

        this.cena.add(this.cadeira);
    }

    render() {
        'use strict';
        this.renderer.render(this.cena, this.camera);
    }

    onKeyDown(e) {
        'use strict';
        var code = e.keyCode;

        switch (code) {
        case 97:
        case 65:
            this.mudaMesh = true;
            break;
        case 49: //1
            this.camera = this.arrayCameras[0];
            this.mudouTamanho = true;
            break;
        case 50://2
            this.camera = this.arrayCameras[1];
            this.mudouTamanho = true;
            break;
        case 51://3
            this.camera = this.arrayCameras[2];
            this.mudouTamanho = true;
            break;
        }

        if(code==38)//ArrowUp
          this.frente=1;
        if(code==40)//ArrowDown
          this.tras=1;
        if(code==37)//ArrowLeft
          this.esq=1;
        if(code==39)//ArrowRight
          this.dir=1;
    }

    onKeyUp(e) {
      var code = e.keyCode;
      if(code==37)
        this.esq = 0;
      if(code==39)
        this.dir = 0;
      if(code==38) {
        this.frente = -1;
      }
      if(code==40)
        this.tras = -1;
    }

    onReSize(){
      this.mudouTamanho = true;
    }

    inicia() {
        'use strict';
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.aspect = window.innerWidth/window.innerHeight; //aspeto das imagens no momento do load (relacao entre largura e altura da janela inicial)
        this.altura = 90; //altura das cameras
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.mudaMesh = false;
        this.velocidade = 0;
        this.frente=this.tras=this.esq=this.dir=0;
        this.clock = new THREE.Clock();

        this.criaCena();
        this.criaMobilia();
        this.criaCamera();
        this.anima();
    }

    constructor(){
        this.inicia();
    }
}
