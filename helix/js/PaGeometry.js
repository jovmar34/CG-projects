class PaGeometry extends THREE.Geometry{
    constructor(){
        super();
        this.vertices.push(new THREE.Vector3(0, 0 , 0));
        this.vertices.push(new THREE.Vector3(0, 2 , 0.3));
        this.vertices.push(new THREE.Vector3(0, 3, 0));
        this.vertices.push(new THREE.Vector3(0, 2 , -0.3));

        this.createFace(0,3,2,1);
        this.computeFaceNormals();
    }
    createFace(v0,v1,v2,v3){
        this.faces.push(new THREE.Face3(v0,v1,v2));
        this.faces.push(new THREE.Face3(v0,v2,v3));
    }
}