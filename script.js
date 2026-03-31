const output = document.getElementById("output");
const visualArea = document.getElementById("visualArea");
const panelTitle = document.getElementById("panelTitle");
const panelDesc = document.getElementById("panelDesc");
const panelControls = document.getElementById("panelControls");
const cards = document.querySelectorAll(".topic-card");

let arrayData = [];
let linkedListData = [];
let stackData = [];
let queueData = [];
let bstData = [];
let graphEdges = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "D", weight: 8 },
  { from: "C", to: "E", weight: 10 },
  { from: "D", to: "E", weight: 2 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "F", weight: 3 }
];

const topicMeta = {
  array: {
    title: "Array",
    desc: "Array stores values in order and gives quick access by index. Here you can insert, delete, update and get by index."
  },
  linkedlist: {
    title: "Linked List",
    desc: "Linked List stores connected nodes. Here you can add at beginning, add at end and delete by value."
  },
  stack: {
    title: "Stack",
    desc: "Stack follows Last In, First Out. The last pushed item comes out first."
  },
  queue: {
    title: "Queue",
    desc: "Queue follows First In, First Out. The first inserted item leaves first."
  },
  binarytree: {
    title: "Binary Tree",
    desc: "This demo uses Binary Search Tree logic. Insert values and see the inorder traversal."
  },
  sorting: {
    title: "Sorting",
    desc: "Enter numbers separated by commas and sort them in ascending order."
  },
  graph: {
    title: "Graph",
    desc: "Graph shows connections between nodes. Here you can add weighted edges and view them."
  },
  dijkstra: {
    title: "Dijkstra",
    desc: "Find the shortest path between two nodes in a weighted graph."
  }
};

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    renderTopic(card.dataset.topic);
  });
});

function setOutput(text) {
  output.textContent = text;
}

function clearVisual() {
  visualArea.innerHTML = "";
}

function createBox(value, label = "", extraClass = "") {
  const box = document.createElement("div");
  box.className = `item-box ${extraClass}`;
  box.textContent = value;
  if (label !== "") {
    const span = document.createElement("span");
    span.textContent = label;
    box.appendChild(span);
  }
  return box;
}

function renderArrayVisual() {
  clearVisual();
  if (!arrayData.length) {
    visualArea.innerHTML = "<p>Array empty</p>";
    return;
  }
  arrayData.forEach((item, index) => {
    visualArea.appendChild(createBox(item, `index ${index}`));
  });
}

function renderLinkedListVisual() {
  clearVisual();
  if (!linkedListData.length) {
    visualArea.innerHTML = "<p>Linked List empty</p>";
    return;
  }
  linkedListData.forEach((item, index) => {
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.gap = "8px";

    const box = createBox(item, `node ${index}`);
    wrap.appendChild(box);

    if (index < linkedListData.length - 1) {
      const arrow = document.createElement("div");
      arrow.textContent = "→";
      arrow.style.fontSize = "26px";
      arrow.style.fontWeight = "700";
      wrap.appendChild(arrow);
    }

    visualArea.appendChild(wrap);
  });
}

function renderStackVisual() {
  clearVisual();
  if (!stackData.length) {
    visualArea.innerHTML = "<p>Stack empty</p>";
    return;
  }
  const stackWrap = document.createElement("div");
  stackWrap.style.display = "flex";
  stackWrap.style.flexDirection = "column-reverse";
  stackWrap.style.gap = "10px";
  stackData.forEach((item, index) => {
    const isTop = index === stackData.length - 1;
    stackWrap.appendChild(createBox(item, isTop ? "TOP" : "", "stack-box"));
  });
  visualArea.appendChild(stackWrap);
}

function renderQueueVisual() {
  clearVisual();
  if (!queueData.length) {
    visualArea.innerHTML = "<p>Queue empty</p>";
    return;
  }
  queueData.forEach((item, index) => {
    let label = "";
    if (index === 0) label = "FRONT";
    if (index === queueData.length - 1) label = label ? `${label} / REAR` : "REAR";
    visualArea.appendChild(createBox(item, label, "queue-box"));
  });
}

function renderBSTVisual() {
  clearVisual();
  if (!bstData.length) {
    visualArea.innerHTML = "<p>Tree empty</p>";
    return;
  }
  bstData.forEach(item => {
    const node = document.createElement("div");
    node.className = "tree-node";
    node.textContent = item;
    visualArea.appendChild(node);
  });
}

function renderSortingVisual(sortedArr = []) {
  clearVisual();
  if (!sortedArr.length) {
    visualArea.innerHTML = "<p>No sorted data yet</p>";
    return;
  }
  sortedArr.forEach((item, index) => {
    visualArea.appendChild(createBox(item, `${index}`));
  });
}

