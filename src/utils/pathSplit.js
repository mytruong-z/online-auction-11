export const pathSplitting = path => {
    let pt = "";
    path = path.split(" ");
    for(let i = 0;i < path.length - 1;i++){
        pt += path[i] + "-";
    }
    pt += path[path.length - 1];
    return pt;
}