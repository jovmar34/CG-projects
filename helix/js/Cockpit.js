class CockpitGeometry extends THREE.Geometry{
    constructor(){
        super();

        // FRENTE
        this.vertices.push(new THREE.Vector3(0, 5.5, 2.5)); 
        this.vertices.push(new THREE.Vector3(0, 5.5, -2.5)); 
        this.vertices.push(new THREE.Vector3(3, 3, -2.5));
        this.vertices.push(new THREE.Vector3(3, 3, 2.5));    

        this.createFace(3,2,1,0);

        //CIMA
        this.vertices.push(new THREE.Vector3(-2.5, 5.5, 2.5)); 
        this.vertices.push(new THREE.Vector3(-2.5, 5.5, -2.5));

        this.createFace(5,4,0,1);

        //TRAS
        this.vertices.push(new THREE.Vector3(-8, 3, 1.72)); 
        this.vertices.push(new THREE.Vector3(-8, 3, -1.72));

        this.createFace(5,7,6,4);

        //LADO DIREITO
        this.createFace(3,0,4,6);

        //LADO ESQUERDO
        this.createFace(2,7,5,1);

        this.computeFaceNormals();

    }

    createFace(v0,v1,v2,v3){
        this.faces.push(new THREE.Face3(v0,v1,v2));
        this.faces.push(new THREE.Face3(v0,v2,v3));
      }
}