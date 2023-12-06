
// generates a Vector4
function v4(xx,yy,zz,ww) { return { x: xx, y: yy, z: zz, w: ww }; }

// generates a Vector3
function v3(xx,yy,zz) { return { x: xx, y: yy, z: zz }; }
function v31(a) { return v3(a,a,a); }

// generates a Vector2
function v2(xx,yy) { return { x: xx, y:yy }; }

function v3T(v3) {
    return v3.x + ", " + v3.y + ", " + v3.z + ";";
}

function v2T(v2) {
    return v2.x + ", " + v2.y + ";";
}

function av3(a3, b3) {
    return {
        x: a3.x + b3.x,
        y: a3.y + b3.y,
        z: a3.z + b3.z
    };   
}

function sv3(a3, b3) {
    return {
        x: a3.x - b3.x,
        y: a3.y - b3.y,
        z: a3.z - b3.z
    };   
}

function mv3(a3, b3) {
    return {
        x: a3.x * b3.x,
        y: a3.y * b3.y,
        z: a3.z * b3.z
    };   
}

function dv3(a3, b3) {
    return {
        x: a3.x / b3.x,
        y: a3.y / b3.y,
        z: a3.z / b3.z
    };   
}

function v3Distance(v1, v2) {
    var s = sv3(v1, v2);
    return sqrt(sq(s.x) + sq(s.y) + sq(s.z));
}

function magnitude(a) {
    return sqrt(sq(a));
}

function v3Dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    //return acos(x * y / magnitude(x) * magnitude(y));
}

function v3Cross(a, b) {
    var c = v31(0);
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
}
