class CuboRubik extends Objecto3D{
    constructor(x,y,z,materiais){
        super(x,y,z);
        this.planos = [];
        var posicoes=[[0,0,0],[0,3,0],[1.5,1.5,0],[-1.5,1.5,0],[0,1.5,1.5],[0,1.5,-1.5]];
        var i;
        for(i=0;i<6;i++){
            var plano = new THREE.PlaneGeometry(3,3);
            var mesh = new THREE.Mesh(plano, materiais[i]);
            mesh.position.set(posicoes[i][0],posicoes[i][1],posicoes[i][2]);
            this.planos.push(mesh);
            this.planos[i].mesh = mesh;
        }

        this.planos[0].rotateX(Math.PI/2);
        this.planos[1].rotateX(-Math.PI/2);
        this.planos[2].rotateY(Math.PI/2);
        this.planos[3].rotateY(-Math.PI/2);
        this.planos[5].rotateY(Math.PI);

        for(i=0;i<6;i++){
            this.add(this.planos[i]);
        }
        this.add(mesh);
    }
    updateMesh(array){
        var i;
        console.log(array);
        for(i=0; i<6; i++){
            this.planos[i].mesh.material = array[i];
        }
    }
}
 