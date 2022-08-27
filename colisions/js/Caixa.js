class Caixa extends Objecto3D{
  addLargura(altura){
    var geometry = new THREE.CubeGeometry(altura*2,altura*Math.sqrt(5)/10,0.5);
    var plane = new THREE.Mesh(geometry,this.material);
    plane.position.set(0,altura*Math.sqrt(5)/20,-altura/2-0.25);
    this.add(plane);

    plane = new THREE.Mesh(geometry,this.material);
    plane.position.set(0,altura*Math.sqrt(5)/20,altura/2+0.25);
    this.add(plane);
  }

  addProfundidade(altura){
    var geometry = new THREE.CubeGeometry(0.5,altura*Math.sqrt(5)/10,altura+1);
    var plane = new THREE.Mesh(geometry,this.material);
    plane.position.set(-altura-0.25,altura*Math.sqrt(5)/20,0);
    this.add(plane);

    plane = new THREE.Mesh(geometry,this.material);
    plane.position.set(altura+0.25,altura*Math.sqrt(5)/20,0);
    this.add(plane);
  }

  constructor(x,y,z,material,materialBase, altura) {
      super(x,y,z);
      this.material = material;
      var geometry = new THREE.CubeGeometry(altura*2+1,1,altura+1);
      var base = new THREE.Mesh(geometry,materialBase);
      base.position.y = -0.5;
      this.add(base);

      this.addLargura(altura);
      this.addProfundidade(altura);
  }
}
