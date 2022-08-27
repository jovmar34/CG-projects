class Aviao extends Objecto3D {

constructor(x,y,z,materialFuselagem, materialAsas, materialCockpit, materialJanela, materialHelice) {
    super(x,y,z);

    this.aviao = new THREE.Object3D();

    this.matFuselagem = materialFuselagem;
    this.matAsas = materialAsas;
    this.matCockpit = materialCockpit;
    this.matJanela = materialJanela;
    this.matHelice = materialHelice;

    var fuselagem = new FuselagemGeometry();
    this.meshFuselagem = new THREE.Mesh(fuselagem, this.matFuselagem );
    this.aviao.add(this.meshFuselagem);

    var asa = new AsasGeometry();
    this.meshAsas = new THREE.Mesh(asa, this.matAsas );
    this.aviao.add(this.meshAsas);

    /*var eixo = new THREE.AxisHelper(10);
    var colors = eixo.geometry.attributes.color;

    colors.setXYZ(0,1,0,0);
    colors.setXYZ(1,1,0,0);
    colors.setXYZ(2,0,0,1);
    colors.setXYZ(3,0,0,1);
    colors.setXYZ(4,0,1,0);
    colors.setXYZ(5,0,1,0);

    this.aviao.add(eixo);*/

    var orig = new THREE.Vector3(0,0,0);

    var vetor = new THREE.Vector3(1,0,0);
    this.aviao.add(new THREE.ArrowHelper(vetor, orig, 10, 0xff0000));

    vetor = new THREE.Vector3(0,1,0);
    this.aviao.add(new THREE.ArrowHelper(vetor, orig, 10, 0x0000ff));

    vetor = new THREE.Vector3(0,0,-1);
    this.aviao.add(new THREE.ArrowHelper(vetor, orig, 10, 0x00ff00));

    var cockpit = new CockpitGeometry();
    this.meshCockpit = new THREE.Mesh(cockpit, this.matCockpit );

    var janela = new JanelaGeometry();
    this.meshJanela = new THREE.Mesh(janela, this.matJanela );
    this.meshCockpit.add(this.meshJanela);

    var centro = new THREE.CubeGeometry(0.2,1,1);
    this.meshHelice = new THREE.Mesh(centro, this.matHelice );
    this.meshHelice.position.set(7.1,2,0);

    var pa = new PaGeometry();
    this.meshPa1 = new THREE.Mesh(pa,this.matHelice);
    this.meshHelice.add(this.meshPa1);
    this.meshPa1.rotateX(2*Math.PI/3);

    pa = new PaGeometry();
    this.meshPa2 = new THREE.Mesh(pa,this.matHelice);
    this.meshHelice.add(this.meshPa2);
    this.meshPa2.rotateX(-2*Math.PI/3);

    var pa = new PaGeometry();
    this.meshPa3 = new THREE.Mesh(pa,this.matHelice);
    this.meshHelice.add(this.meshPa3);

    this.meshCockpit.add(this.meshHelice);
    this.aviao.add(this.meshCockpit);

    var estabilizador = new EstabilizadorGeometry();
    this.meshEstabilizador = new THREE.Mesh(estabilizador, this.matAsas );
    this.aviao.add(this.meshEstabilizador);

    this.upVetor = new THREE.Vector3(0,1,0);
    this.frontVector = new THREE.Vector3(1,0,0);

    this.add(this.aviao);


}

  updateMesh(matF,matA,matC,matJ, matH){
    this.meshFuselagem.material = matF;
    this.meshAsas.material = matA;
    this.meshEstabilizador.material = matA;
    this.meshCockpit.material = matC;
    this.meshJanela.material = matJ;
    this.meshHelice.material = matH;
    this.meshPa1.material = matH;
    this.meshPa2.material = matH;
    this.meshPa3.material = matH;
  }

  gira(horizontal, vertical, delta) {
    this.aviao.rotateOnAxis(this.upVetor,horizontal*delta*2);
    this.meshHelice.rotateOnAxis(this.frontVector,delta*10);
    //this.aviao.rotation.y += horizontal*(Math.PI/20);

    this.aviao.rotation.z += vertical*delta*2;
  }
}
