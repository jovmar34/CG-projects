class Bola extends Objecto3D{
  constructor(x,y,z,material) {
    super(x,y,0);
    this.angulo = 0;
    this.x = x;
    this.z = z;
    this.material = material;
    var esfera = new THREE.SphereGeometry(1.25,20,20);//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
    this.bola = new THREE.Mesh(esfera, this.material);
    this.add(this.bola);
    this.upVector = new THREE.Vector3(0,1,0);
    this.outVector = new THREE.Vector3(1,0,0);
    this.add(new THREE.AxisHelper(5));
    this.mesh=this.bola;
  }

  movimenta(delta,velocidade) {
    this.angulo += delta*velocidade;
    this.position.x = this.x*Math.cos(this.angulo);
    this.position.z = this.z*Math.sin(this.angulo);
    this.rotateOnAxis(this.upVector,-delta*velocidade);
    this.bola.rotateOnAxis(this.outVector,delta*velocidade);
  }

  updateMesh(material){
    this.mesh.material = material;
  }

  reset(){
    this.position.set(6,1.25,0);
    this.rotateOnAxis(this.upVector,this.angulo);
    this.bola.rotateOnAxis(this.outVector,-this.angulo);
    this.angulo = 0;
  }
}
