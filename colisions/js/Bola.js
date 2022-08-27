class Bola extends Objecto3D{
  constructor(x,y,z,material,parede) {
    super(x,y,z);
    this.material = material;
    this.velocidade = THREE.Math.randFloat(2,10);
    var anguloEixos = THREE.Math.randFloat(0, 2*Math.PI);
    this.velocidadeX = this.velocidade*Math.cos(anguloEixos);
    this.velocidadeZ = this.velocidade*Math.sin(anguloEixos);
    this.eixo = new THREE.Vector3(this.velocidadeZ, 0, -this.velocidadeX).normalize();
    var esfera = new THREE.SphereGeometry(parede,20,20);//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
    this.bola = new THREE.Mesh(esfera, this.material);
    this.axis = new THREE.AxisHelper(5);
    this.axis.visible = false;
    this.bola.rotation.y = Math.PI - anguloEixos;
    this.bola.add(this.axis);
    this.add(this.bola);
  }
}
