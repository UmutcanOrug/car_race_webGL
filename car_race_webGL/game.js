window.onload = function init() {
    const gl = setupWebGL();
    const hier = new Hierarchy(gl);
    start(hier.gameObjects);
    render(gl, hier.gameObjects);
  };

  class Script {
    constructor() {
      this.gameObject = null;
      this.gameObjects = {};
    }
    start() {}
    update() {}
    onCollision() {}
  }

  
  
  var keyA = false;
  
  var keyD = false;
 
    const eye = sphericalEye(100 , 25 * (Math.PI / 180) , 50 * (Math.PI / 180) );
    const at = vec3(0.0, 0.0, 0.0);
    const up = vec3(0.0, 1.0, 0.0);

    class lineScript extends Script {
        start(){
            this.initialTranslation = this.gameObject.transform.translation;
        }
        update(){
            
            const changeMatrix = translate(0, 0, 0.7);
            this.gameObject.transform.translation = mult(
                changeMatrix ,
                this.gameObject.transform.translation
              );
          
        }
        onCollision(){

        }
        
    }
    

    class ourCarScript extends Script {
      start(){
          this.initialTranslation = this.gameObject.transform.translation;
      }
      update(){
        const changeMatrix = translate(-0.0, 0, 0.0);
          this.gameObject.transform.translation = mult(
              changeMatrix ,
              this.gameObject.transform.translation);

        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        
        function onKeyDown(event){
          var keyCode = event.keyCode;
          switch(keyCode){
            case 68:  //d
                keyD = true;
            break;
        
            case 65:  //a
                keyA = true;
            break;
          }
        }
        function onKeyUp(event){
          var keyCode = event.keyCode;
          switch(keyCode){
            case 68:  //d
                keyD = false;
            break;

            case 65: //a
                keyA = false;
            break;
          }
        }
        if (this.gameObject.transform.translation[0][3] > 11){
          keyD = false;
          
        }
        if (this.gameObject.transform.translation[0][3] < -11){
          keyA = false;
          
        }


          if (keyD == true) {
            const changeMatrix = translate(0.4, 0, 0);
          this.gameObject.transform.translation = mult(
              changeMatrix ,
              this.gameObject.transform.translation
            );
          }
          
          if (keyA == true) {
              const changeMatrix = translate(-0.4, 0, 0);
              this.gameObject.transform.translation = mult(
              changeMatrix ,
              this.gameObject.transform.translation
            );
          }

          
      }
      onCollision(){

      }
      
  }

  class carScript extends Script {
    start(){
        this.initialTranslation = this.gameObject.transform.translation;
    }
    update(){
      
      
      
      const randspeed = Math.random()*2 + 4 ;
        const changeMatrix3 = translate(0, 0, randspeed);
        this.gameObject.transform.translation = mult(
            changeMatrix3 ,
            this.gameObject.transform.translation
          );

        if (this.gameObject.transform.translation[2][3] > 100){
          var randx = Math.random()*20 - 10;
          const changeMatrix2 = translate(randx, 5, Math.random()*(-600) - 1000);
          this.gameObject.transform.translation = changeMatrix2 ;
              
            
            
        } 
      
    }
    onCollision(other){
      if (other.name === "ourCar") {
        delete this.gameObjects["ourCar"];
        myFunction();
      }
    }
    
}

class buildingScript extends Script {
  start(){
      this.initialTranslation = this.gameObject.transform.translation;
  }
  update(){
    
      const changeMatrix3 = translate(0, 0, 9);
      this.gameObject.transform.translation = mult(
          changeMatrix3 ,
          this.gameObject.transform.translation
        );

      if (this.gameObject.transform.translation[2][3] > 100){
        var randxx = Math.random()*30 + 60;
        const changeMatrix2 = translate(randxx, 0, -1000);
        this.gameObject.transform.translation = changeMatrix2 ;
            
          
          
      } 
    
  }
  onCollision(){
    
  }
  
}

