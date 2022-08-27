class Holofote extends Objecto3D{
    constructor(posicao,rotacaoX,rotacaoZ,materialBase, materialLampada){
        super();
        
        var suporte = new  THREE.ConeGeometry(2,2,11,11,true,0,6.3);  
        this.meshSuporte = new THREE.Mesh(suporte, materialBase );
        this.meshSuporte.rotateZ(Math.PI);
        this.add(this.meshSuporte);

        var base = new THREE.SphereGeometry(2,32,32,0,6.3,0,0.7);  
        this.meshBase = new THREE.Mesh(base, materialBase ); 
        this.meshBase.position.y=this.meshSuporte.position.y-3;     
        this.add(this.meshBase);

        var baselampada = new THREE.ConeGeometry(0.75,2,11,11,true,0,6.3);
        this.meshBaseLampada = new THREE.Mesh(baselampada, materialLampada );
        
        var lampada = new  THREE.SphereGeometry(0.75,32,32,0,6.3,0,1.5);
        this.meshLampada = new THREE.Mesh(lampada, materialLampada );  
        this.meshBaseLampada.add(this.meshLampada);     
        this.meshBaseLampada.rotateZ(Math.PI);  
        this.meshLampada.position.y = this.meshBaseLampada.position.y-1;
        this.meshLampada.rotateZ(Math.PI);  
        this.add(this.meshBaseLampada);  
           
        this.meshBaseLampada.rotateZ(Math.PI);  
        this.meshSuporte.add(this.meshBaseLampada);
              
        this.position.set(posicao[0],posicao[1],posicao[2]);

        this.meshSuporte.rotateX(rotacaoX);
        this.meshSuporte.rotateZ(rotacaoZ);

    }

    updateMesh(matB,matL){
        console.log("updating");
        this.meshSuporte.material = matB;
        this.meshBase.material = matB;
        this.meshBaseLampada.material = matL;
        this.meshLampada.material = matL;    
      }
}