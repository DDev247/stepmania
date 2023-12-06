
// parses a Wavefront OBJ file
function parseObj(file) {
    var Meshes = {};
    
    var lines = file.split("\n");
    var currentMesh = "";
    var indices = 0;
    
    for(var l in lines) {
        var line = lines[l];
        //debug(line);
        
        var bits = line.split(" ");
        var toEnd = line.substring(bits[0].length + 1);
        switch (bits[0])
        {
            case 'usemtl':
                Meshes[currentMesh].materials[Meshes[currentMesh].indices.length] = bits[1];
                
                break;
                
            case 'o':
            case 'g':
                if(currentMesh !== "") {
                    indices += Meshes[currentMesh].vertices.length;
                }
                
                currentMesh = toEnd;
                Meshes[currentMesh] = {
                    vertices: [],
                    indices: [],
                    materials: [],
                    normals: [],
                    smooth: false
                };
                break;
                
            case 'v':
                // skip (im too lazy to make it add a generic one)
                if(currentMesh === "") {
                    break;
                }
                
                var x = Number(bits[1]);
                var y = Number(bits[2]);
                var z = Number(bits[3]);

                Meshes[currentMesh].vertices.push([x, y, z]);
                break;
                
            case 'vn':
                // skip (im too lazy to make it add a generic one)
                if(currentMesh === "") {
                    break;
                }
                
                var x = Number(bits[1]);
                var y = Number(bits[2]);
                var z = Number(bits[3]);

                Meshes[currentMesh].normals.push([x, y, z]);
                break;
                
            case 'f':
                // skip (im too lazy to make it add a generic one)
                if(currentMesh === "") {
                    break;
                }
                
                var i = [];
                i[0] = [
                    Number(bits[1].split("//")[0]) - 1 - indices,
                    bits[1].split("//")[1] - 1
                ];
                i[1] = [
                    Number(bits[2].split("//")[0]) - 1 - indices,
                    bits[2].split("//")[1] - 1
                ];
                i[2] = [
                    Number(bits[3].split("//")[0]) - 1 - indices,
                    bits[3].split("//")[1] - 1
                ];
                Meshes[currentMesh].indices.push(i);
                break;
                
            case 's':
                // skip (im too lazy to make it add a generic one)
                if(currentMesh === "") {
                    break;
                }
                
                Meshes[currentMesh].smooth = bits[1] === "off" ? false : true;
                break;
                
            default:
                    break;
        }
    }

    return Meshes;
}

function parseMtl(file) {
    var Materials = {};
    var lines = file.split("\n");
    var currentMaterial = "";
    
    for(var l in lines) {
        var line = lines[l];
        //debug(line);
        
        var bits = line.split(" ");
        var toEnd = line.substring(bits[0].length + 1);
        switch (bits[0])
        {
            case 'newmtl':
                currentMaterial = bits[1];
                Materials[currentMaterial] = {
                    color: color(255, 255, 255)
                };
                
                break;
                
            case 'Kd':
                var c1 = Number(bits[1]);
                var c2 = Number(bits[2]);
                var c3 = Number(bits[3]);
                
                var c = {
                    r: round(c1 * 255),
                    g: round(c2 * 255),
                    b: round(c3 * 255)
                };
                
                Materials[currentMaterial].color = c;
                break;
                
            default:
                    break;
        }
    }
    
    return Materials;    
}

function verticesToArray(src) {
    const result = [];

    for (let i = 0; i < src.length * 3; i += 3) {
        const element = src[i / 3];
        result[i] = element[0];
        result[i + 1] = element[1];
        result[i + 2] = element[2];
    }

    return result;
}

function indicesToArray(src) {
    const result = [];

    for (let i = 0; i < src.length * 3; i += 3) {
        const element = src[i / 3];
        result[i] = element[0][1];
        result[i + 1] = element[1][1];
        result[i + 2] = element[2][1];
    }

    return result;
}
