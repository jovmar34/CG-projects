class Jogo {

  verificaColisoes(){
    'use strict';
    var limiteCaixaHorizontal = this.altura;
    var limiteCaixaVertical = this.altura/2;
    var limiteBolaDtr;
    var limiteBolaEsq;
    var limiteBolaCima;
    var limiteBolaBaixo;
    var i;
    for (i=0;i<this.bolas.length;i++){
      limiteBolaDtr = this.bolas[i].position.x+this.raio;
      limiteBolaEsq = this.bolas[i].position.x-this.raio;
      limiteBolaCima = this.bolas[i].position.z+this.raio;
      limiteBolaBaixo = this.bolas[i].position.z-this.raio;

      if(limiteBolaCima>limiteCaixaVertical || limiteBolaBaixo<(-limiteCaixaVertical)) {
        this.bolas[i].position.z = (limiteCaixaVertical-this.raio)*Math.sign(this.bolas[i].velocidadeZ);
        this.bolas[i].velocidadeZ = -this.bolas[i].velocidadeZ;
        this.bolas[i].eixo.x = this.bolas[i].velocidadeZ;
        this.bolas[i].eixo.z = -this.bolas[i].velocidadeX;
        this.bolas[i].eixo = this.bolas[i].eixo.normalize();
      }

      if(limiteBolaEsq<(-limiteCaixaHorizontal) || limiteBolaDtr>limiteCaixaHorizontal){
        this.bolas[i].position.x = (limiteCaixaHorizontal-this.raio)*Math.sign(this.bolas[i].velocidadeX);
        this.bolas[i].velocidadeX = -this.bolas[i].velocidadeX;
        this.bolas[i].bola.rotation.y = Math.PI - this.bolas[i].bola.rotation.y;
        this.bolas[i].eixo.x = this.bolas[i].velocidadeZ;
        this.bolas[i].eixo.z = -this.bolas[i].velocidadeX;
        this.bolas[i].eixo = this.bolas[i].eixo.normalize();
      }
    }
  }


  verificaColisoesBolas(){
    var i,j;
    for(i=0;i<this.bolas.length;i++){
      for (j=i+1; j<this.bolas.length; j++){
        if (this.condicaoColisao > (((this.bolas[i].position.x-this.bolas[j].position.x)*(this.bolas[i].position.x-this.bolas[j].position.x)) +
        ((this.bolas[i].position.z-this.bolas[j].position.z)*(this.bolas[i].position.z-this.bolas[j].position.z)))){
          var v1Vec = new THREE.Vector3(this.bolas[i].velocidadeX, 0, this.bolas[i].velocidadeZ);
          var v2Vec = new THREE.Vector3(this.bolas[j].velocidadeX, 0, this.bolas[j].velocidadeZ);

          var cloneV1 = v1Vec.clone();
          var difV = cloneV1.sub(v2Vec);
          var cloneC1 = this.bolas[i].position.clone();
          var difC = cloneC1.sub(this.bolas[j].position);
          var produtoInterno = (difV.x*difC.x) + (difV.z*difC.z);
          var denominador = (this.bolas[i].position.x - this.bolas[j].position.x)**2 + (this.bolas[i].position.z - this.bolas[j].position.z)**2
          var multiplica = produtoInterno/denominador;
          var cloneDif = difC.clone();
          var resGrande = cloneDif.multiplyScalar(multiplica);
          var clone2V1 = v1Vec.clone();
          var v1VecFin = clone2V1.sub(resGrande);

          var cloneV2 = v2Vec.clone();
          var difV = cloneV2.sub(v1Vec);
          var cloneC2 = this.bolas[j].position.clone();
          var difC = cloneC2.sub(this.bolas[i].position);
          var difDif = difC.clone();
          var normal = difDif.normalize();
          var produtoInterno = (difV.x*difC.x) + (difV.z*difC.z);
          var denominador = (this.bolas[j].position.x - this.bolas[i].position.x)**2 + (this.bolas[j].position.z - this.bolas[i].position.z)**2
          var multiplica = produtoInterno/denominador;
          var cloneDif = difC.clone();
          var resGrande = cloneDif.multiplyScalar(multiplica);
          var clone2V2 = v2Vec.clone();
          var v2VecFin = clone2V2.sub(resGrande);

          this.bolas[i].velocidadeX = v1VecFin.x;
          this.bolas[i].velocidadeZ = v1VecFin.z;
          this.bolas[i].velocidade = v1VecFin.length();
          this.bolas[i].eixo.x = this.bolas[i].velocidadeZ;
          this.bolas[i].eixo.z = -this.bolas[i].velocidadeX;
          this.bolas[i].eixo = this.bolas[i].eixo.normalize();

          this.bolas[j].velocidadeX = v2VecFin.x;
          this.bolas[j].velocidadeZ = v2VecFin.z;
          this.bolas[j].velocidade = v2VecFin.length();
          this.bolas[j].eixo.x = this.bolas[j].velocidadeZ;
          this.bolas[j].eixo.z = -this.bolas[j].velocidadeX;
          this.bolas[j].eixo = this.bolas[j].eixo.normalize();

          var newPos2 = normal.multiplyScalar(2*this.raio);
          this.bolas[j].position.set(this.bolas[i].position.x + newPos2.x, this.raio , this.bolas[i].position.z + newPos2.z);
        }
      }
    }
  }


  movimenta(){
    'use strict';
    var i;
    var matrizRot;
    for (i=0;i<this.bolas.length;i++){
      this.bolas[i].position.z = this.bolas[i].position.z + this.bolas[i].velocidadeZ*this.delta;
      this.bolas[i].position.x = this.bolas[i].position.x + this.bolas[i].velocidadeX*this.delta;
      matrizRot = new THREE.Matrix4();
      matrizRot.makeRotationAxis(this.bolas[i].eixo, this.bolas[i].velocidade*this.delta);
      matrizRot.multiply(this.bolas[i].bola.matrix);
      this.bolas[i].bola.matrix = matrizRot;
      this.bolas[i].bola.rotation.setFromRotationMatrix(this.bolas[i].bola.matrix);
    }
  }


  render(){
        'use strict';
        this.renderer.render(this.cena, this.camera);
  }


  anima() {
      'use strict';
      this.delta = this.clock.getDelta();
      this.movimenta();
      this.verificaColisoes();
      this.verificaColisoesBolas();

      if(this.mudaAxis) {
        var i;
        for (i=0;i<this.bolas.length;i++) {
          this.bolas[i].axis.visible = !this.bolas[i].axis.visible;
        }
        this.mudaAxis = false;
      }

      if (this.mudaMesh) {
          this.materialBolas.wireframe = !this.materialBolas.wireframe;
          this.materialBolaVerm.wireframe = !this.materialBolaVerm.wireframe;
          this.materialCaixa.wireframe = !this.materialCaixa.wireframe;
          this.materialBase.wireframe = !this.materialBase.wireframe;
          this.mudaMesh=false;
      }

      if(this.mudouTamanho){
        if(this.camera == this.arrayCameras[1]){
          this.renderer.setSize(window.innerWidth, window.innerHeight);

          if (window.innerHeight > 0 && window.innerWidth > 0) {
              var escalar = 1600/window.innerWidth;
              this.camera.aspect = window.innerWidth / window.innerHeight;
              this.camera.position.x = 2*this.altura*escalar;
              this.camera.position.z = this.altura*escalar;
              this.camera.position.y = this.altura*escalar;

          }
        }

        else if(this.camera == this.arrayCameras[2]){
          if (window.innerHeight > 0 && window.innerWidth > 0) {
              var escalar = 1400/window.innerWidth;
              this.camera.aspect = window.innerWidth / window.innerHeight;
              this.camera.position.x = 15*escalar;
              this.camera.position.y = 15*escalar;
          }
        }

        else {
          var largura = this.altura*this.aspect*2;
          var altura = this.altura*2;
          var ratio = window.innerWidth/window.innerHeight;
          if(ratio >= largura/altura){
            this.camera.left = -altura*ratio/2;
            this.camera.right = altura*ratio/2;
            this.camera.top = altura/2;
            this.camera.bottom = -altura/2;
          }
          else{
            this.camera.left = -largura/2;
            this.camera.right = largura/2;
            this.camera.top = largura/(2*ratio);
            this.camera.bottom = -largura/(2*ratio);
          }
        }

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.mudouTamanho = false;
      }
      this.render();
      requestAnimationFrame(this.anima.bind(this));
  }


  onReSize(){
    this.mudouTamanho = true;
  }


  fazBolas(contador,y){
    'use strict';
    if (contador == 0){
      this.materialBolaVerm = new THREE.MeshBasicMaterial({color: 0x0066cc, wireframe:true});
      var x=THREE.Math.randFloat(this.raio-this.altura,this.altura-this.raio);
      var z=THREE.Math.randFloat(this.raio-this.altura/2,this.altura/2-this.raio);
      var bola = new Bola(x,y,z,this.materialBolaVerm,this.raio);
    }

    else{
      var x=THREE.Math.randFloat(this.raio-this.altura,this.altura-this.raio);
      var z=THREE.Math.randFloat(this.raio-this.altura/2,this.altura/2-this.raio);

      var i;
      while (true){
        for (i=0; i<this.posicoesBolas.length; i++){
          if (this.condicaoColisao >= (((x-this.posicoesBolas[i][0])*(x-this.posicoesBolas[i][0])) +  ((z-this.posicoesBolas[i][1])*(z-this.posicoesBolas[i][1])))) {
            x=THREE.Math.randFloat(this.raio-this.altura,this.altura-this.raio);
            z=THREE.Math.randFloat(this.raio-this.altura/2,this.altura/2-this.raio);
            break;
          }
        }
        if (i == this.posicoesBolas.length)
          break;
      }
      var bola = new Bola(x,y,z,this.materialBolas,this.raio);
    }

    var posicao = [x,z];
    this.posicoesBolas.push(posicao);
    this.cena.add(bola);
    this.bolas.push(bola);
  }


  criaTudo() {
    this.materialBolas = new THREE.MeshBasicMaterial({color: 0x66ccff, wireframe:true});
    this.materialCaixa = new THREE.MeshBasicMaterial({color: 0xe6e6e6, wireframe:true});
    this.materialBase  =  new THREE.MeshBasicMaterial({color: 0xd9d9d9, wireframe:true});
    this.cena = new THREE.Scene();
    this.caixa = new Caixa(0,0,0,this.materialCaixa,this.materialBase,this.altura);
    this.cena.add(this.caixa);
    var contador=0;
    var y=this.raio;

    while (contador < 10){
      this.fazBolas(contador,y);
      contador++;
    }
  }


  criaCamera(){
    var ratio = window.innerWidth/window.innerHeight
    var largura = this.altura*this.aspect*2;
    var altura = this.altura*2;
    var camera1;
    if(ratio >= largura/altura){
      camera1 =  new THREE.OrthographicCamera(-altura*ratio/2,altura*ratio/2,altura/2,-altura/2,1,10000);
    }
    else {
      camera1 =  new THREE.OrthographicCamera(-largura/this.aspect,largura/this.aspect,largura/(ratio*this.aspect),-largura/(ratio*this.aspect),1,10000);
    }

    camera1.position.set(0,50,0);
    camera1.lookAt(this.cena.position);

    var camera2 = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000);
    camera2.position.set(this.altura*2, this.altura, this.altura);
    camera2.lookAt(this.cena.position);

    var camera3 = new THREE.PerspectiveCamera(60 ,window.innerWidth/window.innerHeight, 1, 200);
    camera3.position.set(10, 10, 0);
    camera3.lookAt(this.cena.position);
    this.bolas[0].add(camera3);

    this.arrayCameras=[camera1,camera2,camera3];
    this.camera = this.arrayCameras[0];
  }


  onKeyDown(e) {
      'use strict';
      var code = e.keyCode;

      switch(code){
        case 97:
        case 65:
            this.mudaMesh = true;
            break;
        case 69:
          this.mudaAxis = true;
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
  }


  aumentaVelocidade(){
    var i;
    for(i=0;i<10;i++){
      this.bolas[i].velocidadeX *= 1.5;
      this.bolas[i].velocidadeZ *= 1.5;
    }
    setTimeout(this.aumentaVelocidade.bind(this), 30000);
  }


  inicia() {
      this.altura = 20;
      this.aspect = 2;
      this.raio = this.altura*Math.sqrt(5)/20;
      this.bolas = [];
      this.posicoesBolas = [];
      this.condicaoColisao = (this.raio+this.raio)*(this.raio+this.raio);

      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(window.innerWidth,window.innerHeight);
      document.body.appendChild(this.renderer.domElement);

      this.criaTudo();
      this.criaCamera();
      this.anima()
  }
  

  constructor() {
    this.clock = new THREE.Clock();
    this.inicia();
    setTimeout(this.aumentaVelocidade.bind(this), 30000);
  }
}