class buildingLeftScript extends Script {
  start(){
      this.initialTranslation = this.gameObject.transform.translation;
  }
  update(){
    
      const changeMatrix3 = translate(0, 0, 9);
      this.gameObject.transform.translation = mult(
          changeMatrix3 ,
          this.gameObject.transform.translation
        );

      if (this.gameObject.transform.translation[2][3] > 100){
        var randxx = Math.random()*(-30) - 40;
        const changeMatrix2 = translate(randxx, 0, -1000);
        this.gameObject.transform.translation = changeMatrix2 ;
            
          
          
      } 
    
  }
  onCollision(){
    
  }
  
}



  //Scriptler eksik
  
  class Hierarchy {
    constructor(gl) {
      const gameObjects = {};
      this.gameObjects = gameObjects;
      gameObjects["mainroad"] = new road(
        "mainroad",
        gl,
        vec4(0.14, 0.14, 0.14, 1.0),
        new Transform({ scaling: scalem(28 , 1, 2000) ,translation: translate(0, 3.5, -750) })
      );
      gameObjects["main"] = new road(
        "main",
        gl,
        vec4(0.3, 0.4, 0, 1.0),
        new Transform({ scaling: scalem(2000 , 0, 3000) ,translation: translate(0, 3, -1000) })
      );

      

      gameObjects["ourCar"] = new road(
        "ourCar",
        gl,
        vec4(0.5 , 1 , 0.7  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( 0 , 5 , 60)
        })
        
      );
      const script = new ourCarScript();
      script.gameObject = gameObjects["ourCar"];
      script.gameObjects = this.gameObjects;
      gameObjects["ourCar"].component.script = script;

      gameObjects["1stCar"] = new road(
        "1stCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -700)
        })
        
      );

      const script1 = new carScript();
      script1.gameObject = gameObjects["1stCar"];
      script1.gameObjects = this.gameObjects;
      gameObjects["1stCar"].component.script = script1;

      gameObjects["2ndCar"] = new road(
        "2ndCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9, 5 , -1200)
        })
        
      );

      const script2 = new carScript();
      script2.gameObject = gameObjects["2ndCar"];
      script2.gameObjects = this.gameObjects;
      gameObjects["2ndCar"].component.script = script2;

      gameObjects["3rdCar"] = new road(
        "3rdCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -900)
        })
        
      );

      const script3 = new carScript();
      script3.gameObject = gameObjects["3rdCar"];
      script3.gameObjects = this.gameObjects;
      gameObjects["3rdCar"].component.script = script3;

      gameObjects["4stCar"] = new road(
        "4stCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -1400)
        })
        
      );

      const script4 = new carScript();
      script4.gameObject = gameObjects["4stCar"];
      script4.gameObjects = this.gameObjects;
      gameObjects["4stCar"].component.script = script4;

      gameObjects["5stCar"] = new road(
        "5stCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -1500)
        })
        
      );

      const script5 = new carScript();
      script5.gameObject = gameObjects["5stCar"];
      script5.gameObjects = this.gameObjects;
      gameObjects["5stCar"].component.script = script5;

      gameObjects["6stCar"] = new road(
        "6stCar",
        gl,
        vec4(1, 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -700)
        })
        
      );

      const script16 = new carScript();
      script16.gameObject = gameObjects["6stCar"];
      script16.gameObjects = this.gameObjects;
      gameObjects["6stCar"].component.script = script16;

      gameObjects["7stCar"] = new road(
        "7stCar",
        gl,
        vec4(1 , 0 , 0.3  , 1.0),
        new Transform({  scaling: scalem(2 , 1.5 , 3.5) , translation: translate( Math.random()*18 - 9 , 5 , -700)
        })
        
      );

      const script17 = new carScript();
      script17.gameObject = gameObjects["7stCar"];
      script17.gameObjects = this.gameObjects;
      gameObjects["7stCar"].component.script = script17;

      gameObjects["1stbuilding"] = new road(
        "1stbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 50 , 40) , translation: translate( 40, -5 , -100)
        })
        
      );

      const script6 = new buildingScript();
      script6.gameObject = gameObjects["1stbuilding"];
      script6.gameObjects = this.gameObjects;
      gameObjects["1stbuilding"].component.script = script6;

      gameObjects["2stbuilding"] = new road(
        "2stbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 70 , 40) , translation: translate( 50, -5 , -350)
        })
        
      );

      const script7 = new buildingScript();
      script7.gameObject = gameObjects["2stbuilding"];
      script7.gameObjects = this.gameObjects;
      gameObjects["2stbuilding"].component.script = script7;
      
      gameObjects["3stbuilding"] = new road(
        "3stbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( 60, -5 , -600)
        })
        
      );

      const script8 = new buildingScript();
      script8.gameObject = gameObjects["3stbuilding"];
      script8.gameObjects = this.gameObjects;
      gameObjects["3stbuilding"].component.script = script8;

      gameObjects["4stbuilding"] = new road(
        "4stbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( 70, -5 , -850)
        })
        
      );

      const script9 = new buildingScript();
      script9.gameObject = gameObjects["4stbuilding"];
      script9.gameObjects = this.gameObjects;
      gameObjects["4stbuilding"].component.script = script9; 

      gameObjects["1stLeftbuilding"] = new road(
        "1stLeftbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( -70, -5 , -100)
        })
        
      );

      const script11 = new buildingLeftScript();
      script11.gameObject = gameObjects["1stLeftbuilding"];
      script11.gameObjects = this.gameObjects;
      gameObjects["1stLeftbuilding"].component.script = script11; 

      gameObjects["2stLeftbuilding"] = new road(
        "2stLeftbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( -70, -5 , -350)
        })
        
      );

      const script12 = new buildingLeftScript();
      script12.gameObject = gameObjects["2stLeftbuilding"];
      script12.gameObjects = this.gameObjects;
      gameObjects["2stLeftbuilding"].component.script = script12; 

      gameObjects["3stLeftbuilding"] = new road(
        "3stLeftbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( -70, -5 , -600)
        })
        
      );

      const script13 = new buildingLeftScript();
      script13.gameObject = gameObjects["3stLeftbuilding"];
      script13.gameObjects = this.gameObjects;
      gameObjects["3stLeftbuilding"].component.script = script13; 

      gameObjects["4stLeftbuilding"] = new road(
        "4stLeftbuilding",
        gl,
        vec4(0.4 , 0.5 , 0.5  , 1.0),
        new Transform({  scaling: scalem(40 , 60 , 40) , translation: translate( -70, -5 , -850)
        })
        
      );

      const script14 = new buildingLeftScript();
      script14.gameObject = gameObjects["4stLeftbuilding"];
      script14.gameObjects = this.gameObjects;
      gameObjects["4stLeftbuilding"].component.script = script14; 
    }
  }


  class GameTime {
    static deltaTime = 0;
    static timestamp = -1;
  
    static updateTimestamp(timestamp) {
      if (GameTime.timestamp < 0) GameTime.timestamp = timestamp;
      GameTime.deltaTime = timestamp - GameTime.timestamp;
      GameTime.timestamp = timestamp;
    }
  }

  class Transform {
    constructor({
      scaling = mat4(),
      rotation = mat4(),
      translation = mat4()
    } = {}) {
      this.scaling = scaling;
      this.rotation = rotation;
      this.translation = translation;
    }
    modelMatrix() {
      return mult(this.translation, mult(this.rotation, this.scaling));
    }
  }

  class NaiveCollider {
    constructor(vertices) {
      this.vertices = vertices;
      this.gameObject = null; // make sure this is assigned after instantiation
    }
  
    detectsCollisionWith(other) {
      // iterate over vertices of the other, if any vertice is inside
      // then we have a collision
      const otherVertices = other.transformedVertices();
      const inverseTransform = inverse4(this.gameObject.transform.modelMatrix());
  
      for (const otherVertice of otherVertices) {
        if (this.includes(mult(inverseTransform, otherVertice))) return true;
      }
      return false;
    }
  
    transformedVertices() {
      const vertices = [];
      const modelMatrix = this.gameObject.transform.modelMatrix();
      for (const vertice of this.vertices) {
        vertices.push(mult(modelMatrix, vertice));
      }
      return vertices;
    }
  }
  
  class NaiveBoxCollider extends NaiveCollider {
    constructor(vertices) {
      super(vertices);
    }
    includes(v) {
      const x = v[0];
      const y = v[1];
      const z = v[2];
      if (-0.5 <= x && x <= 0.5 && 0 <= y && y <= 1 && -0.5 <= z && z <= 0.5) {
        return true;
      }
      return false;
    }
  }

  //Carpisma kontrolü

  class gameObject {
    constructor(
      name,
      gl,
      pointsArray,
      colorsArray,
      transform,
      collider = undefined,
      script = undefined,
      vertexShader = "",
      fragmentShader = ""
    ) {
      //// WebGL rendering context
      this.gl = gl;
  
      //// name of this object. this must be unique.
      this.name = name;
  
      //// components go here
      this.component = {};
  
      //// the script component
      this.component.script = script;
  
      //// current object transform
      this.transform = transform;
  
      //// camera settings
      this.viewMatrix = mat4();
      this.projectionMatrix = mat4();
  
      //// collisions
      if (collider) {
        this.collider = collider;
        this.collider.gameObject = this;
        this.collidesWith = [];
      }
  
      //// shaders and the program object
      if (vertexShader === "") this.createVertexShader();
      else this.vertexShader = vertexShader;
  
      if (fragmentShader === "") this.createFragmentShader();
      else this.fragmentShader = fragmentShader;
  
      this.program = this.createProgram();
  
      //// buffers and gpu data
      this.colorsArray = colorsArray;
      this.pointsArray = pointsArray;
      this.initAttributeBuffers();
    }
  
    _compileShader(type, src) {
      const shader = this.gl.createShader(type, src);
      this.gl.shaderSource(shader, src);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error(this.gl.getShaderInfoLog(shader));
      }
      return shader;
    }
  
    //// prepares a program object from shaders
    createProgram() {
      const vertexShader = this._compileShader(
        this.gl.VERTEX_SHADER,
        this.vertexShader
      );
      const fragmentShader = this._compileShader(
        this.gl.FRAGMENT_SHADER,
        this.fragmentShader
      );
  
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, vertexShader);
      this.gl.attachShader(this.program, fragmentShader);
      this.gl.linkProgram(this.program);
      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        console.error(this.gl.getProgramInfoLog(this.program));
      }
      return this.program;
    }
  
    detectsCollisionWith(other) {
      if (!this.collider) return false;
      if (!other.collider) return false;
      if (this.collider.detectsCollisionWith(other.collider)) return true;
  
      return false;
    }
  
    createVertexShader() {
      this.vertexShader = ` 
        attribute  vec4 vPosition;
        attribute  vec4 vColor;
        varying vec4 fColor;
  
        uniform mat4 modelViewProjectionMatrix;
  
        void main()
        {
          gl_Position = modelViewProjectionMatrix * vPosition;
          fColor = vColor;
        }
      `;
      return this.vertexShader;
    }
  
    createFragmentShader() {
      this.fragmentShader = `
        #ifdef GL_ES
        precision mediump float;
        #endif
  
  
        varying vec4 fColor;
  
        void
        main()
        {
            gl_FragColor = fColor;
        }
      `;
      return this.fragmentShader;
    }
  
    initAttributeBuffers() {
      //// color attribute
      this.cBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        flatten(this.colorsArray),
        this.gl.STATIC_DRAW
      );
      this.vColor = this.gl.getAttribLocation(this.program, "vColor");
  
      //// position attribute
      this.vBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        flatten(this.pointsArray),
        this.gl.STATIC_DRAW
      );
      this.vPosition = this.gl.getAttribLocation(this.program, "vPosition");
  
      //// Uniform Locations
      this.modelViewProjectionMatrixLoc = this.gl.getUniformLocation(
        this.program,
        "modelViewProjectionMatrix"
      );
    }
  
    draw() {
      //// switch to this objects program
      this.gl.useProgram(this.program);
  
      //// color attribute
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cBuffer);
      this.gl.vertexAttribPointer(this.vColor, 4, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.vColor);
  
      //// position attribute
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
      this.gl.vertexAttribPointer(this.vPosition, 4, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.vPosition);
  
      //// compute modelViewProjectionMatrix
      const modelViewProjectionMatrix = mult(
        this.projectionMatrix,
        mult(this.viewMatrix, this.transform.modelMatrix())
      );
      //// gpu modelViewProjectionMatrix
      this.gl.uniformMatrix4fv(
        this.modelViewProjectionMatrixLoc,
        false,
        flatten(modelViewProjectionMatrix)
      );
  
      //// draw
      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.pointsArray.length);
  
      //// disable vaa's
      this.gl.disableVertexAttribArray(this.vColor);
      this.gl.disableVertexAttribArray(this.vPosition);
    }
  }

  //nesneleri tanımla
   
  class road extends gameObject {
    constructor(name, gl, color, transform) {
        const [pointsArray, colorsArray] = roadPointsAndColors(color);
        const collider = new NaiveBoxCollider(roadVertices());
        super(name, gl, pointsArray, colorsArray, transform, collider);
    }
  }


    function start(gameObjects) {
    for (const gameObject of Object.values(gameObjects)) {
      if (gameObject.component.script) gameObject.component.script.start();
    }
  }

  function render(gl, gameObjects, timestamp) {
    ////// GameEngine related
    //// update game time
    if (timestamp) GameTime.updateTimestamp(timestamp);
  
    //// detect all collisions
    const objects = Object.values(gameObjects);
    for (const object of objects) object.collidesWith = [];
    for (let i = 0; i < objects.length; i++) {
      const current = objects[i];
      for (let j = i + 1; j < objects.length; j++) {
        const other = objects[j];
        if (
          current.detectsCollisionWith(other) ||
          other.detectsCollisionWith(current)
        ) {
          current.collidesWith.push(other);
          other.collidesWith.push(current);
        }
      }
    }
  
    //// handle all collisions
    for (const gameObject of Object.values(gameObjects)) {
      if (gameObject.component.script) {
        for (const other of gameObject.collidesWith) {
          gameObject.component.script.onCollision(other);
        }
      }
    }
  
    //// update all objects
    for (const gameObject of Object.values(gameObjects)) {
      if (gameObject.component.script) gameObject.component.script.update();
    }
  
    ////// WebGL related
    //// clear the background
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    //// draw all objects
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var zNear = 1;
    var zFar = 1000;
    const viewMatrix = lookAt(eye, at, up);
    const projectionMatrix = perspective(
    50, aspect, zNear, zFar
  );


    for (const gameObject of Object.values(gameObjects)) {
      gameObject.viewMatrix = viewMatrix;
      gameObject.projectionMatrix = projectionMatrix;
      gameObject.draw();
    }
  
    //// call self for recursion
    requestAnimFrame(timestamp => render(gl, gameObjects, timestamp));
  }

  function setupWebGL() {
    const canvas = document.getElementById("game_canvas");
    const gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
      console.error("Could not set up WebGL");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect = canvas.width / canvas.height;
    gl.clearColor(0.4, 1, 1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    return gl;
  }

  function roadVertices() {
    return [
      vec4(-0.5, 0, 0.5, 1.0),
      vec4(-0.5, 1, 0.5, 1.0),
      vec4(0.5, 1, 0.5, 1.0),
      vec4(0.5, 0, 0.5, 1.0),
      vec4(-0.5, 0, -0.5, 1.0),
      vec4(-0.5, 1, -0.5, 1.0),
      vec4(0.5, 1, -0.5, 1.0),
      vec4(0.5, 0, -0.5, 1.0)
    ];
  }
  
  function roadPointsAndColors(color) {
    const points = [];
    const colors = [];
    const vertices = roadVertices();
    
    const colorList = [color, color, color , color, color, color, color, color];
  
    // each 3 index is a triangle. each 6 index is a face.
    // prettier-ignore
    const indices = [1,0,3,1,3,2,2,3,7,2,7,6,3,0,4,3,4,7,6,5,1,6,1,2,4,5,6,4,6,7,5,4,0,5,0,1];
    for (let i of indices) {
      points.push(vertices[i]);
      colors.push(colorList[i]);
    }
    return [points, colors];
  }

  function sphericalEye(radius, theta, phi) {
    return vec3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    );
  }