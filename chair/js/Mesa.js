class Mesa extends Objecto3D{

  mudaMesh() {
    this.materialPernas.wireframe = !this.materialPernas.wireframe;
    this.materialTampo.wireframe = !this.materialTampo.wireframe;
  }

  criaTampo(){
    'use strict';
    this.materialTampo = new THREE.MeshBasicMaterial({color:0xe59866, wireframe:true});
    var retangulo = new THREE.CubeGeometry(47, 2, 30);
    var tampo = new THREE.Mesh(retangulo, this.materialTampo);
    tampo.position.set(0, 0, 0);
    this.add(tampo);
  }

  criaPerna(nPernas){
    'use strict';
    var cilindro = new THREE.CylinderGeometry(1.7, 1.7, 18, 14);
    var perna = new THREE.Mesh(cilindro, this.materialPernas);
    if(nPernas==2)
      perna.position.set(-17, -10, -10);
    else if(nPernas==4)
      perna.position.set(17, -10, -10);
    else if(nPernas==1)
      perna.position.set(-17, -10, 10);
    else if(nPernas==3)
      perna.position.set(17, -10, 10);
    this.add(perna);
  }

  constructor(x,y,z){
    super(x,y,z);
    this.criaTampo();
    this.materialPernas = new THREE.MeshBasicMaterial({color:0xbfbfbf, wireframe:true});
    this.criaPerna(1);  //esquerda atras
    this.criaPerna(2);  //direita atras
    this.criaPerna(3);  //esquerda frente
    this.criaPerna(4);  //direita frente
  }
}