function renderGraphVisual() {
  clearVisual();
  if (!graphEdges.length) {
    visualArea.innerHTML = "<p>Graph empty</p>";
    return;
  }
  graphEdges.forEach(edge => {
    const el = document.createElement("div");
    el.className = "graph-edge";
    el.textContent = `${edge.from} → ${edge.to} (w:${edge.weight})`;
    visualArea.appendChild(el);
  });
}

function renderTopic(topic) {
  panelTitle.textContent = topicMeta[topic].title;
  panelDesc.textContent = topicMeta[topic].desc;
  panelControls.innerHTML = "";

  if (topic === "array") renderArrayTopic();
  if (topic === "linkedlist") renderLinkedListTopic();
  if (topic === "stack") renderStackTopic();
  if (topic === "queue") renderQueueTopic();
  if (topic === "binarytree") renderBinaryTreeTopic();
  if (topic === "sorting") renderSortingTopic();
  if (topic === "graph") renderGraphTopic();
  if (topic === "dijkstra") renderDijkstraTopic();
}

function renderArrayTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Array Controls</h4>
      <div class="input-row">
        <input type="number" id="arrayValue" placeholder="Value" />
        <input type="number" id="arrayIndex" placeholder="Index" />
        <button id="arrayInsert">Insert</button>
        <button id="arrayDelete">Delete</button>
        <button id="arrayUpdate">Update</button>
        <button id="arrayGet">Get</button>
        <button id="arrayRandom">Random Fill</button>
      </div>
    </div>
  `;

  document.getElementById("arrayInsert").onclick = () => {
    const value = document.getElementById("arrayValue").value;
    const index = Number(document.getElementById("arrayIndex").value);

    if (value === "" || isNaN(index) || index < 0 || index > arrayData.length) {
      setOutput("Insert uchun to‘g‘ri value va index kiriting.");
      return;
    }

    arrayData.splice(index, 0, Number(value));
    setOutput(`Inserted ${value} at index ${index}\nArray: [${arrayData.join(", ")}]`);
    renderArrayVisual();
  };

  document.getElementById("arrayDelete").onclick = () => {
    const index = Number(document.getElementById("arrayIndex").value);

    if (isNaN(index) || index < 0 || index >= arrayData.length) {
      setOutput("Delete uchun to‘g‘ri index kiriting.");
      return;
    }

    const removed = arrayData.splice(index, 1);
    setOutput(`Deleted value ${removed[0]} from index ${index}\nArray: [${arrayData.join(", ")}]`);
    renderArrayVisual();
  };

  document.getElementById("arrayUpdate").onclick = () => {
    const value = document.getElementById("arrayValue").value;
    const index = Number(document.getElementById("arrayIndex").value);

    if (value === "" || isNaN(index) || index < 0 || index >= arrayData.length) {
      setOutput("Update uchun to‘g‘ri value va mavjud index kiriting.");
      return;
    }

    arrayData[index] = Number(value);
    setOutput(`Updated index ${index} with value ${value}\nArray: [${arrayData.join(", ")}]`);
    renderArrayVisual();
  };

  document.getElementById("arrayGet").onclick = () => {
    const index = Number(document.getElementById("arrayIndex").value);

    if (isNaN(index) || index < 0 || index >= arrayData.length) {
      setOutput("Get uchun to‘g‘ri index kiriting.");
      return;
    }

    setOutput(`Value at index ${index}: ${arrayData[index]}`);
    renderArrayVisual();
  };

  document.getElementById("arrayRandom").onclick = () => {
    arrayData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10);
    setOutput(`Random array created: [${arrayData.join(", ")}]`);
    renderArrayVisual();
  };

  renderArrayVisual();
  setOutput(`Array: [${arrayData.join(", ")}]`);
}

function renderLinkedListTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Linked List Controls</h4>
      <div class="input-row">
        <input type="number" id="llValue" placeholder="Value" />
        <button id="llAppend">Append</button>
        <button id="llPrepend">Prepend</button>
        <button id="llDelete">Delete by Value</button>
      </div>
    </div>
  `;

  document.getElementById("llAppend").onclick = () => {
    const value = document.getElementById("llValue").value;
    if (value === "") {
      setOutput("Value kiriting.");
      return;
    }
    linkedListData.push(Number(value));
    setOutput(`Appended ${value}\nLinked List: ${linkedListData.join(" -> ")}`);
    renderLinkedListVisual();
  };

  document.getElementById("llPrepend").onclick = () => {
    const value = document.getElementById("llValue").value;
    if (value === "") {
      setOutput("Value kiriting.");
      return;
    }
    linkedListData.unshift(Number(value));
    setOutput(`Prepended ${value}\nLinked List: ${linkedListData.join(" -> ")}`);
    renderLinkedListVisual();
  };

  document.getElementById("llDelete").onclick = () => {
    const value = document.getElementById("llValue").value;
    if (value === "") {
      setOutput("Delete uchun value kiriting.");
      return;
    }
    const idx = linkedListData.indexOf(Number(value));
    if (idx === -1) {
      setOutput("Bu value listda topilmadi.");
      return;
    }
    linkedListData.splice(idx, 1);
    setOutput(`Deleted ${value}\nLinked List: ${linkedListData.join(" -> ")}`);
    renderLinkedListVisual();
  };

  renderLinkedListVisual();
  setOutput(`Linked List: ${linkedListData.join(" -> ") || "empty"}`);
}

function renderStackTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Stack Controls</h4>
      <div class="input-row">
        <input type="number" id="stackValue" placeholder="Value" />
        <button id="stackPush">Push</button>
        <button id="stackPop">Pop</button>
        <button id="stackPeek">Peek</button>
      </div>
    </div>
  `;

  document.getElementById("stackPush").onclick = () => {
    const value = document.getElementById("stackValue").value;
    if (value === "") {
      setOutput("Value kiriting.");
      return;
    }
    stackData.push(Number(value));
    setOutput(`Pushed ${value}\nStack: [${stackData.join(", ")}]`);
    renderStackVisual();
  };

  document.getElementById("stackPop").onclick = () => {
    if (!stackData.length) {
      setOutput("Stack empty.");
      return;
    }
    const value = stackData.pop();
    setOutput(`Popped ${value}\nStack: [${stackData.join(", ")}]`);
    renderStackVisual();
  };

  document.getElementById("stackPeek").onclick = () => {
    if (!stackData.length) {
      setOutput("Stack empty.");
      return;
    }
    setOutput(`Top value: ${stackData[stackData.length - 1]}`);
    renderStackVisual();
  };

  renderStackVisual();
  setOutput(`Stack: [${stackData.join(", ")}]`);
}

function renderQueueTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Queue Controls</h4>
      <div class="input-row">
        <input type="number" id="queueValue" placeholder="Value" />
        <button id="queueEnqueue">Enqueue</button>
        <button id="queueDequeue">Dequeue</button>
        <button id="queueFront">Front</button>
      </div>
    </div>
  `;

  document.getElementById("queueEnqueue").onclick = () => {
    const value = document.getElementById("queueValue").value;
    if (value === "") {
      setOutput("Value kiriting.");
      return;
    }
    queueData.push(Number(value));
    setOutput(`Enqueued ${value}\nQueue: [${queueData.join(", ")}]`);
    renderQueueVisual();
  };

  document.getElementById("queueDequeue").onclick = () => {
    if (!queueData.length) {
      setOutput("Queue empty.");
      return;
    }
    const value = queueData.shift();
    setOutput(`Dequeued ${value}\nQueue: [${queueData.join(", ")}]`);
    renderQueueVisual();
  };

  document.getElementById("queueFront").onclick = () => {
    if (!queueData.length) {
      setOutput("Queue empty.");
      return;
    }
    setOutput(`Front value: ${queueData[0]}`);
    renderQueueVisual();
  };

  renderQueueVisual();
  setOutput(`Queue: [${queueData.join(", ")}]`);
}

function bstInsert(root, value) {
  if (root === null) return { value, left: null, right: null };
  if (value < root.value) root.left = bstInsert(root.left, value);
  else root.right = bstInsert(root.right, value);
  return root;
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);
  return result;
}

function buildBST(arr) {
  let root = null;
  arr.forEach(v => {
    root = bstInsert(root, v);
  });
  return root;
}

function renderBinaryTreeTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Binary Search Tree Controls</h4>
      <div class="input-row">
        <input type="number" id="treeValue" placeholder="Value" />
        <button id="treeInsert">Insert</button>
        <button id="treeTraverse">Inorder Traversal</button>
        <button id="treeRandom">Random Fill</button>
      </div>
    </div>
  `;

  document.getElementById("treeInsert").onclick = () => {
    const value = document.getElementById("treeValue").value;
    if (value === "") {
      setOutput("Value kiriting.");
      return;
    }
    bstData.push(Number(value));
    setOutput(`Inserted ${value}\nTree values: [${bstData.join(", ")}]`);
    renderBSTVisual();
  };

  document.getElementById("treeTraverse").onclick = () => {
    if (!bstData.length) {
      setOutput("Tree empty.");
      return;
    }
    const root = buildBST(bstData);
    const sorted = inorder(root);
    setOutput(`Inorder Traversal: ${sorted.join(" -> ")}`);
    renderBSTVisual();
  };

  document.getElementById("treeRandom").onclick = () => {
    bstData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setOutput(`Random tree values: [${bstData.join(", ")}]`);
    renderBSTVisual();
  };

  renderBSTVisual();
  setOutput(`Tree values: [${bstData.join(", ")}]`);
}

function renderSortingTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Sorting Controls</h4>
      <div class="input-row">
        <input type="text" id="sortInput" placeholder="Example: 5,2,9,1,3" />
        <button id="sortBtn">Sort Numbers</button>
      </div>
    </div>
  `;

  document.getElementById("sortBtn").onclick = () => {
    const raw = document.getElementById("sortInput").value.trim();
    if (!raw) {
      setOutput("Sonlarni vergul bilan kiriting.");
      return;
    }

    const arr = raw.split(",").map(v => Number(v.trim())).filter(v => !isNaN(v));
    if (!arr.length) {
      setOutput("To‘g‘ri sonlar kiriting.");
      return;
    }

    const sorted = [...arr].sort((a, b) => a - b);
    setOutput(`Original: [${arr.join(", ")}]\nSorted: [${sorted.join(", ")}]`);
    renderSortingVisual(sorted);
  };

  renderSortingVisual();
  setOutput("Example input: 5,2,9,1,3");
}

function renderGraphTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Graph Controls</h4>
      <div class="input-row">
        <input type="text" id="graphFrom" placeholder="From" />
        <input type="text" id="graphTo" placeholder="To" />
        <input type="number" id="graphWeight" placeholder="Weight" />
        <button id="graphAdd">Add Edge</button>
      </div>
    </div>
  `;

  document.getElementById("graphAdd").onclick = () => {
    const from = document.getElementById("graphFrom").value.trim().toUpperCase();
    const to = document.getElementById("graphTo").value.trim().toUpperCase();
    const weight = Number(document.getElementById("graphWeight").value);

    if (!from || !to || isNaN(weight)) {
      setOutput("From, To va Weight kiriting.");
      return;
    }

    graphEdges.push({ from, to, weight });
    setOutput(`Edge added: ${from} → ${to} (weight ${weight})`);
    renderGraphVisual();
  };

  renderGraphVisual();
  setOutput(
      graphEdges.map(edge => `${edge.from} -> ${edge.to} (w:${edge.weight})`).join("\n")
  );
}

function buildAdjacency(edges) {
  const graph = {};
  edges.forEach(({ from, to, weight }) => {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    graph[from].push({ node: to, weight });
    graph[to].push({ node: from, weight }); // undirected demo
  });
  return graph;
}

function dijkstra(graph, start, end) {
  const distances = {};
  const visited = {};
  const previous = {};
  const nodes = Object.keys(graph);

  nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (true) {
    let closestNode = null;
    let closestDistance = Infinity;

    for (const node of nodes) {
      if (!visited[node] && distances[node] < closestDistance) {
        closestDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null) break;
    if (closestNode === end) break;

    visited[closestNode] = true;

    for (const neighbor of graph[closestNode]) {
      const newDist = distances[closestNode] + neighbor.weight;
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = closestNode;
      }
    }
  }

  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  if (path[0] !== start) {
    return { distance: Infinity, path: [] };
  }

  return { distance: distances[end], path };
}

function renderDijkstraTopic() {
  panelControls.innerHTML = `
    <div class="control-card">
      <h4>Dijkstra Controls</h4>
      <div class="input-row">
        <input type="text" id="dijkstraStart" placeholder="Start node (A)" />
        <input type="text" id="dijkstraEnd" placeholder="End node (F)" />
        <button id="dijkstraRun">Find Shortest Path</button>
      </div>
    </div>
  `;

  document.getElementById("dijkstraRun").onclick = () => {
    const start = document.getElementById("dijkstraStart").value.trim().toUpperCase();
    const end = document.getElementById("dijkstraEnd").value.trim().toUpperCase();

    if (!start || !end) {
      setOutput("Start va End node kiriting.");
      return;
    }

    const graph = buildAdjacency(graphEdges);
    if (!graph[start] || !graph[end]) {
      setOutput("Bunday node graphda yo‘q.");
      return;
    }

    const result = dijkstra(graph, start, end);
    if (!result.path.length) {
      setOutput("Yo‘l topilmadi.");
      return;
    }

    setOutput(
        `Shortest path: ${result.path.join(" -> ")}\nTotal distance: ${result.distance}`
    );
    renderGraphVisual();
  };

  renderGraphVisual();
  setOutput("Example: Start = A, End = F");
}

renderTopic("array");