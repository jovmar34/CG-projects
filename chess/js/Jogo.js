class Jogo {

  movimenta(){
    this.delta = this.clock.getDelta();

    if (this.mudaVelocidade) {
      if (this.sentido < 0) this.sentido = 3;
      else this.sentido = -3;

      this.mudaVelocidade = false;
    }

    this.velocidade += this.sentido*this.delta;

    if (this.velocidade >= 2) {
      this.velocidade = 2;
    }
    else if (this.velocidade <= 0) {
      this.velocidade = 0;
    }

    this.bola.movimenta(this.delta, this.velocidade);

  }

  render(){
    'use strict';
    this.renderer.clear();

    if(this.naoMexe){
    this.renderer.render(this.cenaPausa, this.cameraPausa);

  }
  else{

    this.renderer.render(this.cena, this.camera);
  }
  }

  anima() {
      'use strict';

      if (this.mudaMesh) {
        var i, j;
        for(i=0;i<9;i++)
          for(j=0;j<2;j++)
            this.arrayMateriais[i][j].wireframe = !this.arrayMateriais[i][j].wireframe;
        this.mudaMesh = false;
      }

      if (this.mudaCalculaLuz) {
        if( this.materialAtual==0)
          this.materialAtual=1;
        else
          this.materialAtual = 0;

        var matTabuleiroCima = this.arrayMateriais[0][this.materialAtual];
        var matTabuleiroBaixo = this.arrayMateriais[1][this.materialAtual];
        var matBola = this.arrayMateriais[2][this.materialAtual];

        this.chessBoard.updateMesh(matTabuleiroCima, matTabuleiroBaixo);
        this.bola.updateMesh(matBola);

        var i;
        var array=[];
        for(i=3;i<9;i++)
          array.push(this.arrayMateriais[i][this.materialAtual]);
        this.cubo.updateMesh(array);
        this.mudaCalculaLuz=false;
       }

      if(this.mudaDirectional){
        if(this.luzDirecional.intensity==0)
          this.luzDirecional.intensity = 2;
        else
          this.luzDirecional.intensity = 0;
        this.mudaDirectional=false;
      }

      if(this.mudaPontual){
        if(this.luzPontual.intensity==0)
          this.luzPontual.intensity = 2;
        else
          this.luzPontual.intensity = 0;
        this.mudaPontual=false;
      }

      if (this.pausa) {
          if(this.clock.running){
                this.naoMexe=true;
                this.clock.stop();
                //console.log("dps stop");
                //console.log(this.clock.running);
                //console.log("visibilidade");
                //console.log(this.ecraPausa.visible);
                //console.log(this.ecraPausa.visible);
          }
          else{
            this.naoMexe=false;
            this.clock.start();
          }


        this.pausa = false;
      }

      if(this.reinicia){
        if(!this.clock.running){
          this.pausa=true;
          this.bola.reset();
          this.mudaVelocidade = false;
          this.velocidade = 0;
          this.sentido = -3;
        }
      this.reinicia = false;
      }

      
      if(this.mudouTamanho){
          if (window.innerHeight > 0 && window.innerWidth > 0) {
              var escalar = 1250/window.innerWidth;
              this.camera.aspect = window.innerWidth / window.innerHeight;
              this.camera.position.x = 2*this.altura*escalar;
              this.camera.position.z = this.altura*escalar;
              this.camera.position.y = 30*escalar;
        }

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.mudouTamanho = false;
      }
      if(this.naoMexe==false){
        this.movimenta();
      }
      this.render();
      requestAnimationFrame(this.anima.bind(this));
  }

  onReSize(){
    this.mudouTamanho = true;
  }

    criaTudo() {
      this.reinicia = false;
      this.naoMexe = false;
      this.arrayMateriais = [];
      this.pausa = false;
      this.cena = new THREE.Scene();
      this.cena.background = new THREE.Color( 0xaed6f1 );
      this.velocidade = 0;
      this.mudaVelocidade = false;
      this.sentido = -3;
      this.materialAtual = 0;

      var loader = new THREE.TextureLoader()
      var chessText = loader.load("js/textures/chess.png");
      chessText.wrapS = THREE.RepeatWrapping;
      chessText.wrapT = THREE.RepeatWrapping;
      chessText.repeat.set(4,4);

      var chessMatBasic = new THREE.MeshBasicMaterial({color: 0xffffff, map: chessText,wireframe:false});
      var chessMatPhong = new THREE.MeshPhongMaterial({color: 0xf0f3f4, map: chessText, shininess: 0,wireframe:false});

      var madText = loader.load("js/textures/madeira.png")

      var materialBasic = new THREE.MeshBasicMaterial({color: 0xffffff, map: madText,wireframe:false});
      var materialPhong = new THREE.MeshPhongMaterial({color: 0xf0f3f4, map: madText, shininess: 0,wireframe:false});

      this.arrayMateriais.push([chessMatBasic,chessMatPhong]);
      this.arrayMateriais.push([materialBasic,materialPhong]);

      this.chessBoard = new Tabuleiro(0,0,0,chessMatBasic,materialBasic);

      var eixo = new THREE.AxisHelper(10);
      this.chessBoard.add(eixo);

      this.cena.add(this.chessBoard);

      var texturaBola = loader.load("js/textures/bilhar13.png");

      var materialBolaBasic= new THREE.MeshBasicMaterial({color: 0xffffff, map: texturaBola,wireframe:false});
      var materialBolaPhong= new THREE.MeshPhongMaterial({ map: texturaBola, specular: 0xffffff, shininess: 60,wireframe:false});
      this.arrayMateriais.push([materialBolaBasic, materialBolaPhong]);
      this.bola = new Bola(6,1.25,6,materialBolaBasic);
      this.cena.add(this.bola);

      var i;
      var array = [];
      var lolo = loader.load("js/textures/relevo.png");

      for(i=1;i<7;i++){
        var texturaFace = loader.load("js/textures/face"+ i.toString() + ".png");
        var materialBasic = new THREE.MeshBasicMaterial({color: 0xffffff, map: texturaFace,wireframe:false})
        var materialPhong= new THREE.MeshPhongMaterial({map: texturaFace, bumpMap: lolo, bumpScale: 0.7, shininess: 1,wireframe:false});
        this.arrayMateriais.push([materialBasic, materialPhong]);
        array.push(materialBasic);
      }

      this.cubo = new CuboRubik(0,0,0, array);
      this.cena.add(this.cubo);

      //LUZES
      this.luzPontual = new THREE.PointLight( 0xffffff, 2, 100, 0.4);
      this.luzPontual.position.set( 0, 10, 0);
      this.luzDirecional= new THREE.DirectionalLight( 0xffffff, 2);
      this.luzDirecional.position.set( 10, 10, 10);
      this.cena.add(this.luzPontual);
      this.cena.add(this.luzDirecional);

      //TAMANHOS E FLAGS
      this.altura = 40;
      this.frente=0;
      this.tras=0;
      this.dir=0;
      this.esq=0;

      //NOVA CENA PARA O ECRA DE PAUSA
      this.cenaPausa = new THREE.Scene();
      this.cenaPausa.background = new THREE.Color( 0xaed6f1 );
      this.fazerEcraPausa();


    }

    fazerEcraPausa(){
      var texturaPausa = new THREE.TextureLoader().load("js/textures/pausa.png");
      var material = new THREE.MeshBasicMaterial( { color: 0xffffff,map: texturaPausa});
      var geometry = new THREE.PlaneGeometry(16,16);
      this.ecraPausa = new THREE.Mesh(geometry, material);
      //console.log(this.ecraPausa);

      this.ecraPausa.position.x = 0;
      this.ecraPausa.position.y = 0;
      this.ecraPausa.position.z = 0;
    //  this.cenaPausa.visible = false;
      this.cenaPausa.add(this.ecraPausa);
    }

    criaCamera(){
      this.camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000);
      var escalar = 1250/window.innerWidth;
      this.camera.position.x = 2*this.altura*escalar;
      this.camera.position.z = this.altura*escalar;
      this.camera.position.y = 30*escalar;
      this.camera.lookAt(this.cena.position);
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;

      //CAMARA DO ECRA DE PAUSA
      this.cameraPausa = new THREE.OrthographicCamera(-40, 40, 20, -20, 1, 1000);
      this.cameraPausa.position.set(0, 0, 80);
      this.cameraPausa.lookAt(this.cenaPausa.position);
      //this.cenaPausa.add(this.cameraPausa);

    }

    onKeyDown(e) {
        'use strict';
        var code = e.keyCode;
        switch(code){
          case 87://W
            this.mudaMesh = true;
            break;
          case 76: //L
            this.mudaCalculaLuz= true;
            break;
          case 83: //S
          case 115: //s
                this.pausa = true;
                break;
          case 66: //B
            this.mudaVelocidade = true;
            break;
          case 68://D
            this.mudaDirectional = true;
            break;
          case 80://P
            this.mudaPontual = true;
            break;
          case 114:
          case 82: //R
            this.reinicia = true;
            console.log(this.pausa);
            console.log(this.reinicia);
            break;
        }
    }

    onKeyUp(e) {
      var code = e.keyCode;
      switch(code){
      case 37:
        this.esq = 0;
        break;
      case 39:
        this.dir = 0;
        break;
      case 38:
        this.frente = 0;
        break;
      case 40:
        this.tras = 0;
        break;
      }
    }


    inicia() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.mudaDirectional = false;
        this.mudaPontual = false;
        this.mudouMaterialG = false;
        this.mudouMaterialL = false;
        this.temp = 1; //controlador do material para o qual se muda ao carregar em "L"
        this.clock = new THREE.Clock();

        this.criaTudo();
        this.criaCamera();
        this.anima();
    }


    constructor() {
      this.inicia();
    }
}
