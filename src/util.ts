export function objectsEqual(a: any = {}, b: any = {}) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        let va = a[propName], vb = b[propName]
        let type = typeof va;

        if (type == "object") {
            if (!objectsEqual(va, vb)){
                return false;
            }
        } else if (type != "function" && va != vb){
            return false;
        }
    }
    return true;
}