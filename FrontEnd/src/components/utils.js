export function post(url, data) {
  console.log(`POSTING to ${url} with data ${JSON.stringify(data)}`);

  return fetch( url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => response.json());

}

function pruneTree(threshold, node) {
  
  var preservedNodes = [];

  if(node.children && node.children.length > 0) {

    var currentChildren = node.children.slice();
  
    currentChildren.forEach(function(child) {

      if(child.value > threshold) {
        var prunedChild = pruneTree(threshold, child);
        if(prunedChild) preservedNodes.push(prunedChild);
      }

    });

    node.children = preservedNodes;
    if(preservedNodes.length > 0) return node;
    else if(node.value > threshold) {
      node.children = undefined;
      return node;
    }
  }
  else if(node.value > threshold) return node;

}

export function changeThreshold(threshold, root, icicle) {
  console.log('Changing threshold ', threshold);
  var prunedTree = pruneTree(threshold, root.copy());
  icicle.draw(prunedTree);

}

export function filter(threshold, root, icicle) {
  console.log('Changing threshold ', threshold);
  var prunedTree = pruneTree(threshold, root.copy());
  icicle.draw(prunedTree);

}