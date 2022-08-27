class Candeeiro extends Objecto3D{

  mudaMesh() {
    this.materialAbajur.wireframe = !this.materialAbajur.wireframe;
    this.materialPe.wireframe = !this.materialPe.wireframe;
    this.materialBase.wireframe = !this.materialBase.wireframe;
  }


  criaAbajur(){
    this.materialAbajur = new THREE.MeshBasicMaterial( {color: 0xffd966, wireframe: true} );
    var cone = new THREE.ConeGeometry(4,9,36,5,true,0,6.3);//coneGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    var abajur = new THREE.Mesh( cone, this.materialAbajur );
    abajur.position.set(-13.5,16,0);
    this.add(abajur);
  }

  criaPe(){
    this.materialPe = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, wireframe: true} );
    var cilindro = new THREE.CylinderGeometry(0.25,0.25,38,64,1,false,0,6.3);//CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    var pe = new THREE.Mesh( cilindro, this.materialPe );
    pe.position.set(0,0,0);
    this.add(pe);
    var cilindro = new THREE.CylinderGeometry(0.15,0.15,20,64,1,false,0,6.3);//CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    var pe = new THREE.Mesh( cilindro, this.materialPe );
    pe.position.set(-4,17,0);
    pe.rotateZ(3.14/2.5);
    this.add(pe);
  }

  criaBase(){
    this.materialBase = new THREE.MeshBasicMaterial( {color: 0x808080, wireframe: true} );
    var esfera = new THREE.SphereGeometry(4,32,32,6,6.3,6,1.3);//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
    var base = new THREE.Mesh( esfera, this.materialBase );
    base.position.set(0,-23,0);
    this.add(base);
  }

  constructor(x,y,z){
    super(x,y,z);
    this.criaAbajur();
    this.criaPe();
    this.criaBase();
  }
}
