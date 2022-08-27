class HeliceGeometry extends THREE.Geometry{
    constructor(){
        super();
        //CENTRO
        this.vertices.push(new THREE.Vector3(7, 2.5 , 0.5));
        this.vertices.push(new THREE.Vector3(7, 2.5 , -0.5));
        this.vertices.push(new THREE.Vector3(7, 1.5 , 0.5));
        this.vertices.push(new THREE.Vector3(7, 1.5 , -0.5));
        this.createFace(1,0,2,3);
        
        this.computeFaceNormals();

    }

    createFace(v0,v1,v2,v3){
        this.faces.push(new THREE.Face3(v0,v1,v2));
        this.faces.push(new THREE.Face3(v0,v2,v3));
    }
}