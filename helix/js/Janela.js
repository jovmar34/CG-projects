class JanelaGeometry extends THREE.Geometry{
    constructor(){
        super();

        //FRENTE
        this.vertices.push(new THREE.Vector3(0.25, 5.45, 2.3));
        this.vertices.push(new THREE.Vector3(0.25, 5.45, -2.3));
        this.vertices.push(new THREE.Vector3(2.9, 3.14, -2.3));
        this.vertices.push(new THREE.Vector3(2.9, 3.14, 2.3));

        this.createFace(3,2,1,0);

        //JANELA ESQUERDA
        this.vertices.push(new THREE.Vector3(0.05, 5.25, -2.52));
        this.vertices.push(new THREE.Vector3(-2.5, 5.25, -2.5));
        this.vertices.push(new THREE.Vector3(-7.2, 3.25, -1.9));
        this.vertices.push(new THREE.Vector3(2.3, 3.25, -2.5));

        this.createFace(7,6,5,4);

        //JANELA DIREITA
        this.vertices.push(new THREE.Vector3(0.05, 5.25, 2.52));
        this.vertices.push(new THREE.Vector3(-2.5, 5.25, 2.5));
        this.vertices.push(new THREE.Vector3(-7.2, 3.25, 1.9));
        this.vertices.push(new THREE.Vector3(2.3, 3.25, 2.5));

        this.createFace(11,8,9,10);

        this.computeFaceNormals();
    }

    createFace(v0,v1,v2,v3){
        this.faces.push(new THREE.Face3(v0,v1,v2));
        this.faces.push(new THREE.Face3(v0,v2,v3));
      }
}
