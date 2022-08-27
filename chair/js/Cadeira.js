class Cadeira extends Objecto3D {

    mudaMesh() {
        'use strict'
        this.materialAcento.wireframe = !this.materialAcento.wireframe
        this.materialBase.wireframe = !this.materialBase.wireframe
        this.materialRodas.wireframe = !this.materialRodas.wireframe

    }

    orienta(temp, velocidade, delta) {
        'use strict'
        var i;
        for(i=0; i < 4; i++){
            this.arrayRodas[i].rotation.y = temp+Math.PI/2;
            this.arrayRodas[i].rotation.z += velocidade*delta;
        }
    }

    roda(rot, delta) {
        'use strict'
        this.acento.rotation.y += rot*delta;      // o rot da lhe o lado para que roda
    }

    addAcentoECosta(x,y,z) {
        'use strict';
        this.materialAcento = new THREE.MeshBasicMaterial({color: 0x0f80c9, wireframe:true});
        this.acento = new THREE.Object3D();
        var geometry = new THREE.CubeGeometry(10,2,10);
        var mesh = new THREE.Mesh(geometry,this.materialAcento);
        mesh.position.set(x,y,z);
        this.acento.add(mesh);
        geometry = new THREE.CubeGeometry(10,15,2);
        mesh = new THREE.Mesh(geometry,this.materialAcento);
        mesh.position.set(x,y+6.5,z-6);
        this.acento.add(mesh);
        this.add(this.acento);
    }

    addPerna(x,y,z) {
        'use strict';
        this.materialBase = new THREE.MeshBasicMaterial({color: 0xDCDCDC, wireframe:true});
        var geometry = new THREE.CubeGeometry(2,10,2);
        var mesh = new THREE.Mesh(geometry,this.materialBase);
        mesh.position.set(x,y,z);
        this.add(mesh);
    }

    addPe(x,y,z,rot) {
        'use strict';
        var geometry = new THREE.CubeGeometry(1,1,10);
        var mesh = new THREE.Mesh(geometry,this.materialBase);
        mesh.position.set(x,y,z);
        mesh.rotation.y = rot;
        this.add(mesh);
    }

    addRodas(x,y,z,rot) {
        'use strict';
        this.materialRodas = new THREE.MeshBasicMaterial({color: 0x696969, wireframe:true});
        var geometry = new THREE.TorusGeometry(1,0.5,6,50);
        var mesh = new THREE.Mesh(geometry,this.materialRodas);
        mesh.position.set(x,y,z);
        mesh.rotation.y = rot;

        this.arrayRodas.push(mesh);

        this.add(mesh);

        geometry = new THREE.TorusGeometry(1,0.5,6,50);
        mesh = new THREE.Mesh(geometry,this.materialRodas);
        mesh.position.set(-x,y,z);
        mesh.rotation.y = rot;

        this.arrayRodas.push(mesh);

        this.add(mesh);

        geometry = new THREE.TorusGeometry(1,0.5,6,50);
        mesh = new THREE.Mesh(geometry,this.materialRodas);
        mesh.position.set(x,y,-z);
        mesh.rotation.y = rot;

        this.arrayRodas.push(mesh);

        this.add(mesh);

        geometry = new THREE.TorusGeometry(1,0.5,6,50);
        mesh = new THREE.Mesh(geometry,this.materialRodas);
        mesh.position.set(-x,y,-z);
        mesh.rotation.y = rot;

        this.arrayRodas.push(mesh);

        this.add(mesh);
    }

    constructor(x,y,z) {
        'use strict'
        super(x,y,z);
        //this.addCostaseAcento(0, 6.5, -4);
        this.arrayRodas = [];
        this.addAcentoECosta(0, 0, 2);
        this.addPerna(0, -6, 0);
        this.addPe(0, -11.5, 0, 0.75);
        this.addPe(0, -11.5, 0, -0.75);
        this.addRodas(3.75, -11.5, 4, Math.PI/2);
    }
}
