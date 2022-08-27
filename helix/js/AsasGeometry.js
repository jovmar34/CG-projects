class AsasGeometry extends THREE.Geometry{

  constructor(){
    super();

    //ASA DIREITA
    this.vertices.push(new THREE.Vector3(4, 2.75, -4)); //atras, cima, dir; 0
    this.vertices.push(new THREE.Vector3(-5, 2.75, -15)); //atras, cima, esq; 1
    this.vertices.push(new THREE.Vector3(-3, 2.75, -2)); //atras, baixo, esq; 2
    this.vertices.push(new THREE.Vector3(4, 2.75, -2.5)); //atras, baixo, dir; 3

    this.vertices.push(new THREE.Vector3(4, 2.25, -4)); //pre-frente, cima, dir; 4
    this.vertices.push(new THREE.Vector3(-5, 2.25, -15)); //pre-frente, cima, esq; 5
    this.vertices.push(new THREE.Vector3(-3, 2.25, -2.25)); //pre-frente, baixo, esq; 6
    this.vertices.push(new THREE.Vector3(4, 2.25, -2.25)); //pre-frente, baixo, dir; 7

    // plano de cima
    this.createFace(0,1,2,3);

    // plano de baixo
    this.createFace(7,6,5,4);


    //face 1
    this.createFace(2,1,5,6);

    //face 3
    this.createFace(7,4,0,3);

    //face 2
    this.createFace(6,7,3,2);

    //face 4
    this.createFace(1,0,4,5);

    //ASA ESQUERDA
    this.vertices.push(new THREE.Vector3(4, 2.75, 4)); //8
    this.vertices.push(new THREE.Vector3(-5, 2.75, 15)); //9
    this.vertices.push(new THREE.Vector3(-3, 2.75, 2)); //10
    this.vertices.push(new THREE.Vector3(4, 2.75, 2.5)); //11

    this.vertices.push(new THREE.Vector3(4, 2.25, 4)); //12
    this.vertices.push(new THREE.Vector3(-5, 2.25, 15)); //13
    this.vertices.push(new THREE.Vector3(-3, 2.25, 2.25)); //14
    this.vertices.push(new THREE.Vector3(4, 2.25, 2.25)); //15

    // plano de cima
    this.createFace(11,10,9,8);

    // plano de baixo
    this.createFace(12,13,14,15);


    //face 1
    this.createFace(8,9,13,12);

    //face 3
    this.createFace(8,12,15,11);

    //face 2
    this.createFace(14,15,11,10);

    //face 4
    this.createFace(10,14,13,9);

    this.computeFaceNormals();
  }

  createFace(v0,v1,v2,v3){
    this.faces.push(new THREE.Face3(v0,v1,v2));
    this.faces.push(new THREE.Face3(v0,v2,v3));
  }
}
