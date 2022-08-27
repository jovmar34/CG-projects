class Tabuleiro extends Objecto3D {
    constructor(x,y,z,chessMat,material) {
        super(x,y,z);
        var geometry = new THREE.PlaneGeometry(16,16);
        var mesh = new THREE.Mesh(geometry, chessMat);
        mesh.rotation.x = -Math.PI/2;
        this.meshCima = mesh;
        this.add(mesh);
  
        geometry = new THREE.CubeGeometry(16,1,16);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.51;
        this.meshBaixo = mesh;
        this.add(mesh); 
        
        
    }

    updateMesh(materialCima, materialBaixo){
        this.meshCima.material = materialCima;
        this.meshBaixo.material = materialBaixo;
    }
}