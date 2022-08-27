class FuselagemGeometry extends THREE.Geometry{

  constructor(){
    super();
    this.vertices.push(new THREE.Vector3(-15, 3, 1)); //atras, cima, dir; 0
    this.vertices.push(new THREE.Vector3(-15, 3, -1)); //atras, cima, esq; 1
    this.vertices.push(new THREE.Vector3(-14, 1, -1)); //atras, baixo, esq; 2
    this.vertices.push(new THREE.Vector3(-14, 1, 1)); //atras, baixo, dir; 3

    this.vertices.push(new THREE.Vector3(0, 3, 2.5)); //meio, cima, dir; 4
    this.vertices.push(new THREE.Vector3(0, 3, -2.5)); //meio, cima, esq; 5
    this.vertices.push(new THREE.Vector3(2, -2, -1.5)); //meio, baixo, esq; 6
    this.vertices.push(new THREE.Vector3(2, -2, 1.5)); //meio, baixo, dir; 7

    this.vertices.push(new THREE.Vector3(5, 3, 2.5)); //pre-frente, cima, dir; 8
    this.vertices.push(new THREE.Vector3(5, 3, -2.5)); //pre-frente, cima, esq; 9
    this.vertices.push(new THREE.Vector3(4, -1.25, -1.25)); //pre-frente, baixo, esq; 10
    this.vertices.push(new THREE.Vector3(4, -1.25, 1.25)); //pre-frente, baixo, dir; 11

    this.vertices.push(new THREE.Vector3(7, 2, 1.5)); //frente, cima, dir; 12
    this.vertices.push(new THREE.Vector3(7, 2, -1.5)); //frente, cima, esq; 13
    this.vertices.push(new THREE.Vector3(6, -0.25, -1)); //frente, baixo, esq; 14
    this.vertices.push(new THREE.Vector3(6, -0.25, 1)); //frente, baixo, dir; 15

    // parte tras
    this.createFace(0,1,2,3);

    //parte frente
    this.createFace(15,14,13,12);


    //parte cima
    this.createFace(0,4,5,1);
    this.createFace(4,8,9,5);
    this.createFace(8,12,13,9);

    //parte baixo
    this.createFace(3,2,6,7);
    this.createFace(7,6,10,11);
    this.createFace(11,10,14,15);


    //parte esquerda (1,2,5,6,9,10,13,14)
    this.createFace(5,6,2,1);
    this.createFace(9,10,6,5);
    this.createFace(13,14,10,9);

    //parte direita (0,3,4,7,8,11,12,15)
    this.createFace(4,0,3,7);
    this.createFace(8,4,7,11);
    this.createFace(12,8,11,15);


    this.computeFaceNormals();
  }

  createFace(v0,v1,v2,v3){
    this.faces.push(new THREE.Face3(v0,v1,v2));
    this.faces.push(new THREE.Face3(v0,v2,v3));
  }
}
