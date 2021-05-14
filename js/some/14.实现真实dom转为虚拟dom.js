// 字节跳动面试题  没做出来 复盘
// 
const toVirtualDom = (root) => {
  const createNode = ({ nodeType, nodeName, attrs, childs, text }) => {
    return { nodeType, nodeName, attrs, childs, text };
  };
  const getNode = (node) => {
    const { nodeType, nodeName, attributes, childNodes, textContent } = node;
    let virtualNode = null;
    const attrs = {};
    const childs = [];
    if (nodeType === 1) {
      // 元素
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        attrs[attr.name] = attr.value;
      }
      if (childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
          childs.push(getNode(childNodes[i]));
        }
      }
      virtualNode = createNode({ nodeType, nodeName, attrs, childs });
    } else if (nodeType === 3) {
      // 文本
      virtualNode = createNode({ nodeType, text: textContent });
    }
    return virtualNode;
  };
  return getNode(root);
};
const root = document.querySelector('#base_content');
const virtualDom = toVirtualDom(root);

