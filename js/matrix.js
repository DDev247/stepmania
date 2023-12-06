
// create a identity matrix
function matrixIdentity() {
    return {
        m11: [1, 0, 0, 0],
        m21: [0, 1, 0, 0],
        m31: [0, 0, 1, 0],
        m41: [0, 0, 0, 1]
    };
}

// create a zeroed out matrix
function matrixZero() {
    return {
        m11: [0, 0, 0, 0],
        m21: [0, 0, 0, 0],
        m31: [0, 0, 0, 0],
        m41: [0, 0, 0, 0]
    };
}

// performs matrix-vector multiplication
// (may be a bottleneck later)
function matrixVectorMult(m, v3) {
    var v = Object.assign({w:1}, v3);
    var result = v4(0,0,0,1);
    var m11 = m.m11;
    var m21 = m.m21;
    var m31 = m.m31;
    var m41 = m.m41;
    
    // m11*v11 + m12*v12 + m13*v13 + m14*v14
    result.x = m11[0]*v.x +
                m11[1]*v.y +
                m11[2]*v.z +
                m11[3]*v.w;
                
    result.y = m21[0]*v.x +
                m21[1]*v.y +
                m21[2]*v.z +
                m21[3]*v.w;
                
    result.z = m31[0]*v.x +
                m31[1]*v.y +
                m31[2]*v.z +
                m31[3]*v.w;
                
    result.w = m41[0]*v.x +
                m41[1]*v.y +
                m41[2]*v.z +
                m41[3]*v.w;
                
    return result;
}

// var currentMatrix = matrixIdentity();
function matrix(v) {
    return matrixVectorMult(currentMatrix, v);
}

// creates a translation matrix
function matrixTranslate(v4) {
    var result = matrixIdentity();
    result.m11[3] = v4.x;
    result.m21[3] = v4.y;
    result.m31[3] = v4.z;
    result.m41[3] = v4.w;
    
    return result;
}

function matrixScale(v4) {
    var result = matrixIdentity();
    result.m11[0] = v4.x;
    result.m21[1] = v4.y;
    result.m31[2] = v4.z;
    //.m31[3] = -(v4.z / 2);
    result.m41[3] = v4.w;
    
    return result;
}

function matrixRotateX(theta) {
    var result = matrixIdentity();
    result.m21[1] = Math.cos(theta);
    result.m21[2] = -Math.sin(theta);
    result.m31[1] = Math.sin(theta);
    result.m31[2] = Math.cos(theta);
    
    return result;
}

function matrixRotateY(theta) {
    var result = matrixIdentity();
    result.m11[0] = Math.cos(theta);
    result.m11[2] = Math.sin(theta);
    result.m31[0] = -Math.sin(theta);
    result.m31[2] = Math.cos(theta);
    
    return result;
}

function matrixRotateZ(theta) {
    var result = matrixIdentity();
    result.m11[0] = Math.cos(theta);
    result.m11[1] = -Math.sin(theta);
    result.m21[0] = Math.sin(theta);
    result.m21[1] = Math.cos(theta);
    
    return result;
}

// performs matrix-matrix multiplication
// (may be a bottleneck later)
function matrixMult(e, f) {
    var result = [[], [], [], []];
    var ee = [
        [e.m11[0], e.m11[1], e.m11[2], e.m11[3]],
        [e.m21[0], e.m21[1], e.m21[2], e.m21[3]],
        [e.m31[0], e.m31[1], e.m31[2], e.m31[3]],
        [e.m41[0], e.m41[1], e.m41[2], e.m41[3]],
    ];
    
    var ff = [
        [f.m11[0], f.m11[1], f.m11[2], f.m11[3]],
        [f.m21[0], f.m21[1], f.m21[2], f.m21[3]],
        [f.m31[0], f.m31[1], f.m31[2], f.m31[3]],
        [f.m41[0], f.m41[1], f.m41[2], f.m41[3]],
    ];
    
    var n = 4;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            result[i][j] = 0;
            for (var k = 0; k < n; k++) {
                result[i][j] += ee[i][k] * ff[k][j];
            }
        }
    }
    
    return {
        m11: result[0],
        m21: result[1],
        m31: result[2],
        m41: result[3]
    };
}

function matrixToArrayMatrix(matrix) {
    const m11 = matrix.m11;
    const m21 = matrix.m21;
    const m31 = matrix.m31;
    const m41 = matrix.m41;

    return [
        m11[0], m11[1], m11[2], m11[3],
        m21[0], m21[1], m21[2], m21[3],
        m31[0], m31[1], m31[2], m31[3],
        m41[0], m41[1], m41[2], m41[3]
    ]
}
