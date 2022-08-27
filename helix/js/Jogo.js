class Jogo {

  movimenta(){
    this.delta = this.clock.getDelta();
    var  vertical = this.tras - this.frente;
    var horizontal = this.dir - this.esq;
    this.aviao.gira(horizontal,vertical, this.delta);
  }

  render(){
        'use strict';
        this.renderer.render(this.cena, this.camera);
  }

  desligaLuz(){
    var i;
    var esta=-1;
    for(i=0; i<4; i++){
      if(this.desliga[i]==true)
        esta=i;
    }
    return esta;
  }

  anima() {
      'use strict';

      if (this.mudaSol) {
        if (this.Sol.intensity == 0) this.Sol.intensity = 1;
        else this.Sol.intensity = 0;
        this.mudaSol = false;
      }

      if (this.mudaMesh) {
        var i, j;
        for (i=0; i < this.arrayMateriais.length; i++) {
          for (j = 0; j < 3; j++) {
            this.arrayMateriais[i][j].wireframe = !this.arrayMateriais[i][j].wireframe;
          }
        }
        this.mudaMesh = false;
      }

      if (this.mudouMaterialL) {
        var temporario = this.materialAtual;
        this.materialAtual = this.temp;
        this.temp = temporario;
        var matFuselagem = this.arrayMateriais[0][this.materialAtual];
        var matAsas = this.arrayMateriais[1][this.materialAtual];
        var matCockpit = this.arrayMateriais[2][this.materialAtual];
        var matBase = this.arrayMateriais[3][this.materialAtual];
        var matLampada = this.arrayMateriais[4][this.materialAtual];
        var matJanela = this.arrayMateriais[5][this.materialAtual];
        var matHelice = this.arrayMateriais[6][this.materialAtual];
        this.aviao.updateMesh(matFuselagem,matAsas, matCockpit, matJanela,matHelice);

        var i;
        for(i=0; i<this.arrayHolofotes.length; i++){
          this.arrayHolofotes[i].updateMesh(matBase, matLampada);
        }
        this.mudouMaterialL = false;
       }

      if (this.mudouMaterialG) {
        if (this.materialAtual != 2) {
          this.materialAtual = (this.materialAtual + 1)%2;
          var matFuselagem = this.arrayMateriais[0][this.materialAtual];
          var matAsas = this.arrayMateriais[1][this.materialAtual];
          var matCockpit = this.arrayMateriais[2][this.materialAtual];
          var matBase = this.arrayMateriais[3][this.materialAtual];
          var matLampada = this.arrayMateriais[4][this.materialAtual];
          var matJanela = this.arrayMateriais[5][this.materialAtual];
          var matHelice = this.arrayMateriais[6][this.materialAtual];
          this.aviao.updateMesh(matFuselagem, matAsas, matCockpit, matJanela, matHelice);

          var i;
          for(i=0; i<this.arrayHolofotes.length; i++){
            this.arrayHolofotes[i].updateMesh(matBase, matLampada);
          }
        }
        this.mudouMaterialG = false;
      }

      var luzinha = this.desligaLuz();
      if(luzinha!=-1){
        if(this.arrayLuz[luzinha].intensity==0)
          this.arrayLuz[luzinha].intensity=0.8;
        else
          this.arrayLuz[luzinha].intensity=0;

        this.desliga[luzinha]=false;
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

      this.movimenta();
      this.render();
      requestAnimationFrame(this.anima.bind(this));
  }

  onReSize(){
    this.mudouTamanho = true;
  }

    criaTudo() {
      this.cena = new THREE.Scene();
      this.cena.background = new THREE.Color( 0xaed6f1 );

      //MATERIAIS
      this.arrayMateriais = [];
      this.materialAtual = 2; //basic

      var materialFuselagemBasic = new THREE.MeshBasicMaterial({color: 0xecf0f1, wireframe:true});
      var materialFuselagemPhong = new THREE.MeshPhongMaterial({color: 0xecf0f1,wireframe: true, wireframe: true, shininess: 0});
      var materialFuselagemLambert = new THREE.MeshLambertMaterial({color: 0xecf0f1, wireframe: true});
      var materialF=[materialFuselagemLambert,materialFuselagemPhong,materialFuselagemBasic];
      this.arrayMateriais.push(materialF);

      var materialAsasBasic = new THREE.MeshBasicMaterial({color: 0xFF5733 , wireframe:true});
      var materialAsasPhong = new THREE.MeshPhongMaterial({color: 0xFF5733 , wireframe: true, shininess:2, specular: 0xedbb99} );
      var materialAsasLambert = new THREE.MeshLambertMaterial({color: 0xFF5733, wireframe: true});
      var materialA=[materialAsasLambert,materialAsasPhong,materialAsasBasic];
      this.arrayMateriais.push(materialA);

      var materialCockpitBasic = new THREE.MeshBasicMaterial({color:0xecf0f1 , wireframe:true});
      var materialCockpitPhong = new THREE.MeshPhongMaterial({color:0xecf0f1 , wireframe: true, shininess:10, specular: 0xfdfefe } );
      var materialCockpitLambert = new THREE.MeshLambertMaterial({color: 0xecf0f1 , wireframe: true});
      var materialC=[materialCockpitLambert,materialCockpitPhong,materialCockpitBasic];
      this.arrayMateriais.push(materialC);

      var materialBase = new THREE.MeshBasicMaterial({color:0x34495e,  side: THREE.DoubleSide, wireframe:true});
      var materialBasePhong = new THREE.MeshPhongMaterial({color:0x34495e , side: THREE.DoubleSide , wireframe: true, shininess: 4, specular: 0x5e85ad} );
      var materialBaseLambert = new THREE.MeshLambertMaterial({color: 0x34495e , side: THREE.DoubleSide, wireframe: true});
      var matB = [materialBaseLambert,materialBasePhong,materialBase];
      this.arrayMateriais.push(matB);

      var materialLampada = new THREE.MeshBasicMaterial({color:0xf7dc6f, side: THREE.DoubleSide, wireframe:true});
      var materialLampadaPhong = new THREE.MeshPhongMaterial({color:0xf7dc6f ,  side: THREE.DoubleSide, wireframe: true, shininess:100, specular: 0xfcf3cf} );
      var materialLampadaLambert = new THREE.MeshLambertMaterial({color: 0xf7dc6f ,  side: THREE.DoubleSide, wireframe: true});
      var matL = [materialLampadaLambert,materialLampadaPhong,materialLampada];
      this.arrayMateriais.push(matL);

      var materialJanelaBasic = new THREE.MeshBasicMaterial({color:0xa6a6a6, wireframe:true,opacity: 0.2 });
      var materialJanelaPhong = new THREE.MeshPhongMaterial({color:0xa6a6a6, wireframe: true, shininess:10, specular: 0xffffff, opacity: 0.7 } );
      var materialJanelaLambert = new THREE.MeshLambertMaterial({color: 0xa6a6a6, wireframe: true,opacity: 0.7 });
      var materialJ=[materialJanelaLambert,materialJanelaPhong,materialJanelaBasic];
      this.arrayMateriais.push(materialJ);

      var materialHeliceBasic = new THREE.MeshBasicMaterial({color: 0xFF5733,side: THREE.DoubleSide, wireframe:true});
      var materialHelicePhong = new THREE.MeshPhongMaterial({color: 0xFF5733,wireframe: true,side: THREE.DoubleSide, shininess:3, specular: 0xedbb99});
      var materialHeliceLambert = new THREE.MeshLambertMaterial({color: 0xFF5733,side: THREE.DoubleSide, wireframe: true});
      var materialH=[materialHeliceLambert,materialHelicePhong,materialHeliceBasic];
      this.arrayMateriais.push(materialH);


      //CRIAR AVIAO
      this.aviao = new Aviao(0,0,0,materialFuselagemBasic, materialAsasBasic,materialCockpitBasic, materialJanelaBasic, materialHeliceBasic);
      this.cena.add(this.aviao);

      //CRIAR LUZES
      this.Sol = new THREE.DirectionalLight(0xffffff, 1);
      this.Sol.position.set(0,100,0);
      this.mudaSol = false;
      this.cena.add(this.Sol);

      this.desliga = [false,false,false,false];
      this.arrayHolofotes = [];
      this.arrayLuz = [];
      var holofote;
      var posicoes = [[15,-10,15],[-15,-10,-15],[-15,-10,15],[15,-10,-15]];
      var rotacoesX = [Math.PI/4,-Math.PI/4,Math.PI/4,-Math.PI/4];
      var rotacoesZ = [Math.PI/4,-Math.PI/4,-Math.PI/4,Math.PI/4];
      var i;

      for(i=0;i<4;i++){
        holofote = new Holofote(posicoes[i],rotacoesX[i],rotacoesZ[i],materialBase,materialLampada);
        this.arrayHolofotes.push(holofote);
        this.cena.add(holofote);

        var luz = new THREE.SpotLight( 0xffffff, 0.9 );
        luz.position.set(posicoes[i][0], posicoes[i][1], posicoes[i][2]);
        luz.target.position.set(this.aviao.position.x,this.aviao.position.y,this.aviao.position.z);
        luz.intensity = 0.8;
        luz.penumbra = 0.15;
        luz.distance = 200;
        this.arrayLuz.push(luz);
        this.cena.add(luz);
      }

      //TAMANHOS E FLAGS
      this.altura = 40;
      this.frente=0;
      this.tras=0;
      this.dir=0;
      this.esq=0;
    }

    criaCamera(){
      this.camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000);
      var escalar = 1250/window.innerWidth;
      this.camera.position.x = 2*this.altura*escalar;
      this.camera.position.z = this.altura*escalar;
      this.camera.position.y = 30*escalar;
      this.camera.lookAt(this.cena.position);
    }

    onKeyDown(e) {
        'use strict';
        var code = e.keyCode;
        switch(code){
          case 97:
          case 65:
            this.mudaMesh = true;
            break;
          case 49: //1
            this.desliga[0]=true;
            break;
          case 50://2
            this.desliga[1]=true;
            break;
          case 51://3
           this.desliga[2]=true;
            break;
          case 52://4
            this.desliga[3]=true;
            break;
          case 38://ArrowUp
            this.frente=1;
            break;
          case 40://ArrowDown
            this.tras=1;
            break;
          case 37://ArrowLeft
            this.esq=1;
            break;
          case 39://ArrowRight
            this.dir=1;
            break;
          case 71: //G
          case 103: //g
            this.mudouMaterialG = true;
            break;
          case 76: //L
          case 108: //l
            this.mudouMaterialL = true;
            break;
          case 78: //N
            this.mudaSol = true;
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
        this.mudouMaterialG = false;
        this.mudouMaterialL = false;
        this.temp = 0; //controlador do material para o qual se muda ao carregar em "L"
        this.clock = new THREE.Clock();

        this.criaTudo();
        this.criaCamera();
        this.anima();
    }


    constructor() {
      this.inicia();
    }
}
