
// Get A WebGL context
var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");

if (gl === null) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
}

const createShader = (id, type) => {
    const source = document.getElementById(id).innerHTML;

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        throw `Could not compile WebGL program. \n\n${info}`;
    }
    return shader;
}

const createProgram = (vs, fs) => {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);
        throw `Could not compile WebGL program. \n\n${info}`;
    }

    return program;
}

async function main() {  
    // setup a GLSL program
    var vertexShader = createShader("2d-vertex-shader", gl.VERTEX_SHADER);
    var fragmentShader = createShader("2d-fragment-shader", gl.FRAGMENT_SHADER);
    var program = createProgram(vertexShader, fragmentShader);
    gl.useProgram(program);
    
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    var currentMatrix = matrixIdentity();
    var rotation = 0;
    
    var modelR = await fetch("assets/main.obj");
    var Models = parseObj(await modelR.text());
    const vertices = verticesToArray(Models["Cube"].vertices);
    const indices = indicesToArray(Models["Cube"].indices);
    console.log(Models, vertices, indices);
    // var Materials = parseObj(document.getElementById("mtl").innerHTML);
    
    // Create buffers
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
    );

    // draw
    // gl.drawArrays(gl.TRIANGLES, 0, 6);
    function draw() {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerWidth / (16 / 9);

        rotation += 0.01;

        currentMatrix = matrixIdentity();
        currentMatrix = matrixMult(currentMatrix, matrixRotateX(rotation));
        currentMatrix = matrixMult(currentMatrix, matrixRotateY(rotation * 0.7));
        currentMatrix = matrixMult(currentMatrix, matrixRotateZ(rotation * 0.2));

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        gl.useProgram(program);
        
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        
        gl.uniformMatrix4fv(matrixLocation, false, matrixToArrayMatrix(currentMatrix));
        gl.drawElements(gl.LINES, vertices.length, gl.UNSIGNED_SHORT, 0);
    }

    setInterval(draw, 16);
}

main();
