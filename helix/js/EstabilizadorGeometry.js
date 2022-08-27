class EstabilizadorGeometry extends THREE.Geometry{
    constructor(){
        super();

        //barbatana cima
        this.vertices.push(new THREE.Vector3(-11, 3, 0.75)); //atras, cima, dir; 0
        this.vertices.push(new THREE.Vector3(-13, 7, 0.25)); //atras, cima, esq; 1
        this.vertices.push(new THREE.Vector3(-15, 3, 0.75)); //atras, baixo, esq; 2
        this.vertices.push(new THREE.Vector3(-15, 7, 0.25)); //atras, baixo, dir; 3

        this.createFace(1,3,2,0);

        this.vertices.push(new THREE.Vector3(-11, 3, -0.75)); //atras, cima, dir; 0
        this.vertices.push(new THREE.Vector3(-13, 7, -0.25)); //atras, cima, esq; 1
        this.vertices.push(new THREE.Vector3(-15, 3, -0.75)); //atras, baixo, esq; 2
        this.vertices.push(new THREE.Vector3(-15, 7,-0.25)); //atras, baixo, dir; 3

        this.createFace(4,6,7,5);

        this.createFace(0,4,5,1);

        this.createFace(2,3,7,6);

        this.createFace(5,7,3,1);

        //bartana esquerda
        this.vertices.push(new THREE.Vector3(-14, 2.25, 1)); 
        this.vertices.push(new THREE.Vector3(-11, 2.25, 1));
        this.vertices.push(new THREE.Vector3(-14, 2.25, 5)); 
        this.vertices.push(new THREE.Vector3(-11, 2.25, 5)); 

        this.createFace(8,10,11,9);

        this.vertices.push(new THREE.Vector3(-14, 1.75, 1)); 
        this.vertices.push(new THREE.Vector3(-11, 1.75, 1));
        this.vertices.push(new THREE.Vector3(-14, 1.75, 5)); 
        this.vertices.push(new THREE.Vector3(-11, 1.75, 5)); 

        this.createFace(13,15,14,12);

        this.createFace(9,11,15,13);
        this.createFace(12,14,10,8);
        
        this.createFace(14,15,11,10);

        //barbatana direita
        this.vertices.push(new THREE.Vector3(-14, 2.25, -1)); 
        this.vertices.push(new THREE.Vector3(-11, 2.25, -1));
        this.vertices.push(new THREE.Vector3(-14, 2.25, -5)); 
        this.vertices.push(new THREE.Vector3(-11, 2.25, -5)); 

        this.createFace(17,19,18,16);

        this.vertices.push(new THREE.Vector3(-14, 1.75, -1)); 
        this.vertices.push(new THREE.Vector3(-11, 1.75, -1));
        this.vertices.push(new THREE.Vector3(-14, 1.75, -5)); 
        this.vertices.push(new THREE.Vector3(-11, 1.75, -5)); 

        this.createFace(20,22,23,21);

        this.createFace(21,23,19,17);
        this.createFace(16,18,22,20);
        this.createFace(18,19,23,22);
     



        this.computeFaceNormals();

    }

    createFace(v0,v1,v2,v3){
        this.faces.push(new THREE.Face3(v0,v1,v2));
        this.faces.push(new THREE.Face3(v0,v2,v3));
    }
}